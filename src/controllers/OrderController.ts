import { Order, OrderInputSchema } from '../models/Order';
import {
  IOrderRepository,
  OrderRepository,
} from '../repositories/OrderRepository';
import { IOrderService, OrderService } from '../services/OrderService';
import { Request, Response } from 'express';

const orderRepository: IOrderRepository = new OrderRepository();
const orderService: IOrderService = new OrderService(orderRepository);

export const findOrders = async (req: Request, res: Response) => {
  console.log('req findPosts :>> ', req.currentUser);
  try {
    const orders = await orderService.findOrders();
    if (orders.length === 0) {
      res.status(404).json({ message: 'No Orders Found.' });
      return;
    }
    res.json(orders);
  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).json(error);
  }
};

export const findOrderById = async (req: Request, res: Response) => {
  try {
    const order = await orderService.findOrderById(req.params.id);
    if (!order) {
      res.status(404).json({ message: 'Not Order Found.' });
      return;
    }
    res.json(order);
  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).json(error);
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const parseResult = OrderInputSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        message: 'Invalid input',
        errors: parseResult.error.flatten().fieldErrors,
      });
      return;
    }

    const newOrder: Order = req.body;
    const result = await orderService.createOrder(newOrder);

    res.status(201).json(result);
  } catch (error) {
    console.log('error :>> ', error);
    res.status(400).json(error);
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const Order = await orderService.updateOrder(req.params.id, req.body);
    if (!Order) {
      res.status(404).json({ message: 'Not Order Found.' });
      return;
    }
    res.json(Order);
  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).json(error);
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await orderService.deleteOrder(req.params.id);
    if (!order) {
      res.status(404).json({ message: 'Not Order Found.' });
      return;
    }
    res.json(order);
  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).json(error);
  }
};
