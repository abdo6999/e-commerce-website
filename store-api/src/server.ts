import { Response, Request } from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import product from "./api/product";
import user from "./api/user";
import order from "./api/order";

const app: express.Application = express();
const address = "4000";
app.use(bodyParser.json());

app.get("/", function(_req: Request, res: Response) {
  const array = app._router.stack;
  const a = [];
  for (let i = 0; i < array.length; i++) {
    try {
      a.push(array[i].route.path);
    } catch (error) {}
  }
  res.send(a);
});
product(app);
user(app);
order(app);

app.listen(address, function() {
  console.log(`starting app on: ${address}`);
});

export default app;
