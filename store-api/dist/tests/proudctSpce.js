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
describe("Test proudct responses", () => {
    it("get get-proudcts endpoint to be 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/get-proudcts");
        expect(response.status).toBe(200);
    }));
    it("get show-proudct with invalid query endpoint to be 404", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/show-proudct/555");
        expect(response.status).toBe(404);
    }));
    it("get show-proudct with valid query endpoint to be 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/show-proudct/5");
        expect(response.status).toBe(200);
    }));
    it("post create-proudct with Unauthorized and valid body endpoint to be 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post("/create-proudct").send({
            title: "- Daal Masoor 500 grams",
            description: "Fine quality Branded Product Keep in a cool and dry place",
            price: 20,
            rating: 4.44,
            stock: 133,
            brand: "Saaf & Khaas",
            category: "groceries",
            thumbnail: "https://i.dummyjson.com/data/products/21/thumbnail.png",
            images: [
                "https://i.dummyjson.com/data/products/21/1.png",
                "https://i.dummyjson.com/data/products/21/2.jpg",
                "https://i.dummyjson.com/data/products/21/3.jpg"
            ]
        });
        expect(response.status).toBe(401);
    }));
    it("post create-proudct with authorized and  valid body  endpoint to be 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post("/create-proudct")
            .send({
            title: "- Daal Masoor 500 grams",
            description: "Fine quality Branded Product Keep in a cool and dry place",
            price: 20,
            rating: 4.44,
            stock: 133,
            brand: "Saaf & Khaas",
            category: "groceries",
            thumbnail: "https://i.dummyjson.com/data/products/21/thumbnail.png",
            images: [
                "https://i.dummyjson.com/data/products/21/1.png",
                "https://i.dummyjson.com/data/products/21/2.jpg",
                "https://i.dummyjson.com/data/products/21/3.jpg"
            ]
        })
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY2NDM5NzgsImV4cCI6MTY3NjgxNjc3OH0.PwADnecdJn-GZou8Q7SdSRzMe197AZsLml1Ysc1ih5M");
        expect(response.status).toBe(200);
    }));
    it("post create-proudct with authorized and unvalid body  endpoint to be 400", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post("/create-proudct")
            .send({
            price: 20,
            rating: 4.44,
            stock: 133,
            brand: "Saaf & Khaas",
            category: "groceries",
            thumbnail: "https://i.dummyjson.com/data/products/21/thumbnail.png",
            images: [
                "https://i.dummyjson.com/data/products/21/1.png",
                "https://i.dummyjson.com/data/products/21/2.jpg",
                "https://i.dummyjson.com/data/products/21/3.jpg"
            ]
        })
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY2NDM5NzgsImV4cCI6MTY3NjgxNjc3OH0.PwADnecdJn-GZou8Q7SdSRzMe197AZsLml1Ysc1ih5M");
        expect(response.status).toBe(400);
    }));
    it("patch update-proudct with Unauthorized  and  valid body endpoint to be 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.patch("/update-proudct/4").send({
            brand: "Saaf & Khaas",
            category: "groceries",
            thumbnail: "https://i.dummyjson.com/data/products/21/thumbnail.png",
            images: [
                "https://i.dummyjson.com/data/products/21/1.png",
                "https://i.dummyjson.com/data/products/21/2.jpg",
                "https://i.dummyjson.com/data/products/21/3.jpg"
            ]
        });
        expect(response.status).toBe(401);
    }));
    it("patch update-proudct with authorized and  valid body endpoint to be 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .patch("/update-proudct/4")
            .send({
            brand: "Saaf & Khaas",
            category: "groceries",
            thumbnail: "https://i.dummyjson.com/data/products/21/thumbnail.png",
            images: [
                "https://i.dummyjson.com/data/products/21/1.png",
                "https://i.dummyjson.com/data/products/21/2.jpg",
                "https://i.dummyjson.com/data/products/21/3.jpg"
            ]
        })
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY2NDM5NzgsImV4cCI6MTY3NjgxNjc3OH0.PwADnecdJn-GZou8Q7SdSRzMe197AZsLml1Ysc1ih5M");
        expect(response.status).toBe(200);
    }));
    it("delete delete-proudct with authorized and  valid body endpoint to be 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .delete("/delete-proudct/4")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY2NDM5NzgsImV4cCI6MTY3NjgxNjc3OH0.PwADnecdJn-GZou8Q7SdSRzMe197AZsLml1Ysc1ih5M");
        expect(response.status).toBe(200);
    }));
});
