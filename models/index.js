'use strict';

const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

//models
const Board = require('./board');
const User = require('./user');
const Comment = require('./comment');
const File = require('./file');

//sequelize
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);


db.sequelize = sequelize;


//connect models
db.User = User;
User.initiate(sequelize);

db.Board = Board;
Board.initiate(sequelize);

db.Comment = Comment;
Comment.initiate(sequelize);

db.File = File;
File.initiate(sequelize);

//association
User.associate(db);
Board.associate(db);
Comment.associate(db);
File.associate(db);


module.exports = db;
