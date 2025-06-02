import { Order } from '@models/Order';
import { Product } from '@models/Product';
import { Query } from '@repositories/GenericRepository';
import { IOrderRepository } from '@repositories/OrderRepository';
import { IProductRepository } from '@repositories/ProductRepository';

export interface IOrderService {
  createOrder(order: Order): Promise<Order>;
  findOrders(query?: Query): Promise<Order[]>;
  findOrderById(id: string): Promise<Order | null>;
  updateOrder(id: string, Order: Partial<Order>): Promise<Order | null>;
  deleteOrder(id: string): Promise<boolean>;
}

export class OrderService implements IOrderService {
  private OrderRepository: IOrderRepository;

  constructor(OrderRepository: IOrderRepository) {
    this.OrderRepository = OrderRepository;
  }

  async createOrder(Order: Order): Promise<Order> {
    return this.OrderRepository.create(Order);
  }

  async findOrders(query?: Query): Promise<Order[]> {
    return this.OrderRepository.find(query);
  }

  async findOrderById(id: string): Promise<Order | null> {
    return this.OrderRepository.findById(id);
  }

  async updateOrder(id: string, order: Partial<Order>): Promise<Order | null> {
    return this.OrderRepository.update(id, order);
  }

  async deleteOrder(id: string): Promise<boolean> {
    return this.OrderRepository.delete(id);
  }
}
