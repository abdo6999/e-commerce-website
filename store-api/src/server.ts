import  {PORT} from "./env";
import  express from "express";
import  bodyParser from "body-parser";
import apiRouters from "./routes";
import  cookieParser from 'cookie-parser'


const app: express.Application = express();

const address = PORT;

app.use(cookieParser());

app.use(bodyParser.json());

app.use("/api",apiRouters)

app.listen(address, function() {
  console.log(`starting app on: ${address}`);
});