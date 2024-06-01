import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

// Create a new product
router.post('/', productController.createProduct);

// get all products
router.get('/', productController.getProducts);



router.get('/:productId', productController.getProductById);

router.put('/:productId', productController.updateProduct);

router.delete('/:productId', productController.deleteProduct);



export const productRoutes = router;
