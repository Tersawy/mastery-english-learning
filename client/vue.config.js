const path = require("path");

module.exports = {
	lintOnSave: false,
	outputDir: path.resolve(path.join(__dirname, "../", "server", "public", "build"))
};
