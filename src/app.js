const express = require('express');
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const userRouter = require('./routes/userRouter');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
require('dotenv').config();
///graph
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const morgan = require('morgan');
const crypto = require("crypto")
const engine = require('ejs-mate');
const passport = require('passport');
const localp=require('./passport/local-auth');
const flash = require('connect-flash');



const app = express();
require('./database');
require('./passport/local-auth');
require('./config/emailer');


//engine settings
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(morgan('dev'));

const admin = true;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(session({
    secret: 'thisisverysecret',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.initialize());
app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.user=req.user;
    next();
});


app.use('/', productRouter);
app.use('/', cartRouter);
// app.use('/', userRouter);

app.use('/', require('./routes/index'));

// //prueba de con
// app.get('/', (req, res) => {
//     res.send('connected');
// })

//conectar base de datos
// const URL = ('mongodb+srv:Bantrojo:<1234>@codercluster18335.vh3wc.mongodb.net/?retryWrites=true&w=majority');
// // process.env.URL
// mongoose.connect(URL, {
//     useNewUrlParser: true, useUnifiedTopology: true
// }, (err) => {
//     if (err) throw new Error("unable to coneect");
//     console.log("connected to database successfully");
// });


const PORT = process.env.PORT || 8080
// app.listen(PORT, (req, res) => console.log(`Listening on PORT ${PORT}`));
app.listen(PORT, (req, res) => console.log(`Listening on PORT ${PORT}`));