import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

// Create a new product
router.post('/', productController.createProduct);

// get all products
router.get('/', productController.getProducts);
// get prduct with id 
router.get('/:productId', productController.getProductById);
// update product
router.put('/:productId', productController.updateProduct);
// delete product
router.delete('/:productId', productController.deleteProduct);



export const productRoutes = router;
