import express from 'express';
import CustomerController from '../controllers/customer/customer';
import { authenticateToken } from '../middleware/authenticate';
const controllers = new CustomerController()

const userRoutes = express.Router();

// userRoutes.get('/',authenticateToken,controllers.getAllCustomers)
userRoutes.get('/',authenticateToken,controllers.getAuthenticatedCustomer)
userRoutes.get('/username-exists/:username', controllers.customerNameExists);
userRoutes.post('/register', controllers.signUp);
userRoutes.post('/login', controllers.signIn);
userRoutes.post('/generate-token',controllers.generateToken)
userRoutes.delete('/', authenticateToken,controllers.deleteCustomer);


export default userRoutes