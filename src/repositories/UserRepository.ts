import { Repository } from "@repositories/GenericRepository";
import {User, UserModel} from "@models/User"

export interface IUserRepository extends Repository<User>{}

export class UserRepository implements IUserRepository{
    async create(data: User): Promise<User> {
        const newUser = new UserModel(data)
        return await newUser.save()
    }

    async find(): Promise<User[]> {
        return await UserModel.find().exec()
    }

    async findById(id: string): Promise<User | null> {
        return await UserModel.findById(id).exec()
    }

    async update(id: string, data: Partial<User>): Promise<User | null> {
        return await UserModel.findByIdAndUpdate(id, data, {new: true}).exec()
    }

    async delete(id: string): Promise<boolean> {
        const deleted = await UserModel.findByIdAndDelete(id).exec()
        return deleted != null;
    }
}