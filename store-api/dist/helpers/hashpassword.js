"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const env = require("dotenv");
env.config();
const { PEPPER, SALT_ROUNDS } = process.env;
const hashpass = {
    hash(password) {
        if (SALT_ROUNDS && PEPPER) {
            return bcrypt.hashSync(password + PEPPER, parseInt(SALT_ROUNDS));
        }
        else {
            throw new Error("PEPPER or SALT_ROUNDS is null");
        }
    },
    compare(password, inputpassword) {
        if (PEPPER) {
            password = password + PEPPER;
            return bcrypt.compareSync(password, inputpassword);
        }
        else {
            throw new Error("PEPPER or SALT_ROUNDS is null");
        }
    }
};
exports.default = hashpass;
