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
const jwt_1 = require("../helpers/jwt");
const users_1 = require("./../models/users");
const middleware_1 = require("../helpers/middleware");
const user = (app) => {
    app.get("/get-users", middleware_1.authenticateToken, getUsers);
    app.get("/show-user/:id", middleware_1.authenticateToken, showUser);
    app.post("/create-user", createUser);
    app.post("/refresh-token", refreshToken);
    app.patch("/update-user/:id", middleware_1.authenticateToken, updateUser);
    app.delete("/delete-user/:id", middleware_1.authenticateToken, deleteUser);
    app.post("/authenticate-user", authenticateUser);
};
const userTable = new users_1.UserTable();
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userTable.index();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).send(`cannot get users ${error}`);
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const users = yield userTable.create(data);
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).send(`bad request create orders ${error}`);
    }
});
const showUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userTable.show(parseInt(req.params.id));
        if (users == undefined) {
            res.status(404).send(`the id not exist in user `);
        }
        res.json(users);
    }
    catch (error) {
        res.status(404).send(`the id not exist in user ${error}`);
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = Object.assign({}, req.body);
        const users = yield userTable.update(data, parseInt(req.params.id));
        res.json(users);
    }
    catch (error) {
        res.status(500).send(`cannot update user ${error}`);
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userTable.delete(req.body.id);
        res.json(users);
    }
    catch (error) {
        res.status(404).send(`the id not exist in order ${error}`);
    }
});
const authenticateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            username: req.body.username,
            password: req.body.password
        };
        const users = yield userTable.authenticate(data.username, data.password);
        res.json(users);
    }
    catch (error) {
        res.status(401).send(`username or password not correct ${error}`);
    }
});
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.body;
        const users = jwt_1.default.vreifyRefreshToken(refreshToken);
        const userToken = jwt_1.default.sign({ username: users });
        const userRefreshToken = jwt_1.default.signRefresh({ username: users });
        res
            .status(200)
            .json({ accessToken: userToken, refreshToken: userRefreshToken });
    }
    catch (error) {
        res.status(401).send(`token is not correct ${error}`);
    }
});
exports.default = user;
