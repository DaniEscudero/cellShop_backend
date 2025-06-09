import { Router } from 'express';
import {
  loginUser,
  registerUser,
  verify,
} from '../controllers/auth/authController';
import {
  createUser,
  deleteUser,
  findUsers,
  findUsersById,
  updateUser,
} from '../controllers/UserController';
import {
  createRole,
  deleteRole,
  findRoleById,
  findRoles,
  updateRole,
} from '../controllers/RoleController';
import { verifyAdminToken, verifyToken } from '../middlewares/auth';
import { checkRoles } from '../middlewares/roles';
import {
  createProduct,
  deleteProduct,
  findProductById,
  findProducts,
  updateProduct,
} from '../controllers/ProductController';
import { uploadImage } from '../controllers/uploadController';
import { upload } from '../middlewares/multer';
import {
  createOrder,
  deleteOrder,
  findOrderById,
  findOrders,
  updateOrder,
} from '../controllers/OrderController';

const router = Router();

export default () => {
  router.get('/health', (req, res) => {
    res.json({ message: 'API is healthy!!!!' }).send();
  });

  // AUTH ROUTES
  router.post('/auth/register', registerUser);
  router.post('/auth/login', loginUser);
  router.get('/auth/session', verifyToken, verify);

  // USERS ROUTES
  router.get('/users', verifyAdminToken, findUsers);
  router.get('/users/:id', verifyAdminToken, findUsersById);
  router.post('/users', verifyAdminToken, checkRoles, createUser);
  router.put('/users/:id', verifyAdminToken, updateUser);
  router.delete('/users/:id', verifyAdminToken, deleteUser);

  // ROLES ROUTES
  router.get('/roles', verifyAdminToken, findRoles);
  router.get('/roles/:id', verifyAdminToken, findRoleById);
  router.post('/roles', verifyAdminToken, createRole);
  router.put('/roles/:id', verifyAdminToken, updateRole);
  router.delete('/roles/:id', verifyAdminToken, deleteRole);

  // PRODUCTS ROUTES
  router.get('/products', findProducts);
  router.get('/products/:id/', findProductById);
  router.post('/products/', verifyAdminToken, createProduct);
  router.put('/products/:id/', verifyAdminToken, updateProduct);
  router.delete('/products/:id', verifyAdminToken, deleteProduct);

  // ORDERS ROUTES
  router.get('/orders', verifyAdminToken, findOrders);
  router.get('/orders/:id/', verifyAdminToken, findOrderById);
  router.post('/orders/', createOrder);
  router.put('/orders/:id/', verifyAdminToken, updateOrder);
  router.delete('/orders/:id', verifyAdminToken, deleteOrder);

  // IMAGES ROUTES
  router.post('/upload', verifyAdminToken, upload.single('image'), uploadImage);

  return router;
};
