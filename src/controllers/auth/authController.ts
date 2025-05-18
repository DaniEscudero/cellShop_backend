import { RoleEnum } from '@models/Role';
import { User, UserInputSchema } from '@models/User';
import { IRoleRepository, RoleRepository } from '@repositories/RoleRepository';
import { IUserRepository, UserRepository } from '@repositories/UserRepository';
import { IRoleService, RoleService } from '@services/RoleService';
import { IUserService, UserService } from '@services/UserService';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Schema } from 'mongoose';

const roleRepository: IRoleRepository = new RoleRepository();
const roleService: IRoleService = new RoleService(roleRepository);

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const registerUser = async (req: Request, res: Response) => {
  const role: string = RoleEnum.user;

  try {
    const findRole = await roleService.findRoles({ name: { $in: role } });

    req.body.role = findRole[0].id as Schema.Types.ObjectId;

    const user: User = req.body;

    console.log(user);

    const parseResult = UserInputSchema.safeParse(user);

    if (!parseResult.success) {
      res.status(400).json({
        message: 'Invalid input',
        errors: parseResult.error.flatten().fieldErrors,
      });
      return;
    }

    const userExists = await userService.findUsersByEmail(user.email);
    if (userExists) {
      res.status(400).json({ message: 'Email already exists.' });
    }
    if (await userService.findUsers({ username: user.username })) {
      res.status(400).json({ message: 'Username already exists.' });
    }

    const newUser = await userService.createUser(user);
    res.status(201).json(newUser);
  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).json(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const jwtSecret = process.env.JWT_SECRET as string;
  try {
    const { email, password }: User = req.body;

    const user = await userService.findUsersByEmail(email);
    if (!user) {
      res.status(400).json({
        message: 'Invalid user or password',
        error: 'Bad Request',
        statusCode: '400',
      });
      return;
    }
    const comparePass = await user.comparePassword(password);

    if (!comparePass) {
      res.status(400).json({
        message: 'Invalid user or password',
        error: 'Bad Request',
        statusCode: '400',
      });
      return;
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      jwtSecret,
      { expiresIn: '1h' }
    );

    res.json({
      id: user._id,
      email: user.email,
      username: user.username,
      roles: user.roles,
      token,
    });
  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).json(error);
  }
};
