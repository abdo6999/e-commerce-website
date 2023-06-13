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
const products_1 = require("../models/products");
const request = supertest(server_1.default);
let product = new products_1.ProductTable();
describe("Test product values", () => {
    it("check get-products  retarn value", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield product.index();
        expect(response[0]).toEqual({
            id: 1,
            title: "iPhone 9",
            description: "An apple mobile which is nothing like apple",
            price: 549,
            rating: 4.69,
            stock: 94,
            brand: "Apple",
            category: "smartphones",
            thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
            images: [
                "https://i.dummyjson.com/data/products/1/1.jpg",
                "https://i.dummyjson.com/data/products/1/2.jpg",
                "https://i.dummyjson.com/data/products/1/3.jpg",
                "https://i.dummyjson.com/data/products/1/4.jpg",
                "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
            ]
        });
    }));
    it("check show-product  retarn value", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield product.show(5);
        expect(response).toEqual({
            id: 5,
            title: "Huawei P30",
            description: "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
            price: 499,
            rating: 4.09,
            stock: 32,
            brand: "Huawei",
            category: "smartphones",
            thumbnail: "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
            images: [
                "https://i.dummyjson.com/data/products/5/1.jpg",
                "https://i.dummyjson.com/data/products/5/2.jpg",
                "https://i.dummyjson.com/data/products/5/3.jpg"
            ]
        });
    }));
    it("check create-product endpoint retarn value", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield product.add({
            title: "MacBook Pro",
            description: "MacBook Pro 2021 with mini-LED display may launch between September, November",
            price: 1749,
            rating: 4.57,
            stock: 83,
            brand: "Apple",
            category: "laptops",
            thumbnail: "https://i.dummyjson.com/data/products/6/thumbnail.png",
            images: [
                "https://i.dummyjson.com/data/products/6/1.png",
                "https://i.dummyjson.com/data/products/6/2.jpg",
                "https://i.dummyjson.com/data/products/6/3.png",
                "https://i.dummyjson.com/data/products/6/4.jpg"
            ]
        });
        expect(response).toEqual({
            id: 22,
            title: "MacBook Pro",
            description: "MacBook Pro 2021 with mini-LED display may launch between September, November",
            price: 1749,
            rating: 4.57,
            stock: 83,
            brand: "Apple",
            category: "laptops",
            thumbnail: "https://i.dummyjson.com/data/products/6/thumbnail.png",
            images: [
                "https://i.dummyjson.com/data/products/6/1.png",
                "https://i.dummyjson.com/data/products/6/2.jpg",
                "https://i.dummyjson.com/data/products/6/3.png",
                "https://i.dummyjson.com/data/products/6/4.jpg"
            ]
        });
    }));
    it("check update-product  endpoint retarn value", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield product.update({
            rating: 4.54,
            stock: 852
        }, 8);
        expect(response).toEqual({
            rating: 4.54,
            stock: 852
        });
    }));
});
describe("Test product responses", () => {
    it("get get-products endpoint to be 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/get-products");
        expect(response.status).toBe(200);
    }));
    it("get show-product with invalid query endpoint to be 404", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/show-product/555");
        expect(response.status).toBe(404);
    }));
    it("get show-product with valid query endpoint to be 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/show-product/5");
        expect(response.status).toBe(200);
    }));
    it("post create-product with Unauthorized and valid body endpoint to be 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post("/create-product").send({
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
    it("post create-product with authorized and  valid body  endpoint to be 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post("/create-product")
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
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY4MTczNDYsImV4cCI6MTY3Njk5MDE0Nn0.S-o0HDruYndaBzgYENIr_vULBjC1SARzAm91neA7P3M");
        expect(response.status).toBe(200);
    }));
    it("post create-product with authorized and unvalid body  endpoint to be 400", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post("/create-product")
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
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY4MTczNDYsImV4cCI6MTY3Njk5MDE0Nn0.S-o0HDruYndaBzgYENIr_vULBjC1SARzAm91neA7P3M");
        expect(response.status).toBe(400);
    }));
    it("patch update-product with Unauthorized  and  valid body endpoint to be 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.patch("/update-product/4").send({
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
    it("patch update-product with authorized and  valid body endpoint to be 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .patch("/update-product/4")
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
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY4MTczNDYsImV4cCI6MTY3Njk5MDE0Nn0.S-o0HDruYndaBzgYENIr_vULBjC1SARzAm91neA7P3M");
        expect(response.status).toBe(200);
    }));
    it("delete delete-product with authorized and  valid body endpoint to be 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .delete("/delete-product/8")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY4MTczNDYsImV4cCI6MTY3Njk5MDE0Nn0.S-o0HDruYndaBzgYENIr_vULBjC1SARzAm91neA7P3M");
        expect(response.status).toBe(200);
    }));
});
