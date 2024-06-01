import mongoose, { Document, Schema } from 'mongoose';
import { IProduct } from './product.interface';
const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  variants: [
    {
      type: { type: String },
      value: { type: String },
    },
  ],
  inventory: {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
});

export default mongoose.model<IProduct>('Product', productSchema);
