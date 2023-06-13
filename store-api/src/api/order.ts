import { OrderTable } from "./../models/orders";
import { Request, Response } from "express";
import * as express from "express";
import { Cart, Order } from "../helpers/models";
import { authenticateToken } from "../helpers/middleware";

const order = (app: express.Application) => {
  app.get("/get-orders", getOrders);
  app.get("/show-order/:id", showOrder);
  app.post("/create-order", authenticateToken, addOrder);
  app.post("/add-product/:id", authenticateToken, addToCart);
  app.patch("/update-order/:id", authenticateToken, updateOrder);
  app.delete("/delete-order/:id", authenticateToken, deleteOrder);
};
const orderTable = new OrderTable();
const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await orderTable.index();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send(`cannot get orders ${error}`);
  }
};
const addOrder = async (req: Request, res: Response) => {
  const data: Order = req.body;
  try {
    const orders = await orderTable.add(data);
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).send(`bad request create orders ${error}`);
  }
};
const showOrder = async (req: Request, res: Response) => {
  try {
    const orders = await orderTable.show(parseInt(req.params.id));
    if (orders == undefined) {
      res.status(404).send(`the id not exist in order `);
    }
    res.json(orders);
  } catch (error) {
    res.status(404).send(`the id not exist in order ${error}`);
  }
};
const updateOrder = async (req: Request, res: Response) => {
  const data: Partial<Order> = { ...req.body };
  try {
    const orders = await orderTable.update(data, parseInt(req.params.id));
    res.json(orders);
  } catch (error) {
    res.status(404).send(`cannot update order ${error}`);
  }
};
const deleteOrder = async (req: Request, res: Response) => {
  try {
    const orders = await orderTable.delete(parseInt(req.params.id));
    res.json(orders);
  } catch (error) {
    res.status(404).send(`the id not exist in order ${error}`);
  }
};
const addToCart = async (req: Request, res: Response) => {
  const data: Cart = req.body;
  data.order_id = parseInt(req.params.id);
  if (!data.order_id || !data.product_id || !data.quantity) {
    return res.status(400).send("Missing one or more required parameters");
  }
  try {
    const orders = await orderTable.addToCart(data);
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).send(`bad request create orders ${error}`);
  }
};
export default order;
