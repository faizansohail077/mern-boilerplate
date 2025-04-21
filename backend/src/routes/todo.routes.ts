import { Router } from "express";
import { addTodo } from "../controller/todo.controller";
import { authenticateUser } from "../middleware";

const router: Router = Router();

router.post("/add-todo", authenticateUser, addTodo);

export { router as todoRouter };
