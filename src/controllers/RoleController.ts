import { Role } from "@models/Role";
import { IRoleRepository, RoleRepository } from "@repositories/RoleRepository";
import { IRoleService, RoleService } from "@services/RoleService";
import { Request, Response } from "express";

const roleRepository: IRoleRepository = new RoleRepository();
const roleService: IRoleService = new RoleService(roleRepository);

export const findRoles = async (req: Request, res: Response) => {
  try {
    const roles = await roleService.findRoles();
    if (roles.length == 0) {
      res.status(404).json({ message: "No roles Found." });
      return;
    }
    res.json(roles);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const findRoleById = async (req: Request, res: Response) => {
  try {
    const role = await roleService.findRoleById(req.params.id);
    if (!role) {
      res.status(404).json({ message: "Not role Found." });
      return;
    }
    res.json(role);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const newRole: Role = req.body;
    const result = await roleService.createRole(newRole);

    res.status(201).json(result);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(400).json(error);
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const role = await roleService.updateRole(req.params.id, req.body);
    if (!role) {
      res.status(404).json({ message: "Not role Found." });
      return;
    }
    res.json(role);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const role = await roleService.deleteRole(req.params.id);
    if (!role) {
      res.status(404).json({ message: "Not role Found." });
      return;
    }
    res.json(role);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};
