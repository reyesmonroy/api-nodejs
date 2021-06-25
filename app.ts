import dotenv from "dotenv";
import Server from "./models/server";

// config dort .env
dotenv.config();

const server = new Server();

server.listen();