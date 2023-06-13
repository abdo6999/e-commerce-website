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
exports.ProductTable = void 0;
const database_1 = require("../database");
class ProductTable {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM products;";
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`cannot get products ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = "SELECT * FROM products WHERE id=($1);";
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find products ${id}. ${err}`);
            }
        });
    }
    add(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const data = Object.values(p);
                const sql = createProduct(p);
                const result = yield conn.query(sql, data);
                const product = result.rows[0];
                conn.release();
                return product;
            }
            catch (err) {
                throw new Error(`Could not add new product ${p.title}.  ${err}`);
            }
        });
    }
    update(p, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const data = Object.values(p);
                const sql = updateProductByID(p, id);
                const resualt = yield conn.query(sql, data);
                conn.release();
                return resualt.rows[0];
            }
            catch (error) {
                throw new Error(`cannot connect with products ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "DELETE FROM  products WHERE id =($1) RETURNING *;";
                const resualt = yield conn.query(sql, [id]);
                conn.release();
                return resualt.rows[0];
            }
            catch (error) {
                throw new Error(`cannot connect with products ${error}`);
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
                throw new Error(`cannot connect with products ${error}`);
            }
        });
    }
} // end of class
exports.ProductTable = ProductTable;
function updateProductByID(cols, id) {
    const query = ["UPDATE products"];
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
            element += ", ";
        }
    }
    query.push("WHERE id = " + id + " RETURNING " + element + ";");
    return query.join(" ");
}
function createProduct(cols) {
    const len = Object.keys(cols).length;
    const query = ["INSERT INTO products("];
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
