import mongoose, { Schema } from "mongoose";

export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
}

const UserSchema: Schema = new Schema<User>(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const UserModel = mongoose.model<User>("User", UserSchema)