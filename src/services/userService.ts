import { IUserRepository } from "@repositories/UserRepository";
import { User } from "@models/User";
import { Query } from "@repositories/GenericRepository";

export interface IUserService {
  createUser(user: User): Promise<User>;
  findUsers(query?: Query): Promise<User[]>;
  findUsersById(id: string): Promise<User | null>;
  findUsersByEmail(email: string): Promise<User | null>;
  updateUser(id: string, user: Partial<User>): Promise<User | null>;
  deleteUser(id: string): Promise<boolean>;
}

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  async findUsers(query?: Query): Promise<User[]> {
    return this.userRepository.find(query);
  }

  async findUsersById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async findUsersByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ email });
  }

  async updateUser(id: string, user: Partial<User>): Promise<User | null> {
    return this.userRepository.update(id, user);
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.userRepository.delete(id);
  }
}
