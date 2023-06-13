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
const products_1 = require("./../models/products");
const middleware_1 = require("../helpers/middleware");
const product = (app) => {
    app.get("/get-products", getProducts);
    app.get("/show-product/:id", showProduct);
    app.post("/create-product", middleware_1.authenticateToken, addProduct);
    app.patch("/update-product/:id", middleware_1.authenticateToken, updateProduct);
    app.delete("/delete-product/:id", middleware_1.authenticateToken, deleteProduct);
};
const productTable = new products_1.ProductTable();
const getProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productTable.index();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).send(`cannot get products ${error}`);
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const products = yield productTable.add(data);
        res.status(200).json(products);
    }
    catch (error) {
        res.status(400).send(`bad request create products ${error}`);
    }
});
const showProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productTable.show(parseInt(req.params.id));
        if (products == undefined) {
            res.status(404).send(`the id not exist in peoduct `);
        }
        res.json(products);
    }
    catch (error) {
        res.status(404).send(`the id not exist in product ${error}`);
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = Object.assign({}, req.body);
        const products = yield productTable.update(data, parseInt(req.params.id));
        res.json(products);
    }
    catch (error) {
        res.status(400).send(`cannot update product ${error}`);
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productTable.delete(parseInt(req.params.id));
        res.json(products);
    }
    catch (error) {
        res.status(404).send(`the id not exist in product ${error}`);
    }
});
exports.default = product;
