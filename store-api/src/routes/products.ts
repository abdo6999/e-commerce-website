import express from 'express';
import ProductController from '../controllers/products/products'; // Replace with your product controller
// import { validateProduct } from '../middleware/validators/productValidation'; // Replace with your product validation

const controllers = new ProductController(); // Replace with your product controller instance

const productRoutes = express.Router();

productRoutes.get('/', controllers.getAllProducts);
productRoutes.get('/name/:name', controllers.getProductByName);
productRoutes.get('/filter', controllers.filterProducts);
productRoutes.get('/:id', controllers.getProductById);

// admin auth 
productRoutes.post('/',controllers.createProduct)
productRoutes.put('/:id',  controllers.updateProductById);

productRoutes.delete('/:id', controllers.deleteProduct);

export default productRoutes;
