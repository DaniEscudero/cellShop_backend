import mongoose, { Document, Schema } from 'mongoose';
import { z } from 'zod';

export const ProductInputSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  category: z.string().min(1, 'Category is required'),
  images: z.array(z.string()).min(1, 'Product must have at least one image'),
  brand: z.string().min(1, 'Brand is required'),
  description: z.string().min(1, 'Description is required'),
  isPublished: z.boolean(),
  price: z
    .number()
    .refine(
      (val) => /^\d+(\.\d{1,2})?$/.test(val.toString()),
      'Price must have only 2 decimals'
    ),
  countInStock: z.coerce
    .number()
    .int()
    .nonnegative('Count in stock must be a non-negative number'),
  colors: z.array(z.string()).default([]),
  storageCapacity: z.array(z.number()).default([]),
  avgRating: z.coerce.number().int(),
  numReviews: z.coerce
    .number()
    .int()
    .nonnegative('Number of reviews must be a non-negative number'),
  reviews: z.array(z.string()).default([]),
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
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    images: [String],
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
    },
    colors: { type: [String] },
    storageCapacity: { type: [Number] },
    avgRating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    numSales: {
      type: Number,
      required: true,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ProductModel = mongoose.model<Product>('Product', ProductSchema);
