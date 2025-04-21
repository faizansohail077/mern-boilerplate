import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    userType: "normal" | "premium";
}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        userType: { type: String, enum: ["normal", "premium"], default: "normal" },
    },
    { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
