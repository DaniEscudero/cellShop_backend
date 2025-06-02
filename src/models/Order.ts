import mongoose, { Document, ObjectId, Schema } from 'mongoose';
import { z } from 'zod';

export const OrderInputSchema = z.object({
  customerName: z.string().min(3, 'Name must be at least 3 characters'),
  date: z.string().transform((val) => new Date(val)),
  status: z.string().min(1, 'Status is required'),
  total: z.number(),
});

export type IOrderInput = z.infer<typeof OrderInputSchema>;

export interface Order extends Document, IOrderInput {
  _id: string;
  products: ObjectId[];
}

const OrderSchema: Schema = new Schema<Order>(
  {
    customerName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    products: [
      {
        ref: 'Product',
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const OrderModel = mongoose.model<Order>('Order', OrderSchema);
