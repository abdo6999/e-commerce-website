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
const orders_1 = require("./../models/orders");
const middleware_1 = require("../helpers/middleware");
const order = (app) => {
    app.get("/get-orders", getOrders);
    app.get("/show-order/:id", showOrder);
    app.post("/create-order", middleware_1.authenticateToken, addOrder);
    app.post("/add-product/:id", middleware_1.authenticateToken, addToCart);
    app.patch("/update-order/:id", middleware_1.authenticateToken, updateOrder);
    app.delete("/delete-order/:id", middleware_1.authenticateToken, deleteOrder);
};
const orderTable = new orders_1.OrderTable();
const getOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderTable.index();
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).send(`cannot get orders ${error}`);
    }
});
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const orders = yield orderTable.add(data);
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(400).send(`bad request create orders ${error}`);
    }
});
const showOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderTable.show(parseInt(req.params.id));
        if (orders == undefined) {
            res.status(404).send(`the id not exist in order `);
        }
        res.json(orders);
    }
    catch (error) {
        res.status(404).send(`the id not exist in order ${error}`);
    }
});
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = Object.assign({}, req.body);
    try {
        const orders = yield orderTable.update(data, parseInt(req.params.id));
        res.json(orders);
    }
    catch (error) {
        res.status(404).send(`cannot update order ${error}`);
    }
});
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderTable.delete(parseInt(req.params.id));
        res.json(orders);
    }
    catch (error) {
        res.status(404).send(`the id not exist in order ${error}`);
    }
});
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    data.order_id = parseInt(req.params.id);
    if (!data.order_id || !data.product_id || !data.quantity) {
        return res.status(400).send("Missing one or more required parameters");
    }
    try {
        const orders = yield orderTable.addToCart(data);
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(400).send(`bad request create orders ${error}`);
    }
});
exports.default = order;
