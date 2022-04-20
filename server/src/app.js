const express = require("express");

const app = express();

require("express-async-errors");

const fileUpload = require("express-fileupload");

const cors = require("cors");

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(fileUpload({ useTempFiles: true, uploadTimeout: 0, parseNested: true }));

const handleError = require("./helpers/handleError");

const path = require("path");

app.use(express.static(path.join(__dirname, "./public/dist")));

app.use((req, res, next) => {
    next();
})

let statics = [
    { path: "/lectures", dir: "./public/videos/courses/lectures" },
    { path: "/thumbnails", dir: "./public/images/courses/thumbnails" },
    { path: "/user-image", dir: "./public/images/users" },
    { path: "/icons", dir: "./public/images/icons" },
    { path: "/settings-images", dir: "./public/images/settings" },
];

for (let static of statics) {
    app.use("/api/v2" + static.path, express.static(static.dir));
}

let routes = [
    { path: "/", file: "auth" },
    { path: "/levels", file: "levels" },
    { path: "/languages", file: "languages" },
    { path: "/categories", file: "categories" },
    { path: "/courses", file: "courses" },
    { path: "/students", file: "students" },
    { path: "/instructors", file: "instructors" },
    { path: "/admins", file: "admins" },
    { path: "/pages", file: "pages" },
    { path: "/settings", file: "settings" },
    { path: "/chat", file: "chat" },
];

for (let route of routes) {
    app.use("/api/v2" + route.path, require("./routes/" + route.file));
}

app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname, "../public/dist/index.html")));

app.use((err, req, res, next) => {
    handleError(err, (error) => res.status(error.status).json(error));
});

module.exports = app;
