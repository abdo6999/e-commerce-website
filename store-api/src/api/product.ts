import { ProductTable } from "./../models/products";
import { Request, Response } from "express";
import * as express from "express";
import { Product } from "../helpers/models";
import { authenticateToken } from "../helpers/middleware";

const product = (app: express.Application) => {
  app.get("/get-products", getProducts);
  app.get("/show-product/:id", showProduct);
  app.post("/create-product", authenticateToken, addProduct);
  app.patch("/update-product/:id", authenticateToken, updateProduct);
  app.delete("/delete-product/:id", authenticateToken, deleteProduct);
};
const productTable = new ProductTable();
const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productTable.index();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(`cannot get products ${error}`);
  }
};
const addProduct = async (req: Request, res: Response) => {
  const data: Product = req.body;
  try {
    const products = await productTable.add(data);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).send(`bad request create products ${error}`);
  }
};
const showProduct = async (req: Request, res: Response) => {
  try {
    const products = await productTable.show(parseInt(req.params.id));
    if (products == undefined) {
      res.status(404).send(`the id not exist in peoduct `);
    }
    res.json(products);
  } catch (error) {
    res.status(404).send(`the id not exist in product ${error}`);
  }
};
const updateProduct = async (req: Request, res: Response) => {
  try {
    const data: Partial<Product> = { ...req.body };
    const products = await productTable.update(data, parseInt(req.params.id));
    res.json(products);
  } catch (error) {
    res.status(400).send(`cannot update product ${error}`);
  }
};
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const products = await productTable.delete(parseInt(req.params.id));
    res.json(products);
  } catch (error) {
    res.status(404).send(`the id not exist in product ${error}`);
  }
};
export default product;
