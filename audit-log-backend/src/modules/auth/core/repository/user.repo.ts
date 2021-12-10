import { IRepository } from "./base.repo";
import { User, Username, UserId } from "../model/user";


export interface IUserRepository extends IRepository<User> {
    getByUsername(aUsername: Username | string): Promise<User | null>;
    getById(id: UserId): Promise<User | null>;
}

export const IUserRepositoryType = Symbol.for('IUserRepositoryType');

