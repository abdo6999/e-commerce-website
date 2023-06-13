"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
const jwtToken = {
    sign(username) {
        if (ACCESS_TOKEN_SECRET) {
            return jwt.sign(username, ACCESS_TOKEN_SECRET, { expiresIn: "48h" });
        }
        else {
            throw new Error("ACCESS_TOKEN_SECRET is null");
        }
    },
    signRefresh(username) {
        if (REFRESH_TOKEN_SECRET) {
            return jwt.sign(username, REFRESH_TOKEN_SECRET, { expiresIn: "1y" });
        }
        else {
            throw new Error("REFRESH_TOKEN_SECRET is null");
        }
    },
    vreifyRefreshToken(refreshToken) {
        let username;
        if (REFRESH_TOKEN_SECRET) {
            jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, payload) => {
                if (err)
                    throw err;
                username = payload.username || undefined;
            });
        }
        else {
            throw new Error("REFRESH_TOKEN_SECRET is null");
        }
        return username;
    }
};
exports.default = jwtToken;
