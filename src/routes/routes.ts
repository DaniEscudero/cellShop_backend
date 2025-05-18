import { Router } from 'express';
import { loginUser, registerUser } from '@controllers/auth/authController';
import {
  createUser,
  deleteUser,
  findUsers,
  findUsersById,
  updateUser,
} from '@controllers/UserController';
import {
  createRole,
  deleteRole,
  findRoleById,
  findRoles,
  updateRole,
} from '@controllers/RoleController';
import { verifyAdminToken, verifyToken } from 'middlewares/auth';
import { checkRoles } from 'middlewares/roles';
import {
  createProduct,
  deleteProduct,
  findProductById,
  findProducts,
  updateProduct,
} from '@controllers/ProductController';

const router = Router();

export default () => {
  router.get('/health', (req, res) => {
    res.send('Api is Healty!!!');
  });

  // AUTH ROUTES
  router.post('/auth/register', registerUser);
  router.post('/auth/login', loginUser);

  // USERS ROUTES
  router.get('/users', verifyToken, findUsers);
  router.get('/users/:id', verifyToken, findUsersById);
  router.post('/users', verifyToken, checkRoles, createUser);
  router.put('/users/:id', verifyToken, updateUser);
  router.delete('/users/:id', verifyToken, deleteUser);

  // ROLES ROUTES
  router.get('/roles', verifyToken, findRoles);
  router.get('/roles/:id', verifyToken, findRoleById);
  router.post('/roles', createRole);
  router.put('/roles/:id', verifyToken, updateRole);
  router.delete('/roles/:id', verifyToken, deleteRole);

  // PRODUCTS ROUTES
  router.get('/products', findProducts);
  router.get('/products/:id/', findProductById);
  router.post('/products/', verifyAdminToken, createProduct);
  router.put('/products/:id/', verifyToken, updateProduct);
  router.delete('/products/:id', verifyToken, deleteProduct);

  return router;
};
