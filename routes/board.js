const express = require('express');
const router = express.Router();
const upload = require('../util/multer');

//controllers
const boardController = require('../controllers/board');

//deal with error
const errors = require('../util/error');

//login auth
const Auth = (req, res, next) => {
    const { user } = req.session;
    console.log(user);
    if (user != undefined) {
        next();
    } else {
        res.write("<script>alert('LOGIN IS REQUIRED ')</script>");
        res.write("<script>window.location='/'</script>");
    }

}

//routes
//add boards
router.get("/addBoard", Auth, (req, res) => {
    res.render('boards/addBoard');
});

//add boards info
router.post("/addBoard", upload.array('file'), boardController.addBoard);

//look board
router.get("/lookBoard/:boardId", boardController.lookBoard);

//like
router.post("/clickLike", boardController.clickLike);

//modify board
router.post("/modifyAuth", boardController.modifyAuth);

router.get("/modifyBoard/:boardId", boardController.goModifyBoard);
router.post("/modifiedBoard/:boardId",upload.array('file'), boardController.modifiedBoard);

//delete board
router.post("/deleteBoard", boardController.deleteBoard);

module.exports = router;