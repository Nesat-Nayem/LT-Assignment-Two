import Order from './order.model';
import Product from '../product/product.model';
import { validateOrder } from './order.validation';

export class OrderService {
// create order
async createOrder(orderData: any) {
  const { error } = validateOrder(orderData);
  if (error) {
    throw new Error(error.details[0].message);
  }

  const product = await Product.findById(orderData.productId);
  if (!product) {
    throw new Error('Product not found');
  }

  if (product.inventory.quantity < orderData.quantity) {
    throw new Error('Insufficient quantity available in inventory');
  }

  const order = new Order(orderData);
  await order.save();

  product.inventory.quantity -= orderData.quantity;
  product.inventory.inStock = product.inventory.quantity > 0;
  await product.save();

  return order;
};

// get all order
async getAllOrders() {
  return await Order.find();
};

// get order with email
async getOrdersByUserEmail(email: string) {
  const orders = await Order.find({ email });
  if (orders.length === 0) {
    throw new Error('No orders found for the given email');
  }
  return orders;
};



}