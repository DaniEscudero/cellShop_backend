import { Product, ProductModel } from '@models/Product';
import { Query, Repository } from '@repositories/GenericRepository';

export interface IProductRepository extends Repository<Product> {}

export class ProductRepository implements IProductRepository {
  async create(data: Product): Promise<Product> {
    const newProduct = new ProductModel(data);
    return await newProduct.save();
  }

  async find(query?: Query): Promise<Product[]> {
    return await ProductModel.find(query || {}).exec();
  }

  async findById(id: string): Promise<Product | null> {
    return await ProductModel.findById(id).exec();
  }

  async update(id: string, data: Partial<Product>): Promise<Product | null> {
    return await ProductModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await ProductModel.findByIdAndDelete(id).exec();
    return deleted != null;
  }
}
