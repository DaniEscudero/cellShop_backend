import mongoose, { Document, Schema } from 'mongoose';
import { z } from 'zod';

export const ProductInputSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  image: z.string().min(1, 'Product must have at least one image'),
  brand: z.string().min(1, 'Brand is required'),
  tags: z.array(z.string()),
  description: z.string().min(1, 'Description is required'),
  price: z
    .number()
    .refine(
      (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
      'Price must have only 2 decimals'
    ),
  discountPrice: z
    .number()
    .refine(
      (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
      'Price must have only 2 decimals'
    ),
  numSales: z.coerce
    .number()
    .int()
    .nonnegative('Number of sales must be a non-negative number'),
});

export type IProductInput = z.infer<typeof ProductInputSchema>;

export interface Product extends Document, IProductInput {
  _id: string;
}

const ProductSchema: Schema = new Schema<Product>(
  {
    name: {
      type: String,
      required: true,
    },
    image: String,
    brand: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    numSales: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ProductModel = mongoose.model<Product>('Product', ProductSchema);
