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
exports.OrderTable = void 0;
const database_1 = require("../database");
class OrderTable {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM orders;";
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`cannot get orders ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM orders WHERE id=($1);";
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find order ${id}. ${err}`);
            }
        });
    }
    add(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const data = Object.values(o);
                const sql = createOrder(o);
                const result = yield conn.query(sql, data);
                const Order = result.rows[0];
                conn.release();
                return Order;
            }
            catch (err) {
                throw new Error(`Could not add new order . ${err}`);
            }
        });
    }
    update(o, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const data = Object.values(o);
                const sql = updateOrderByID(o, id);
                const resualt = yield conn.query(sql, data);
                conn.release();
                return resualt.rows[0];
            }
            catch (error) {
                throw new Error(`cannot connect with order ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "DELETE FROM  orders WHERE id =($1) RETURNING *";
                const resualt = yield conn.query(sql, [id]);
                conn.release();
                return resualt.rows[0];
            }
            catch (error) {
                throw new Error(`cannot connect with order ${error}`);
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
                throw new Error(`cannot connect with order ${error}`);
            }
        });
    }
    addToCart(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const data = Object.values(o);
                const sql = createCart(o);
                const result = yield connection.query(sql, data);
                connection.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not add product to cart. Error: ${err}`);
            }
        });
    }
} // end of class
exports.OrderTable = OrderTable;
function updateOrderByID(cols, id) {
    const query = ["UPDATE orders"];
    query.push("SET");
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
function createOrder(cols) {
    const len = Object.keys(cols).length;
    const query = ["INSERT INTO orders("];
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
    set.push(") RETURNING *;");
    query.push(set.join(" "));
    return query.join(" ");
}
function createCart(cols) {
    const len = Object.keys(cols).length;
    const query = ["INSERT INTO orders("];
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
    set.push(") RETURNING *;");
    query.push(set.join(" "));
    return query.join(" ");
}
