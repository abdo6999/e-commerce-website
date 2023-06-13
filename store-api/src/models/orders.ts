import Client from "../database";
import { Cart, Order } from "../helpers/models";

export class OrderTable {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders;";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get orders ${error}`);
    }
  }
  async show(id: number): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders WHERE id=($1);";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. ${err}`);
    }
  }
  async add(o: Order): Promise<Order> {
    try {
      const conn = await Client.connect();
      const data = Object.values(o);
      const sql = createOrder(o);
      const result = await conn.query(sql, data);
      const Order = result.rows[0];
      conn.release();
      return Order;
    } catch (err) {
      throw new Error(`Could not add new order . ${err}`);
    }
  }
  async update(o: Partial<Order>, id: number): Promise<Partial<Order>> {
    try {
      const conn = await Client.connect();
      const data = Object.values(o);
      const sql = updateOrderByID(o, id);

      const resualt = await conn.query(sql, data);
      conn.release();
      return resualt.rows[0];
    } catch (error) {
      throw new Error(`cannot connect with order ${error}`);
    }
  }
  async delete(id: number): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM  orders WHERE id =($1) RETURNING *";
      const resualt = await conn.query(sql, [id]);
      conn.release();
      return resualt.rows[0];
    } catch (error) {
      throw new Error(`cannot connect with order ${error}`);
    }
  }
  async deleteAll(): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE * FROM  products;";
      const resualt = await conn.query(sql);
      conn.release();
      return resualt.rows[0];
    } catch (error) {
      throw new Error(`cannot connect with order ${error}`);
    }
  }
  async addToCart(o: Cart): Promise<Cart> {
    try {
      const connection = await Client.connect();
      const data = Object.values(o);
      const sql = createCart(o);
      const result = await connection.query(sql, data);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add product to cart. Error: ${err}`);
    }
  }
} // end of class

function updateOrderByID(cols: Partial<Order>, id: number) {
  const query = ["UPDATE orders"];
  query.push("SET");
  const set: string[] = [];
  Object.keys(cols).forEach(function(key, i) {
    set.push(key + " = ($" + (i + 1) + ")");
  });
  query.push(set.join(", "));
  const reg = /^([\w]+)/;
  const updatValus: string[] = set.map(a => a.match(reg)![0]);
  let element = "";
  for (let i = 0; i < updatValus.length; i++) {
    element += updatValus[i];
    if (i < updatValus.length - 1) {
      element += ",";
    }
  }
  query.push("WHERE id = " + id + " RETURNING " + element + ";");
  return query.join(" ");
}

function createOrder(cols: Order) {
  const len = Object.keys(cols).length;
  const query = ["INSERT INTO orders("];
  const set = [];
  Object.keys(cols).forEach(function(key, i) {
    if (i < len - 1) {
      set.push(key + ",");
    } else {
      set.push(key);
    }
  });
  set.push(") VALUES(");
  Object.keys(cols).forEach(function(key, i) {
    if (i < len - 1) {
      set.push(`$${i + 1},`);
    } else {
      set.push(`$${i + 1}`);
    }
  });
  set.push(") RETURNING *;");
  query.push(set.join(" "));
  return query.join(" ");
}
function createCart(cols: Cart) {
  const len = Object.keys(cols).length;
  const query = ["INSERT INTO orders("];
  const set = [];
  Object.keys(cols).forEach(function(key, i) {
    if (i < len - 1) {
      set.push(key + ",");
    } else {
      set.push(key);
    }
  });
  set.push(") VALUES(");
  Object.keys(cols).forEach(function(key, i) {
    if (i < len - 1) {
      set.push(`$${i + 1},`);
    } else {
      set.push(`$${i + 1}`);
    }
  });
  set.push(") RETURNING *;");
  query.push(set.join(" "));
  return query.join(" ");
}
