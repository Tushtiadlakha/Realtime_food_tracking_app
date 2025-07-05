const mongoose=require("mongoose");
require('dotenv').config()

const url=process.env.MONGO_URL;

mongoose.connect(url);

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('db connected ................');
}).on('error',()=>{
    console.log('db connection failed ...............');
})


module.exports = connection;