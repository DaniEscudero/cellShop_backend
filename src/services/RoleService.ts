import { IRoleRepository } from '../repositories/RoleRepository';
import { Role } from '../models/Role';
import { Query } from '../repositories/GenericRepository';

export interface IRoleService {
  createRole(role: Role): Promise<Role>;
  findRoles(query?: Query): Promise<Role[]>;
  findRoleById(id: string): Promise<Role | null>;
  updateRole(id: string, role: Partial<Role>): Promise<Role | null>;
  deleteRole(id: string): Promise<boolean>;
}

export class RoleService implements IRoleService {
  private roleRepository: IRoleRepository;

  constructor(roleRepository: IRoleRepository) {
    this.roleRepository = roleRepository;
  }

  async createRole(role: Role): Promise<Role> {
    return this.roleRepository.create(role);
  }

  async findRoles(query?: Query): Promise<Role[]> {
    return this.roleRepository.find(query);
  }

  async findRoleById(id: string): Promise<Role | null> {
    return this.roleRepository.findById(id);
  }

  async updateRole(id: string, role: Partial<Role>): Promise<Role | null> {
    return this.roleRepository.update(id, role);
  }

  async deleteRole(id: string): Promise<boolean> {
    return this.roleRepository.delete(id);
  }
}
