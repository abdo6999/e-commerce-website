import express from 'express';
import CustomerController from '../controllers/customer/customer';
import { authenticateToken } from '../middleware/authenticate';
import { validateAuthAndProfile } from '../middleware/validators/customer/registerValidation';
import { validateLogin } from '../middleware/validators/customer/loginValidation';

const controllers = new CustomerController()

const customerRoutes = express.Router();

// customerRoutes.get('/',authenticateToken,controllers.getAllCustomers)
customerRoutes.get('/',authenticateToken,controllers.getAuthenticatedCustomer)
customerRoutes.get('/username-exists/:username', controllers.customerNameExists);

customerRoutes.get('/accuses',controllers.generateAccessToken)

customerRoutes.get('/checkAuth', controllers.verifyToken);
customerRoutes.get('/logout',controllers.logout)

customerRoutes.post('/register', validateAuthAndProfile,controllers.signUp);
customerRoutes.post('/login', validateLogin,controllers.signIn);

customerRoutes.delete('/', authenticateToken,controllers.deleteCustomer);


export default customerRoutes