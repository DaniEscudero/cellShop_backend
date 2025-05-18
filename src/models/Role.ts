import mongoose, { Document, Schema } from "mongoose";

export interface Role extends Document {
  name: string;
  permisions?: string[];
}

const RoleSchema: Schema = new Schema<Role>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    permisions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const RoleModel = mongoose.model<Role>("Role", RoleSchema);
