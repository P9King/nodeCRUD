const express = require('express');
const { User } = require('../models');

const router = express.Router();

//signup
exports.addUsers = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const user = new User(name, email, password);
    User.create({
        name: name,
        email: email,
        password: password
    }).then(result=>{
        console.log(result);
    }).catch(err =>{
        console.error(err);
    })
    console.log(name, email, password);



    res.redirect('/');
}

//login auth
exports.findOne = (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;

    console.log( email, password);
    User.findOne({
        where:{
            email: email,
            password: password
        }
    }).then(result =>{
        if(result){
            if(req.session.user == undefined){
                req.session.user = result;
            }
            console.log("session.user == "+req.session.user);
            res.redirect('/main');
    }
}).catch(err =>{
        console.error(err);
        res.write('<script>alert("CHECK ID OR PASSWORD")</script>');
    })
}

