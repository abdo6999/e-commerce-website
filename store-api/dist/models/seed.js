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
const database_1 = require("../database");
const bcrypt = require("bcrypt");
const env = require("dotenv");
env.config();
const { PEPPER, SALT_ROUNDS } = process.env;
createProduct(dataProduct());
createUser(dataUser());
function createProduct(p) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.default.connect();
            let result;
            for (let i = 0; i < p.length; i++) {
                let pIndex = p[i];
                const sql = createSqlProduct(pIndex);
                let data = Object.values(pIndex);
                result = yield conn.query(sql, data);
            }
            conn.release();
        }
        catch (err) {
            throw new Error(`Could not add new Products . ${err}`);
        }
    });
}
function createUser(p) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.default.connect();
            let result;
            for (let i = 0; i < p.length; i++) {
                let pIndex = p[i];
                pIndex.password = bcrypt.hashSync(pIndex.password + PEPPER, parseInt(SALT_ROUNDS));
                let data = Object.values(pIndex);
                const sql = createSqlUser(pIndex);
                result = yield conn.query(sql, data);
            }
            conn.release();
        }
        catch (err) {
            throw new Error(`Could not add new Products .  ${err}`);
        }
    });
}
function createOrder(p) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.default.connect();
            let result;
            for (let i = 0; i < p.length; i++) {
                let pIndex = p[i];
                let data = Object.values(pIndex);
                const sql = createSqlOrder(pIndex);
                result = yield conn.query(sql, data);
            }
            conn.release();
        }
        catch (err) {
            throw new Error(`Could not add new Products .  ${err}`);
        }
    });
}
function dataUser() {
    return [
        {
            firstName: "Terry",
            lastName: "Medhurst",
            gender: "male",
            email: "atuny0@sohu.com",
            username: "atuny0",
            password: "23423fgsdgsd"
        },
        {
            firstName: "Sheldon",
            lastName: "Quigley",
            gender: "male",
            email: "hbingley1@plala.or.jp",
            username: "hbingley1",
            password: "2342fgds"
        },
        {
            firstName: "Terrill",
            lastName: "Hills",
            gender: "male",
            email: "rshawe2@51.la",
            username: "rshawe2",
            password: "235234534fg"
        },
        {
            firstName: "Miles",
            lastName: "Cummerata",
            gender: "male",
            email: "yraigatt3@nature.com",
            username: "yraigatt3",
            password: "dfhfghf"
        },
        {
            firstName: "Mavis",
            lastName: "Schultz",
            gender: "male",
            email: "kmeus4@upenn.edu",
            username: "kmeus4",
            password: "fghfdhdfgh"
        },
        {
            firstName: "Alison",
            lastName: "Reichert",
            gender: "female",
            email: "jtreleven5@nhs.uk",
            username: "jtreleven5",
            password: "fghghfdh"
        },
        {
            firstName: "Oleta",
            lastName: "Abbott",
            gender: "female",
            email: "dpettegre6@columbia.edu",
            username: "dpettegre6",
            password: "dfasfsdfs"
        },
        {
            firstName: "Ewell",
            lastName: "Mueller",
            gender: "male",
            email: "ggude7@chron.com",
            username: "ggude7",
            password: "ffffff"
        },
        {
            firstName: "Demetrius",
            lastName: "Corkery",
            gender: "male",
            email: "nloiterton8@aol.com",
            username: "nloiterton8",
            password: "dddddd"
        },
        {
            firstName: "Eleanora",
            lastName: "Price",
            gender: "female",
            email: "umcgourty9@jalbum.net",
            username: "umcgourty9",
            password: "i0xzpX"
        }
    ];
}
function dataProduct() {
    return [
        {
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
        },
        {
            title: "iPhone X",
            description: "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
            price: 899,
            rating: 4.44,
            stock: 34,
            brand: "Apple",
            category: "smartphones",
            thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
            images: [
                "https://i.dummyjson.com/data/products/2/1.jpg",
                "https://i.dummyjson.com/data/products/2/2.jpg",
                "https://i.dummyjson.com/data/products/2/3.jpg",
                "https://i.dummyjson.com/data/products/2/thumbnail.jpg"
            ]
        },
        {
            title: "Samsung Universe 9",
            description: "Samsung's new variant which goes beyond Galaxy to the Universe",
            price: 1249,
            rating: 4.09,
            stock: 36,
            brand: "Samsung",
            category: "smartphones",
            thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
            images: ["https://i.dummyjson.com/data/products/3/1.jpg"]
        },
        {
            title: "OPPOF19",
            description: "OPPO F19 is officially announced on April 2021.",
            price: 280,
            rating: 4.3,
            stock: 123,
            brand: "OPPO",
            category: "smartphones",
            thumbnail: "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
            images: [
                "https://i.dummyjson.com/data/products/4/1.jpg",
                "https://i.dummyjson.com/data/products/4/2.jpg",
                "https://i.dummyjson.com/data/products/4/3.jpg",
                "https://i.dummyjson.com/data/products/4/4.jpg",
                "https://i.dummyjson.com/data/products/4/thumbnail.jpg"
            ]
        },
        {
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
        },
        {
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
        },
        {
            title: "Samsung Galaxy Book",
            description: "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
            price: 1499,
            rating: 4.25,
            stock: 50,
            brand: "Samsung",
            category: "laptops",
            thumbnail: "https://i.dummyjson.com/data/products/7/thumbnail.jpg",
            images: [
                "https://i.dummyjson.com/data/products/7/1.jpg",
                "https://i.dummyjson.com/data/products/7/2.jpg",
                "https://i.dummyjson.com/data/products/7/3.jpg",
                "https://i.dummyjson.com/data/products/7/thumbnail.jpg"
            ]
        },
        {
            title: "Microsoft Surface Laptop 4",
            description: "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
            price: 1499,
            rating: 4.43,
            stock: 68,
            brand: "Microsoft Surface",
            category: "laptops",
            thumbnail: "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
            images: [
                "https://i.dummyjson.com/data/products/8/1.jpg",
                "https://i.dummyjson.com/data/products/8/2.jpg",
                "https://i.dummyjson.com/data/products/8/3.jpg",
                "https://i.dummyjson.com/data/products/8/4.jpg",
                "https://i.dummyjson.com/data/products/8/thumbnail.jpg"
            ]
        },
        {
            title: "Infinix INBOOK",
            description: "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
            price: 1099,
            rating: 4.54,
            stock: 96,
            brand: "Infinix",
            category: "laptops",
            thumbnail: "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
            images: [
                "https://i.dummyjson.com/data/products/9/1.jpg",
                "https://i.dummyjson.com/data/products/9/2.png",
                "https://i.dummyjson.com/data/products/9/3.png",
                "https://i.dummyjson.com/data/products/9/4.jpg",
                "https://i.dummyjson.com/data/products/9/thumbnail.jpg"
            ]
        },
        {
            title: "perfume Oil",
            description: "Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil",
            price: 13,
            rating: 4.26,
            stock: 65,
            brand: "Impression of Acqua Di Gio",
            category: "fragrances",
            thumbnail: "https://i.dummyjson.com/data/products/11/thumbnail.jpg",
            images: [
                "https://i.dummyjson.com/data/products/11/1.jpg",
                "https://i.dummyjson.com/data/products/11/2.jpg",
                "https://i.dummyjson.com/data/products/11/3.jpg",
                "https://i.dummyjson.com/data/products/11/thumbnail.jpg"
            ]
        },
        {
            title: "Brown Perfume",
            description: "Royal_Mirage Sport Brown Perfume for Men & Women - 120ml",
            price: 40,
            rating: 4,
            stock: 52,
            brand: "Royal_Mirage",
            category: "fragrances",
            thumbnail: "https://i.dummyjson.com/data/products/12/thumbnail.jpg",
            images: [
                "https://i.dummyjson.com/data/products/12/1.jpg",
                "https://i.dummyjson.com/data/products/12/2.jpg",
                "https://i.dummyjson.com/data/products/12/3.png",
                "https://i.dummyjson.com/data/products/12/4.jpg",
                "https://i.dummyjson.com/data/products/12/thumbnail.jpg"
            ]
        },
        {
            title: "Fog Scent Xpressio Perfume",
            description: "Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men",
            price: 13,
            rating: 4.59,
            stock: 61,
            brand: "Fog Scent Xpressio",
            category: "fragrances",
            thumbnail: "https://i.dummyjson.com/data/products/13/thumbnail.webp",
            images: [
                "https://i.dummyjson.com/data/products/13/1.jpg",
                "https://i.dummyjson.com/data/products/13/2.png",
                "https://i.dummyjson.com/data/products/13/3.jpg",
                "https://i.dummyjson.com/data/products/13/4.jpg",
                "https://i.dummyjson.com/data/products/13/thumbnail.webp"
            ]
        },
        {
            title: "Non-Alcoholic Concentrated Perfume Oil",
            description: "Original Al Munakh® by Mahal Al Musk | Our Impression of Climate | 6ml Non-Alcoholic Concentrated Perfume Oil",
            price: 120,
            rating: 4.21,
            stock: 114,
            brand: "Al Munakh",
            category: "fragrances",
            thumbnail: "https://i.dummyjson.com/data/products/14/thumbnail.jpg",
            images: [
                "https://i.dummyjson.com/data/products/14/1.jpg",
                "https://i.dummyjson.com/data/products/14/2.jpg",
                "https://i.dummyjson.com/data/products/14/3.jpg",
                "https://i.dummyjson.com/data/products/14/thumbnail.jpg"
            ]
        },
        {
            title: "Eau De Perfume Spray",
            description: "Genuine  Al-Rehab spray perfume from UAE/Saudi Arabia/Yemen High Quality",
            price: 30,
            rating: 4.7,
            stock: 105,
            brand: "Lord - Al-Rehab",
            category: "fragrances",
            thumbnail: "https://i.dummyjson.com/data/products/15/thumbnail.jpg",
            images: [
                "https://i.dummyjson.com/data/products/15/1.jpg",
                "https://i.dummyjson.com/data/products/15/2.jpg",
                "https://i.dummyjson.com/data/products/15/3.jpg",
                "https://i.dummyjson.com/data/products/15/4.jpg",
                "https://i.dummyjson.com/data/products/15/thumbnail.jpg"
            ]
        },
        {
            title: "Hyaluronic Acid Serum",
            description: "L'OrÃ©al Paris introduces Hyaluron Expert Replumping Serum formulated with 1.5% Hyaluronic Acid",
            price: 19,
            rating: 4.83,
            stock: 110,
            brand: "L'Oreal Paris",
            category: "skincare",
            thumbnail: "https://i.dummyjson.com/data/products/16/thumbnail.jpg",
            images: [
                "https://i.dummyjson.com/data/products/16/1.png",
                "https://i.dummyjson.com/data/products/16/2.webp",
                "https://i.dummyjson.com/data/products/16/3.jpg",
                "https://i.dummyjson.com/data/products/16/4.jpg",
                "https://i.dummyjson.com/data/products/16/thumbnail.jpg"
            ]
        },
        {
            title: "Tree Oil 30ml",
            description: "Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,",
            price: 12,
            rating: 4.52,
            stock: 78,
            brand: "Hemani Tea",
            category: "skincare",
            thumbnail: "https://i.dummyjson.com/data/products/17/thumbnail.jpg",
            images: [
                "https://i.dummyjson.com/data/products/17/1.jpg",
                "https://i.dummyjson.com/data/products/17/2.jpg",
                "https://i.dummyjson.com/data/products/17/3.jpg",
                "https://i.dummyjson.com/data/products/17/thumbnail.jpg"
            ]
        },
        {
            title: "Oil Free Moisturizer 100ml",
            description: "Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.",
            price: 40,
            rating: 4.56,
            stock: 88,
            brand: "Dermive",
            category: "skincare",
            thumbnail: "https://i.dummyjson.com/data/products/18/thumbnail.jpg",
            images: [
                "https://i.dummyjson.com/data/products/18/1.jpg",
                "https://i.dummyjson.com/data/products/18/2.jpg",
                "https://i.dummyjson.com/data/products/18/3.jpg",
                "https://i.dummyjson.com/data/products/18/4.jpg",
                "https://i.dummyjson.com/data/products/18/thumbnail.jpg"
            ]
        },
        {
            title: "Skin Beauty Serum.",
            description: "Product name: rorec collagen hyaluronic acid white face serum riceNet weight: 15 m",
            price: 46,
            rating: 4.42,
            stock: 54,
            brand: "ROREC White Rice",
            category: "skincare",
            thumbnail: "https://i.dummyjson.com/data/products/19/thumbnail.jpg",
            images: [
                "https://i.dummyjson.com/data/products/19/1.jpg",
                "https://i.dummyjson.com/data/products/19/2.jpg",
                "https://i.dummyjson.com/data/products/19/3.png",
                "https://i.dummyjson.com/data/products/19/thumbnail.jpg"
            ]
        },
        {
            title: "Freckle Treatment Cream- 15gm",
            description: "Fair & Clear is Pakistan's only pure Freckle cream which helpsfade Freckles, Darkspots and pigments. Mercury level is 0%, so there are no side effects.",
            price: 70,
            rating: 4.06,
            stock: 140,
            brand: "Fair & Clear",
            category: "skincare",
            thumbnail: "https://i.dummyjson.com/data/products/20/thumbnail.jpg",
            images: [
                "https://i.dummyjson.com/data/products/20/1.jpg",
                "https://i.dummyjson.com/data/products/20/2.jpg",
                "https://i.dummyjson.com/data/products/20/3.jpg",
                "https://i.dummyjson.com/data/products/20/4.jpg",
                "https://i.dummyjson.com/data/products/20/thumbnail.jpg"
            ]
        },
        {
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
        },
        {
            title: "Elbow Macaroni - 400 gm",
            description: "Product details of Bake Parlor Big Elbow Macaroni - 400 gm",
            price: 14,
            rating: 4.57,
            stock: 146,
            brand: "Bake Parlor Big",
            category: "groceries",
            thumbnail: "https://i.dummyjson.com/data/products/22/thumbnail.jpg",
            images: [
                "https://i.dummyjson.com/data/products/22/1.jpg",
                "https://i.dummyjson.com/data/products/22/2.jpg",
                "https://i.dummyjson.com/data/products/22/3.jpg"
            ]
        }
    ];
}
function dataOrder() {
    return [
        {
            "products_id": [8, 15],
            "user_id": 5,
            "stutas": false,
            "orderDate": "12/02/23",
        },
        {
            "products_id": [8, 7],
            "user_id": 4,
            "stutas": true,
            "orderDate": "12/09/23",
        },
        {
            "products_id": [6, 4],
            "user_id": 3,
            "stutas": true,
            "orderDate": "05/27/22",
        },
        {
            "products_id": [8, 15],
            "user_id": 3,
            "stutas": false,
            "orderDate": "09/05/22",
        },
        {
            "products_id": [16, 12],
            "user_id": 4,
            "stutas": false,
            "orderDate": "03/20/22",
        },
        {
            "products_id": [9, 10],
            "user_id": 8,
            "stutas": true,
            "orderDate": "02/12/23",
        },
        {
            "products_id": [2, 9],
            "user_id": 1,
            "stutas": true,
            "orderDate": "03/21/23",
        },
        {
            "products_id": [8, 12],
            "user_id": 7,
            "stutas": false,
            "orderDate": "08/10/23",
        },
        {
            "products_id": [14, 17],
            "user_id": 6,
            "stutas": false,
            "orderDate": "06/09/23",
        },
        {
            "products_id": [12, 5],
            "user_id": 3,
            "stutas": true,
            "orderDate": "09/13/22",
        },
        {
            "products_id": [21, 17],
            "user_id": 9,
            "stutas": true,
            "orderDate": "10/14/22",
        },
        {
            "products_id": [20, 4],
            "user_id": 8,
            "stutas": true,
            "orderDate": "08/01/22",
        },
        {
            "products_id": [16, 12],
            "user_id": 5,
            "stutas": true,
            "orderDate": "12/01/23",
        },
        {
            "products_id": [14, 13],
            "user_id": 8,
            "stutas": false,
            "orderDate": '',
        },
        {
            "products_id": [14, 17],
            "user_id": 4,
            "stutas": true,
            "orderDate": "08/15/23",
        },
        {
            "products_id": [15, 17],
            "user_id": 3,
            "stutas": true,
            "orderDate": "03/05/23",
        },
        {
            "products_id": [1, 3],
            "user_id": 1,
            "stutas": false,
            "orderDate": "09/22/22",
        },
    ];
}
function createSqlProduct(cols) {
    let len = Object.keys(cols).length;
    var query = ["INSERT INTO products("];
    var set = [];
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
function createSqlUser(cols) {
    let len = Object.keys(cols).length;
    var query = ["INSERT INTO users("];
    var set = [];
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
function createSqlOrder(cols) {
    let len = Object.keys(cols).length;
    var query = ["INSERT INTO orders("];
    var set = [];
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
