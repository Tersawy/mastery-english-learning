if (process.env.NODE_ENV == "development") {
	require("dotenv").config();
}

const app = require("./src/app");

const http = require("http").createServer(app);

require("./src/database/connection");

const io = require("socket.io")(http, {
	cors: { methods: ["GET", "PATCH", "POST", "PUT"], origin: true /* accept from any domain */ },
});

require("./src/ws/connection")(io);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => console.log("\x1b[33m%s\x1b[0m", `Server Listened on PORT ${PORT}`));
