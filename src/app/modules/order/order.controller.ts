import { Request, Response } from 'express';
import { OrderService } from './order.service';
import { validateOrder } from './order.validation';


const orderService = new OrderService();

 const createOrder = async (req: Request, res: Response) => {
  try {
    const { error } = validateOrder(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const order = await orderService.createOrder(req.body);
    res.status(201).json({ success: true, message: 'Order created successfully!', data: order });
  } catch (error:any) {
    console.error(error);
    res.status(500).json({ success: false,  message:error.message });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    let orders;

    if (email) {
      orders = await orderService.getOrdersByUserEmail(email);
      res.json({ success: true, message: 'Orders fetched successfully for user email!', data: orders });
    } else {
      orders = await orderService.getAllOrders();
      res.json({ success: true, message: 'Orders fetched successfully!', data: orders });
    }
  } catch (error:any) {
    if (error.message === 'No orders found for the given email') {
      res.status(404).json({ success: false, message: 'Order not found' });
    } else {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
};

export const orderController = {
  createOrder,
  getOrders
};