import { Router } from "express";
import {
  createUser,
  deleteUser,
  findUsers,
  findUsersById,
  updateUser,
} from "@controllers/UserController";
import {
  createRole,
  deleteRole,
  findRoleById,
  findRoles,
  updateRole,
} from "@controllers/RoleController";

const router = Router();

export default () => {
  router.get("/health", (req, res) => {
    res.send("Api is Healty!!!");
  });

  // USERS ROUTES
  router.get("/users", findUsers);
  router.get("/users/:id", findUsersById);
  router.post("/users", createUser);
  router.put("/users/:id", updateUser);
  router.delete("/users/:id", deleteUser);

  // ROLES ROUTES
  router.get("/roles", findRoles);
  router.get("/roles/:id", findRoleById);
  router.post("/roles", createRole);
  router.put("/roles/:id", updateRole);
  router.delete("/roles/:id", deleteRole);

  return router;
};
