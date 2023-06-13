"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env = require("dotenv");
const pg_1 = require("pg");
env.config({ override: true });
const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_TEST_DB, NODE_ENV_TEST } = process.env;
let Client;
if (NODE_ENV_TEST) {
    Client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}
else {
    Client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}
exports.default = Client;
