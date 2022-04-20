const fs = require("fs");

const path = require("path");

require("dotenv").config();

fs.readdir(path.resolve(__dirname), async (err, files) => {
	if (err) return console.log("\x1b[1m\x1b[31%s\x1b[0m", err);

	let thisFile = path.basename(__filename);

	files = files.filter((file) => file != thisFile);

	let actionName = process.argv[2] || "refresh";

	await require("../connection");

	console.log("\x1b[1m\x1b[32m%s\x1b[0m", `[${actionName} Seed] started`);

	for (let i = 0; i < files.length; i++) {
		let seed = require(`./${files[i]}`);

		await actions[actionName](seed.model, seed.data);
	}

	process.exit(1);
});

let actions = {
	async down(model) {
		try {
			await model.deleteMany({});

			console.log("\x1b[33m%s\x1b[0m", `[Seed] [${model.collection.modelName}]: Deleted`);
		} catch (err) {
			console.log("\x1b[41m%s\x1b[0m", `[Seed] [${model.collection.modelName}]: \n ${err}`);
		}
	},

	async up(model, data) {
		try {
			await model.insertMany(data);

			console.log("\x1b[36m%s\x1b[0m", `[Seed] [${model.collection.modelName}]: Successfully`);
		} catch (err) {
			console.log("\x1b[41m%s\x1b[0m", `[Seed] [${model.collection.modelName}]: \n ${err}`);
		}
	},

	async refresh(model, data) {
		await this.down(model);
		return this.up(model, data);
	},
};
