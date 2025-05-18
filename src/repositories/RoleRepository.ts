import { Query, Repository } from "@repositories/GenericRepository";
import { Role, RoleModel } from "@models/Role";

export interface IRoleRepository extends Repository<Role> {}

export class RoleRepository implements IRoleRepository {
  async create(data: Role): Promise<Role> {
    const newRole = new RoleModel(data);
    return await newRole.save();
  }

  async find(query?: Query): Promise<Role[]> {
    return await RoleModel.find(query || {}).exec();
  }

  async findById(id: string): Promise<Role | null> {
    return await RoleModel.findById(id).exec();
  }

  async update(id: string, data: Partial<Role>): Promise<Role | null> {
    return await RoleModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await RoleModel.findByIdAndDelete(id).exec();
    return deleted != null;
  }
}
