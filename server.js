const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const ejs = require('ejs');
const express_layout = require('express-ejs-layouts');
const path = require('path');
const MainRouter = require('./routes/web');


// app.get("/", (req,res) => {
//     res.render('home');
// });

app.use(express.static('public'));
app.use(MainRouter);



app.use(express_layout);
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'/resources/views'));





app.listen(PORT, (req,res) => {
    console.log(`Listening to ${PORT}`);
})