const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./lib/mongooseConnect.js');
const authRouter = require('./router/auth.js');
const server = express();

dotenv.config();
db.init();

// Middlewares
server.use(cors());
server.use(express.json());
//server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.use("/auth", authRouter);
//server.use("/", (req, res, next) => res.status(404).json());

server.listen(process.env.PORT, () => {
    console.log(`server listens on Port ${process.env.PORT}`);
})