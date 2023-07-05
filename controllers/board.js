const express = require('express');
const { Board } = require('../models');
const { User } = require('../models');

const router = express.Router();

const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models/index');

//utils
const paging = require('../util/paging');

// add board
exports.addBoard = async (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const writer = req.session.user;
    const file = req.body.file;
    let fileAttach = 0;

    console.log(file);
    if (file != null || file != "") {
        fileAttach = 0;
    } else {
        fileAttach = 1;
    }

    Board.create({
        title: title,
        content: content,
        file_attach: fileAttach,
        writer: writer.id
    }).then((result) => {
        console.log("success addBoard");
    }).catch((err) => {
        console.log(err);
    })
    res.redirect('/main')
}

//paging & boards list
exports.findAllBoard = async (req, res, next) => {
    const offset = 0; //offset == page로 쓺
    const limit = 6;
    const boardList = await Board.findAll({})
        .then((result) => {
            res.render('main', {
                result: result
            })
        }).catch(err => {
            console.log(err);
        })

}

//look board
exports.lookBoard = async (req, res, next) => {
    const User = req.session.user;
    console.log('sessioninfo');
    console.log(User);
    Board.findOne({
        where: {
            id: req.params.boardId
        }
    }).then((result) => {
        res.render('boards/lookBoard', {
            boardInfo: result,
            userInfo: User
        })
    }).catch(err => {
        console.log(err);
    });

}

//like
exports.clickLike = async (req, res, next) => {
    const click = req.body.click;
    const boardId = req.body.boardId;

    const query = `update boards set likes = likes + ${click} where id = ${boardId}`;
    const result = await sequelize.query(query, { type: QueryTypes.UPDATE })
        .then((result) => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        })

}

//modify authorization
exports.modifyAuth = async (req, res, next) => {

    const userInfo = req.session.user;

    const checkId = req.body.checkId;
    const boardId = req.body.boardId;
    const writerInfo = await User.findOne({
        where: {
            id: checkId
        }
    }).then((result) => {
        if (userInfo == undefined) {
            res.send({ 'result': 0 }); //go to login
        } else {
                console.log('aaaa',userInfo.email, result.email);
            if (userInfo.email == result.email) {
                res.send({ 'result': boardId });  // success
              
            } else {
                res.send({ 'result': 'no permission' });  // no permission 
            }
        }
    }).catch((err) => {
        console.log(err);
    })

}

exports.goModifyBoard = async (req, res, next) => {
    const boardId = req.params.boardId;
    Board.findOne({
        where: {
            id: boardId
        }
    }).then(result => {
        res.render('boards/modifyBoard', { boardInfo: result });
    }).catch((err) => {

    })

}

exports.modifiedBoard = async (req, res, next) => {
    const boardId = req.params.boardId;
    const title = req.body.title;
    const content = req.body.content;
    const writer = req.body.writer;
    const auth = req.session;
    console.log(auth);
    if(auth.user){
        console.log('auth', auth.user.id);
        console.log('writer', writer);
        if (auth.user.id == writer) {
            const updateInfo = await Board.update({
                title: title,
                content: content
            },
                {
                    where: {
                        id: boardId
                    }
                }).then(
                    res.redirect('/main')
                );
        }
    }else{
        console.log('aaaa');
        res.redirect('/');
    }
  
}

exports.deleteBoard = async (req, res, next) => {
    const userInfo = req.session.user;
    const writerId= req.body.writerId;
    const boardId = req.body.boardId;

    console.log(userInfo)
    
    if(userInfo){
        if(userInfo.id == writerId){
            Board.destroy({
                where:{
                    id : boardId
                }
            }).then((resutl) =>{
                res.send({'result' : 'success'});
            })
        }else{
            console.log('not yor board');
            res.send({'result': 'no permission'})
        }
    }else{
        console.log('login');
        res.send({'result': 'reuire login fisrt'});
    }

}

