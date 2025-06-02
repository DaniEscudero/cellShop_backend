import { Order, OrderModel } from '@models/Order';
import { Product, ProductModel } from '@models/Product';
import { Query, Repository } from '@repositories/GenericRepository';

export interface IOrderRepository extends Repository<Order> {}

export class OrderRepository implements IOrderRepository {
  async create(data: Order): Promise<Order> {
    const newOrder = new OrderModel(data);
    return await newOrder.save();
  }

  async find(query?: Query): Promise<Order[]> {
    return await OrderModel.find(query || {}).exec();
  }

  async findById(id: string): Promise<Order | null> {
    return await OrderModel.findById(id).exec();
  }

  async update(id: string, data: Partial<Order>): Promise<Order | null> {
    return await OrderModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await OrderModel.findByIdAndDelete(id).exec();
    return deleted != null;
  }
}
