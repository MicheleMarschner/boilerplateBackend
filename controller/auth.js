const tokenHandler = require("../utils/token.js");
const UserModel = require("../model/User.js");


const login = async(req, res, next) => {
    try {
        const user = await UserModel.login(req.body);
        const token = tokenHandler.create(user);

        res.cookie("token", token, {
            maxAge: process.env.TOKEN_EXP * 1000,
            httpOnly: true,
        });

        res.json(user);
    } catch (error) {
        res.status(401).send();
        next(error);
    }
}

const logout = async(req, res, next) => {
    res.clearCookie("token");
    res.send();
}


const register = async(req, res, next) => {
    try {
        const result = await UserModel.register(req.body);
        res.json(result);

    } catch (error) {
        next(error);
    }
}


module.exports = {
    login,
    logout,
    register
};
