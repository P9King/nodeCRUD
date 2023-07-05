//settings
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const session = require('express-session');

//routes
const { sequelize } = require('./models');
const loginRoutes = require('./routes/login');
const mainRoutes = require('./routes/main');
const boardRoutes = require('./routes/board');

//fs.file directory
try {
    fs.readdirSync('uploads');
} catch (err) {
    console.error('there is no upload directory, we made the upload directory');
    fs.mkdirSync('uploads');
}


//template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//middleware
app.use(bodyParser.json());	//요청 본문을 json 형태로 파싱
app.use(bodyParser.urlencoded({ extended: false }));  //

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'loginUser',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
    }})
)

//routing
app.use(loginRoutes);
app.use(mainRoutes);
app.use(boardRoutes);


//error
app.use((req, res, next) => {
    res.status(404).render('404');
})



sequelize.sync({ force: false }).then(result => {
    console.log('DB connected');
}).catch(err => {
    console.log(err);
})

app.listen(8080, () => {
    console.log('8080 is running');
});