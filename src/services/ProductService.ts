import { Product } from '@models/Product';
import { Query } from '@repositories/GenericRepository';
import { IProductRepository } from '@repositories/ProductRepository';

export interface IProductService {
  createProduct(Product: Product): Promise<Product>;
  findProducts(query?: Query): Promise<Product[]>;
  findProductById(id: string): Promise<Product | null>;
  updateProduct(id: string, Product: Partial<Product>): Promise<Product | null>;
  deleteProduct(id: string): Promise<boolean>;
}

export class ProductService implements IProductService {
  private ProductRepository: IProductRepository;

  constructor(ProductRepository: IProductRepository) {
    this.ProductRepository = ProductRepository;
  }

  async createProduct(Product: Product): Promise<Product> {
    return this.ProductRepository.create(Product);
  }

  async findProducts(query?: Query): Promise<Product[]> {
    return this.ProductRepository.find(query);
  }

  async findProductById(id: string): Promise<Product | null> {
    return this.ProductRepository.findById(id);
  }

  async updateProduct(
    id: string,
    Product: Partial<Product>
  ): Promise<Product | null> {
    return this.ProductRepository.update(id, Product);
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.ProductRepository.delete(id);
  }
}
