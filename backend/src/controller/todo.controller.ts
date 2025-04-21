import { Request, Response } from "express";

export const addTodo = async (req: Request, res: Response) => {
    try {
        res.send({ message: "Hello from add todo" });
    } catch (error) {
        console.log(error);
        res.send("Something went wrong with add todo");
    }
};
