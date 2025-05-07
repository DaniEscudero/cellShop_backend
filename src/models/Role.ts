import mongoose, { Schema } from "mongoose";

export interface Role {
    name: string;
}

const RoleSchema: Schema = new Schema<Role>(
    {
        name: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const RoleModel = mongoose.model<Role>("Role", RoleSchema)