"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();
const { ACCESS_TOKEN_SECRET } = process.env;
const authenticateToken = (req, res, next) => {
    const autheHeader = req.get("authorization");
    const token = autheHeader === null || autheHeader === void 0 ? void 0 : autheHeader.split(" ")[1];
    if (token == null || token == undefined)
        return res.status(401).send("token rquiered");
    if (ACCESS_TOKEN_SECRET) {
        jwt.verify(token, ACCESS_TOKEN_SECRET, err => {
            if (err)
                return res.status(401).send(`${err}`);
            next();
        });
    }
    else {
        throw new Error("REFRESH_TOKEN_SECRET is null");
    }
};
exports.authenticateToken = authenticateToken;
