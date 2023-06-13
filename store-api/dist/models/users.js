"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTable = void 0;
const database_1 = require("../database");
const hashpassword_1 = require("../helpers/hashpassword");
const jwt_1 = require("../helpers/jwt");
class UserTable {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM users";
                const result = yield conn.query(sql);
                return result.rows;
            }
            catch (error) {
                throw new Error(`cannot get Users ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM users WHERE id=($1)";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find users ${id}.  ${err}`);
            }
        });
    }
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                u.password = hashpassword_1.default.hash(u.password);
                const data = Object.values(u);
                const sql = createUser(u);
                yield conn.query(sql, data);
                const userToken = jwt_1.default.sign({ username: u.username });
                const userRefreshToken = jwt_1.default.signRefresh({ username: u.username });
                conn.release();
                return { accessToken: userToken, refreshToken: userRefreshToken };
            }
            catch (err) {
                throw new Error(`Could not add new user ${u.firstname}. ${err}`);
            }
        });
    }
    update(u, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = updateUserByID(u, id);
                const data = Object.values(u);
                const resualt = yield conn.query(sql, data);
                return resualt.rows[0];
            }
            catch (error) {
                throw new Error(`cannot connect with users ${error}`);
            }
        });
    }
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM users WHERE username=($1)";
                const resualt = yield conn.query(sql, [username]);
                if (resualt.rows.length) {
                    const user = resualt.rows[0];
                    if (hashpassword_1.default.compare(password, user.password)) {
                        return {
                            accessToken: jwt_1.default.sign({ username: user.username }),
                            refreshToken: jwt_1.default.signRefresh({ username: user.username })
                        };
                    }
                }
                return null;
            }
            catch (error) {
                throw new Error(`cannot connect with users ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "DELETE FROM  users WHERE id =($1) RETURNING *";
                const resualt = yield conn.query(sql, [id]);
                return resualt.rows[0];
            }
            catch (error) {
                throw new Error(`cannot connect with users ${error}`);
            }
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "DELETE * FROM  products;";
                const resualt = yield conn.query(sql);
                conn.release();
                return resualt.rows[0];
            }
            catch (error) {
                throw new Error(`cannot connect with user ${error}`);
            }
        });
    }
} // user end
exports.UserTable = UserTable;
function updateUserByID(cols, id) {
    const query = ["UPDATE users"];
    query.push(" SET");
    const set = [];
    Object.keys(cols).forEach(function (key, i) {
        set.push(key + " = ($" + (i + 1) + ")");
    });
    query.push(set.join(", "));
    const reg = /^([\w]+)/;
    const updatValus = set.map(a => a.match(reg)[0]);
    let element = "";
    for (let i = 0; i < updatValus.length; i++) {
        element += updatValus[i];
        if (i < updatValus.length - 1) {
            element += ",";
        }
    }
    query.push("WHERE id = " + id + " RETURNING " + element + ";");
    return query.join(" ");
}
function createUser(cols) {
    const len = Object.keys(cols).length;
    const query = ["INSERT INTO users("];
    const set = [];
    Object.keys(cols).forEach(function (key, i) {
        if (i < len - 1) {
            set.push(key + ",");
        }
        else {
            set.push(key);
        }
    });
    set.push(") VALUES(");
    Object.keys(cols).forEach(function (key, i) {
        if (i < len - 1) {
            set.push(`$${i + 1},`);
        }
        else {
            set.push(`$${i + 1}`);
        }
    });
    set.push(") RETURNING *");
    query.push(set.join(" "));
    return query.join(" ");
}
