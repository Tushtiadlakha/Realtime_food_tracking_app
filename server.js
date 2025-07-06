require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const ejs = require('ejs');
const express_layout = require('express-ejs-layouts');
const path = require('path');
const MainRouter = require('./routes/web');
const mongoose = require('mongoose');
const connection = require("./backend/db/mongoConnection");
const session = require("express-session");
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo');


app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoDbStore.create({
            mongoUrl: process.env.MONGO_URL
        }),
    cookie: {maxAge: 1000*60*60*24}
}))

app.use(flash());

app.use((req,res,next) =>{
    res.locals.session = req.session;
    res.locals.user = req.user;
    next()
})


app.use(express.json())
app.use(express.static('public'));
app.use(express_layout);
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'/resources/views'));

app.use(MainRouter);

app.listen(PORT, (req,res) => {
    console.log(`Listening to ${PORT}`);
})


