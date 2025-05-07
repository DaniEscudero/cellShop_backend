import { User } from "@models/User";
import { IUserRepository, UserRepository } from "@repositories/UserRepository";
import { IUserService, UserService } from "@services/UserService";
import { Request, Response } from "express";

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const findUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.findUsers();
    if (users.length == 0) {
      res.status(404).json({ message: "No users Found." });
      return;
    }
    res.json(users);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const findUsersById = async (req: Request, res: Response) => {
  try {
    const user = await userService.findUsersById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "Not user Found." });
      return;
    }
    res.json(user);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser: User = req.body;
    const result = await userService.createUser(newUser);

    res.status(201).json(result);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(400).json(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) {
      res.status(404).json({ message: "Not user Found." });
      return;
    }
    res.json(user);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) {
      res.status(404).json({ message: "Not user Found." });
      return;
    }
    res.json(user);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};
