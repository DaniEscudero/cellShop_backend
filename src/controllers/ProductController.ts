import { Product, ProductInputSchema } from '@models/Product';
import {
  IProductRepository,
  ProductRepository,
} from '@repositories/ProductRepository';
import { IProductService, ProductService } from '@services/ProductService';
import { Request, Response } from 'express';

const productRepository: IProductRepository = new ProductRepository();
const productService: IProductService = new ProductService(productRepository);

export const findProducts = async (req: Request, res: Response) => {
  console.log('req findPosts :>> ', req.currentUser);
  try {
    const products = await productService.findProducts();
    if (products.length == 0) {
      res.status(404).json({ message: 'No products Found.' });
      return;
    }
    res.json(products);
  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).json(error);
  }
};

export const findProductById = async (req: Request, res: Response) => {
  try {
    const product = await productService.findProductById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Not product Found.' });
      return;
    }
    res.json(product);
  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).json(error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const parseResult = ProductInputSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        message: 'Invalid input',
        errors: parseResult.error.flatten().fieldErrors,
      });
      return;
    }

    const newProduct: Product = req.body;
    const result = await productService.createProduct(newProduct);

    res.status(201).json(result);
  } catch (error) {
    console.log('error :>> ', error);
    res.status(400).json(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    if (!product) {
      res.status(404).json({ message: 'Not product Found.' });
      return;
    }
    res.json(product);
  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).json(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.deleteProduct(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Not product Found.' });
      return;
    }
    res.json(product);
  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).json(error);
  }
};
