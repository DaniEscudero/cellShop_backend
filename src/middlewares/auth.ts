import { RoleEnum } from '@models/Role';
import { User } from '@models/User';
import { IRoleRepository, RoleRepository } from '@repositories/RoleRepository';
import { IUserRepository, UserRepository } from '@repositories/UserRepository';
import { IRoleService, RoleService } from '@services/RoleService';
import { IUserService, UserService } from '@services/UserService';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

const roleRepository: IRoleRepository = new RoleRepository();
const roleService: IRoleService = new RoleService(roleRepository);

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtSecret = process.env.JWT_SECRET as string;
  const token = req.headers.authorization?.replace(/^Bearer\s+/, '') as string;

  try {
    const verify = jwt.verify(token, jwtSecret) as User;

    const getUser = await userService.findUsersById(verify.id);
    if (!getUser) {
      res.status(400);
      return;
    }

    req.currentUser = getUser;

    next();
  } catch (error: any) {
    console.log('error :>> ', error);
    res.status(401).send(error.message);
  }
};

export const verifyAdminToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtSecret = process.env.JWT_SECRET as string;
  const token = req.headers.authorization?.replace(/^Bearer\s+/, '') as string;

  try {
    const verify = jwt.verify(token, jwtSecret) as User;

    const getUser = await userService.findUsersById(verify.id);
    if (!getUser) {
      res
        .status(400)
        .json({
          message: 'User not Found',
        })
        .send();
      return;
    }

    const getRole = await roleService.findRoleById(getUser?.role.toString());
    console.log(getRole);

    if (!getRole || getRole.name != RoleEnum.admin) {
      res
        .status(401)
        .json({
          message: 'You need to be an administrator to access the resources',
        })
        .send();
      return;
    }

    req.currentUser = getUser;

    next();
  } catch (error: any) {
    console.log('error :>> ', error);
    res.status(401).send(error.message);
  }
};
