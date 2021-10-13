const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please add an username'],
        unique: true
	},
	email: {
		type: String,
		required: [true, 'Please add an email'],
        unique: true
	},
	password: {
		type: String,
		required: [true, 'Please add a password']
	},
}, { versionKey: false });


const User = mongoose.model("User", UserSchema);

async function login ({ username, password }) {
	const user = await User.findOne({ username });
	if (!user) throw new Error("user_not_found");

	const isPasswordCorrect = await bcrypt.compare(password.toString() + process.env.PEPPER, user.password);
	if (!isPasswordCorrect) throw new Error("password_incorrect");

	return { userId: user._id, name: user.username };
}

async function register ({ username, email, password }) {
	const salt = await bcrypt.genSalt(10);
	
	const user = new User({
		username: username,
		email: email,
        password: await bcrypt.hash(password + process.env.PEPPER, salt),
	});

	return await user.save();
}

module.exports = {
	login,
    register
};