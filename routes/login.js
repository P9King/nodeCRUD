const express = require('express');
const router = express.Router();

//controllers
const loginController = require('../controllers/login');


router.get("/", (req, res)=>{
    res.render('login');
});

router.post("/", loginController.findOne);

router.get("/signup", (req, res)=>{
    res.render('signup');
})

router.post('/signup', loginController.addUsers);

module.exports = router;