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

const getProductById = async (req: Request, res: Response) => {
    try {
      const product = await productService.getProductById(req.params.productId);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      res.json({ success: true, message: 'Product fetched successfully!', data: product });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };

  const updateProduct = async (req: Request, res: Response) => {
    try {
      const product = await productService.updateProduct(req.params.productId, req.body);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      res.json({ success: true, message: 'Product updated successfully!', data: product });
    } catch (error:any) {
      if (error.name === 'ValidationError') {
        res.status(400).json({ success: false, message: error.message });
      } else {
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
    }
  };

export const productController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct
};
