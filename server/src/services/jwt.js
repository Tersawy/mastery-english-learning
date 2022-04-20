const jwt = require("jsonwebtoken");

const fs = require("fs");

const privateKey = fs.readFileSync("jwtRS256.key", "utf8");

const publicKey = fs.readFileSync("jwtRS256.key.pub", "utf8");

const JWTSignOptions = { algorithm: "RS256", expiresIn: "8h" };

const JWTVerifyOptions = { algorithms: ["RS256"] };

class JWT {
    static sign(payload) {
        return new Promise((resolve) => {
            jwt.sign(payload, privateKey, JWTSignOptions, async (err, token) => {
                resolve([err, token]);
            });
        });
    }

    static verify(token) {
        return new Promise((resolve) => {
            if (!token) return resolve("Token is not valid");
            jwt.verify(token, publicKey, JWTVerifyOptions, async (err, decoded) => {
                resolve([err, decoded]);
            });
        });
    }
}

module.exports = JWT;
