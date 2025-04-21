import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/database";
import { authRouter } from "./routes/auth.routes";
import cors from "cors";
import { todoRouter } from "./routes/todo.routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT!;

app.use(express.json());
app.use(cors());

connectDb();

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server 1233");
});

app.use("/api", [authRouter, todoRouter]);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
