import Client from "../database";
import { User } from "../helpers/models";
import hashpass from "../helpers/hashpassword";
import jwtToken from "../helpers/jwt";
export class UserTable {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get Users ${error}`);
    }
  }
  async show(id: number): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find users ${id}.  ${err}`);
    }
  }
  async create(u: User): Promise<object> {
    try {
      const conn = await Client.connect();
      u.password = hashpass.hash(u.password);
      const data = Object.values(u);
      const sql = createUser(u);
      await conn.query(sql, data);
      const userToken = jwtToken.sign({ username: u.username });
      const userRefreshToken = jwtToken.signRefresh({ username: u.username });
      conn.release();
      return { accessToken: userToken, refreshToken: userRefreshToken };
    } catch (err) {
      throw new Error(`Could not add new user ${u.firstname}. ${err}`);
    }
  }
  async update(u: Partial<User>, id: number): Promise<Partial<User>> {
    try {
      const conn = await Client.connect();
      const sql = updateUserByID(u, id);
      const data = Object.values(u);
      const resualt = await conn.query(sql, data);
      return resualt.rows[0];
    } catch (error) {
      throw new Error(`cannot connect with users ${error}`);
    }
  }
  async authenticate(
    username: string,
    password: string
  ): Promise<object | null> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users WHERE username=($1)";
      const resualt = await conn.query(sql, [username]);
      if (resualt.rows.length) {
        const user = resualt.rows[0];
        if (hashpass.compare(password, user.password)) {
          return {
            accessToken: jwtToken.sign({ username: user.username }),
            refreshToken: jwtToken.signRefresh({ username: user.username })
          };
        }
      }
      return null;
    } catch (error) {
      throw new Error(`cannot connect with users ${error}`);
    }
  }
  async delete(id: number): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM  users WHERE id =($1) RETURNING *";
      const resualt = await conn.query(sql, [id]);
      return resualt.rows[0];
    } catch (error) {
      throw new Error(`cannot connect with users ${error}`);
    }
  }
  async deleteAll(): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE * FROM  products;";
      const resualt = await conn.query(sql);
      conn.release();
      return resualt.rows[0];
    } catch (error) {
      throw new Error(`cannot connect with user ${error}`);
    }
  }
} // user end

function updateUserByID(cols: Partial<User>, id: number) {
  const query = ["UPDATE users"];
  query.push(" SET");

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

function createUser(cols: User) {
  const len = Object.keys(cols).length;
  const query = ["INSERT INTO users("];
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
  set.push(") RETURNING *");
  query.push(set.join(" "));
  return query.join(" ");
}
