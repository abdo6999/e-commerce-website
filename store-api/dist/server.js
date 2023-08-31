"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./env");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const address = env_1.PORT;
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use("/api", routes_1.default);
app.listen(address, function () {
    console.log(`starting app on: ${address}`);
});
//# sourceMappingURL=server.js.map