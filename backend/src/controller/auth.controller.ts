import { Request, Response } from "express";
import userModel from "../model/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET!;

export const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password, userType } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            res.status(400).send({ message: "User already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            userType: userType || "normal",
        });

        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, userType: newUser.userType, name: newUser.name },
            SECRET_KEY,
            {
                expiresIn: "7d",
            }
        );

        res.send({ token, user: { id: newUser._id, name, email, userType: newUser.userType } });
    } catch (error) {
        res.status(500).send({ message: "Something went wrong" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            res.status(400).send({ message: "Invalid credentials" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).send({ message: "Invalid credentials" });
            return;
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, userType: user.userType, name: user.name },
            SECRET_KEY,
            {
                expiresIn: "7d",
            }
        );

        res.send({ token, user: { id: user._id, name: user.name, email: user.email, userType: user.userType } });
    } catch (error) {
        res.status(500).send({ message: "Something went wrong" });
    }
};
