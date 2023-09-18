import express from 'express';
import { categoryController } from '../controllers/category/category';

const category = new categoryController() 

const categoryRoutes = express.Router();


categoryRoutes.get("/",category.getAllCustomers)


export default categoryRoutes