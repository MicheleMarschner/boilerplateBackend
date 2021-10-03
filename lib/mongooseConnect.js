const mongoose = require('mongoose');

const init = async () => {

	const db = await mongoose.connect(
		process.env.MONGODB_URI,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	);
	
    console.log(`Connected to MongoDB @ ${db.connection.host}`);
}


module.exports = { init };