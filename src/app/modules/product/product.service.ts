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
    if (products.length === 0) {
      throw new Error('No products found');
    }
    return products;
  }
  
  async searchProducts(searchTerm: string) {
    const products = await Product.find({ name: { $regex: searchTerm, $options: 'i' } });
    if (products.length === 0) {
      throw new Error(`No products found matching search term '${searchTerm}'`);
    }
    return products;
  }
  
  

  async getProductById(productId: string) {
    const product = await Product.findById(productId);
    return product;
  }

  async updateProduct(productId: string, productData: any) {
    const { error } = validateProduct(productData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const product = await Product.findByIdAndUpdate(productId, productData, { new: true });
    return product;
  }

  async deleteProduct(productId: string) {
    const product = await Product.findByIdAndDelete(productId);
    return product;
  }




}
