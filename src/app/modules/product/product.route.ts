import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

// Create a new product
router.post('/', productController.createProduct);

// Retrieve all products
router.get('/', productController.getAllProducts);


export const productRoutes = router;
