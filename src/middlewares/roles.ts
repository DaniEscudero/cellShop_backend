import { RoleEnum } from '@models/Role';
import { IRoleRepository, RoleRepository } from '@repositories/RoleRepository';
import { IRoleService, RoleService } from '@services/RoleService';
import { NextFunction, Request, Response } from 'express';

const roleRepository: IRoleRepository = new RoleRepository();
const roleService: IRoleService = new RoleService(roleRepository);

export const checkRoles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Si no recibe un role con el usuario
  // - le asigna el role "user" por defecto
  const role: string =
    req.body && req.body?.role ? req.body.role : RoleEnum.user;

  // - si viene el role, revisar en la db que ese role existe

  try {
    const findRole = await roleService.findRoles({ name: { $in: role } });

    if (findRole.length === 0) {
      res.status(404).send('Role not found');
      return;
    }

    req.body.role = findRole[0];
    next();
  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).json(error);
  }
};
