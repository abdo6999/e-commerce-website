import  {PORT} from "./env";
import  express from "express";
import  bodyParser from "body-parser";
import apiRouters from "./routes";
import  cookieParser from 'cookie-parser'

import cors from 'cors';

const app: express.Application = express();

const address = PORT;

const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true,
}

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(bodyParser.json());

app.use("/api",apiRouters)

app.listen(address, function() {
  console.log(`starting app on: ${address}`);
});