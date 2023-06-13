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
const supertest = require("supertest");
const server_1 = require("../server");
const request = supertest(server_1.default);
describe("Test user responses", () => {
    it("get get-users endpoint to be 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/get-users");
        expect(response.status).toBe(200);
    }));
    it("get show-user with Unauthorized and  invalid query endpoint to be 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/show-user/555");
        expect(response.status).toBe(401);
    }));
    it("get show-user with authorized valid query endpoint to be 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get("/show-user/5")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY2NDM5NzgsImV4cCI6MTY3NjgxNjc3OH0.PwADnecdJn-GZou8Q7SdSRzMe197AZsLml1Ysc1ih5M");
        expect(response.status).toBe(200);
    }));
    it("post create-user with  valid body endpoint to be 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post("/create-user").send({
            firstName: "Alison",
            lastName: "Reichert",
            gender: "female",
            email: "jtreleven5@nhs.uk",
            username: "jtreffffleven5",
            password: "fghghfdh"
        });
        expect(response.status).toBe(200);
    }));
    it("post create-user with authorized and unvalid body  endpoint to be 400", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post("/create-user")
            .send({
            lastName: "Reichert",
            gender: "female",
            username: "jtrdddeffffleven5",
            password: "fghghfdh"
        });
        expect(response.status).toBe(400);
    }));
    it("patch update-user with Unauthorized  and  valid body endpoint to be 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.patch("/update-user/4").send({
            firstName: "Alison",
            lastName: "Reichert",
            gender: "female",
        });
        expect(response.status).toBe(401);
    }));
    it("patch update-user with authorized and  valid body endpoint to be 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .patch("/update-user/4")
            .send({
            firstName: "Alison",
            lastName: "Reichert",
            gender: "female",
        })
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY2NDM5NzgsImV4cCI6MTY3NjgxNjc3OH0.PwADnecdJn-GZou8Q7SdSRzMe197AZsLml1Ysc1ih5M");
        expect(response.status).toBe(200);
    }));
    it("delete delete-user with authorized and  valid body endpoint to be 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .delete("/delete-user/4")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY2NDM5NzgsImV4cCI6MTY3NjgxNjc3OH0.PwADnecdJn-GZou8Q7SdSRzMe197AZsLml1Ysc1ih5M");
        expect(response.status).toBe(200);
    }));
});
