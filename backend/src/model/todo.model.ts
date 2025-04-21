import mongoose from "mongoose";
const { Schema } = mongoose;

const todoSchema = new Schema(
    {
        title: String,
    },
    { timestamps: true }
);

export const TodoModel = mongoose.model("Todo", todoSchema);
