const express = require('express');
const router = express.Router();

const boardController = require('../controllers/board');

//after login
router.get('/main', boardController.findAllBoard);



module.exports = router;

