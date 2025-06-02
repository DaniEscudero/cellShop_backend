import mongoose, { Document, ObjectId, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { Role } from '@models/Role';

import { z } from 'zod';

export const UserInputSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z
    .string()
    .email()
    .refine((val) => /^[\w.-]+@.+\.com$/.test(val), 'Not valid email format'),
  password: z.string().min(3, 'Password must be at least 4 characters'),
});

export type IUserInput = z.infer<typeof UserInputSchema>;

export interface User extends Document, IUserInput {
  _id: string;
  role: {
    _id: ObjectId;
    name: string;
  };

  comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      ref: 'Role',
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.pre<User>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }
  next();
});

UserSchema.method('comparePassword', async function (password: string) {
  return await bcrypt.compare(password, this.password as string);
});

UserSchema.methods.toJSON = function () {
  const userObj = this.toObject();
  delete userObj.password;
  return userObj;
};

export const UserModel = mongoose.model<User>('User', UserSchema);
