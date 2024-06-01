import mongoose, { Document, Schema } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new Schema({
  email: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export default mongoose.model<IOrder>('Order', orderSchema);
