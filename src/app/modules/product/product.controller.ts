import { Request, Response } from "express";
import { ProductService } from "./product.service";

const productService = new ProductService();

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    res
      .status(201)
      .json({
        success: true,
        message: "Product created successfully!",
        data: product,
      });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res
        .status(500)
        .json({
          success: false,
          message: "Internal server error",
          error: error,
        });
    }
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.json({ success: true, message: 'Products fetched successfully!', data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error:error });
  }
};

export const productController = {
  createProduct,
  getAllProducts
};
