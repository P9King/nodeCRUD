const express = require('express');
const { Board } = require('../models/board');

const router = express.Router();


//utils
const paging = require('../util/paging');