const express = require('express');
const dotenv = require('dotenv');
const db = require('./lib/mongooseConnect.js');


const server = express();
dotenv.config();
db.init();



server.listen(process.env.PORT, () => {
    console.log(`server listens on Port ${process.env.PORT}`);
})