import Product from "./product.model";
import { validateProduct } from "./product.validation";

export class ProductService {
  async createProduct(productData: any) {
    const { error } = validateProduct(productData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const product = new Product(productData);
    await product.save();
    return product;
  }

  async getAllProducts() {
    const products = await Product.find();
    return products;
  }

  async getProductById(productId: string) {
    const product = await Product.findById(productId);
    return product;
  }
}
