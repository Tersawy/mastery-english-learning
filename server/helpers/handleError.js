module.exports = (err, callback) => {
	if (err.code === 11000 && err.name === "MongoError") {
		let field, msg;

		if (err.keyValue) {
			field = Object.keys(err.keyValue)[0];

			msg = err.keyValue[Object.keys(err.keyValue)[0]] + " is exist !";

			return callback({ status: 422, errors: { [field]: msg } });
		}

		field = err.message.slice(err.message.indexOf("index: "), err.message.indexOf("_1")).split(" ")[1];

		msg = err.message.slice(err.message.indexOf(': "') + 3).split('"')[0] + " is exist !";

		return callback({ status: 422, errors: { [field]: msg } });
	}

	let isCustomError = typeof err == "object" && Object.keys(err)[0] === "status";

	if (isCustomError) return callback(err);

	if (err.errors && err.name == "ValidationError") {
		let errors = Object.keys(err.errors).reduce((final, field) => {
			let msg = err.errors[field].properties.message;

			final[field] = [msg];

			return final;
		}, {});

		return callback({ status: 422, errors });
	}

	console.log("\x1b[1m\x1b[41m\x1b[37m%s\x1b[0m", err);

	return callback({ status: 500, msg: "Server Error !" });
};
