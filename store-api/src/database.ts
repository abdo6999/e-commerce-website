import * as env from "dotenv";
import { Pool } from "pg";
env.config({ override: true });
const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  NODE_ENV_TEST
} = process.env;
let Client: Pool;
if (NODE_ENV_TEST) {
  Client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  });
} else {
  Client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  });
}
export default Client;
