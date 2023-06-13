import jwtToken from "../helpers/jwt";
import { UserTable } from "./../models/users";
import { Request, Response } from "express";
import * as express from "express";
import { User } from "../helpers/models";
import { authenticateToken } from "../helpers/middleware";
const user = (app: express.Application) => {
  app.get("/get-users", authenticateToken, getUsers);
  app.get("/show-user/:id", authenticateToken, showUser);
  app.post("/create-user", createUser);
  app.post("/refresh-token", refreshToken);
  app.patch("/update-user/:id", authenticateToken, updateUser);
  app.delete("/delete-user/:id", authenticateToken, deleteUser);
  app.post("/authenticate-user", authenticateUser);
};
const userTable = new UserTable();
const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userTable.index();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(`cannot get users ${error}`);
  }
};
const createUser = async (req: Request, res: Response) => {
  const data: User = req.body;
  try {
    const users = await userTable.create(data);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send(`bad request create orders ${error}`);
  }
};
const showUser = async (req: Request, res: Response) => {
  try {
    const users = await userTable.show(parseInt(req.params.id));
    if (users == undefined) {
      res.status(404).send(`the id not exist in user `);
    }
    res.json(users);
  } catch (error) {
    res.status(404).send(`the id not exist in user ${error}`);
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const data: Partial<User> = { ...req.body };
    const users = await userTable.update(data, parseInt(req.params.id));
    res.json(users);
  } catch (error) {
    res.status(500).send(`cannot update user ${error}`);
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const users = await userTable.delete(req.body.id);
    res.json(users);
  } catch (error) {
    res.status(404).send(`the id not exist in order ${error}`);
  }
};
const authenticateUser = async (req: Request, res: Response) => {
  try {
    const data = {
      username: req.body.username,
      password: req.body.password
    };
    const users = await userTable.authenticate(data.username, data.password);
    res.json(users);
  } catch (error) {
    res.status(401).send(`username or password not correct ${error}`);
  }
};
const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const users = jwtToken.vreifyRefreshToken(refreshToken);
    const userToken = jwtToken.sign({ username: users });
    const userRefreshToken = jwtToken.signRefresh({ username: users });
    res
      .status(200)
      .json({ accessToken: userToken, refreshToken: userRefreshToken });
  } catch (error) {
    res.status(401).send(`token is not correct ${error}`);
  }
};
export default user;
