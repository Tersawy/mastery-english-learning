const express = require("express");

const app = express();

const cors = require("cors");

const fileUpload = require("express-fileupload");

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(fileUpload({ safeFileNames: false, useTempFiles: true, uploadTimeout: 0, parseNested: true }));

require("express-async-errors");

const handleError = require("./helpers/handleError");

if (process.env.NODE_ENV == "development") {
	require("dotenv").config();
}

require("./database/config");

// app.post("/api/v1/upload", (req, res) => {
// 	console.log(req.files);
// 	return res.json({ msg: "done" });
// });
const path = require("path");
app.use(express.static(path.join(__dirname, "./public/main")));
app.use("/api/v1/lectures", express.static("./public/videos/courses/lectures"));
app.use("/api/v1/thumbnails", express.static("./public/images/courses/thumbnails"));

app.use("/api/v1/", require("./routes/auth"));
app.use("/api/v1/levels", require("./routes/levels"));
app.use("/api/v1/languages", require("./routes/languages"));
app.use("/api/v1/categories", require("./routes/categories"));
app.use("/api/v1/courses", require("./routes/courses"));
app.use("/api/v1/courses", require("./routes/courseSections"));
app.use("/api/v1/students", require("./routes/students"));

app.get(/.*/, (req, res) => {
	res.sendFile(__dirname + "/public/main/index.html");
});

app.use((err, req, res, next) => {
	handleError(err, (error) => res.status(error.status).json(error));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("\x1b[33m%s\x1b[0m", `Server Listened on PORT ${PORT}`));

// const CourseSections = require("./Models/CourseSections");
// CourseSections.findOne(
// 	{ _id: "6127c50c545340f36b6db150" },
// 	{ _id: 0, lectures: { $elemMatch: { _id: "612a8d4b54a32d8bfd662112" } } },
// 	(err, res) => {
// 		if (err) console.log("error", err);
// 		console.log(res);
// 	}
// );
// const { Types } = require( "mongoose" );
// CourseSections.updateOne({ _id: "6127c8846a715af67aab425b" }, { $push: { lectures: { title: "Welcome Back",description: "Welcome Back" } } }).then((section) => {
// console.log(section)
// })

//, { "$push": { lectures: lecture } }
// const { videoDuration, secondsToHms } = require("./helpers/functions");

// let filePath = "./public/videos/courses/lectures/2As5IlR2_1630182033892.mp4";

// videoDuration(filePath).then(duration => {
// 	// let timeInHours = duration / 60 / 60;

// 	console.log(duration)
// })

// const fs = require("fs");
// const { execSync } = require("child_process");

// console.log(fs);
// fs.unlinkSync("./test.js");

// let r = execSync("rm -rf ./test.js");

// let t = fs.rmdirSync("./test.js");
// console.log(fs);
// console.log(t);

// var buff = new Buffer.alloc(100);
// fs.open(filePath, 'r', function(err, fd) {
//   fs.read(fd, buff, 0, 100, 0, function(err, bytesRead, buffer) {
//     var start = buffer.indexOf(new Buffer.from('mvhd')) + 17;
//     var timeScale = buffer.readUInt32BE(start, 4);
//     var duration = buffer.readUInt32BE(start + 4, 4);
//     var movieLength = Math.floor(duration/timeScale);

//     console.log('time scale: ' + timeScale);
//     console.log('duration: ' + duration);
//     console.log('movie length: ' + movieLength + ' seconds');
//   });
// });
// Category.find({})
// 	.limit(1)
// 	.then((cat) => {
// 		console.log(cat);
// 	});

//https://stackoverflow.com/questions/31156884/how-to-use-https-on-node-js-using-express-socket-io
