import Server from "./server";
import * as dotenv from "dotenv";

const config = dotenv.config().parsed;
Object.freeze(config);


const server = new Server(config);

server.setupRoute();
server.run();