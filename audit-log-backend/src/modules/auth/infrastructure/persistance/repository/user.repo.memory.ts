import { IUserRepository } from "@modules/auth/core/repository";
import { Username, User, UserId } from "@modules/auth/core/model/user";
import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserModel, UserDocument } from "./user.model";
import { Model } from "mongoose";
import Password from "@modules/auth/core/model/user/Password";
import UserType from "@modules/auth/core/model/user/UserType";

const users : Map<string, User> = new Map<string, User>();

users.set('admin',new User(
    {
        username : Username.of('admin'),
        password : Password.of('$2a$10$PHnuROkRTTOpRyKcVrqhbeYgb4nXzRBAFXLQy7njR4DDcEXcBMSKO'),
        isVerified : true,
        isUser : false,
        userType : UserType.of(''),
        isSuperAdmin : false,
        userRole : 'admin',
        name : 'John Doe',
        avatar : ''
    },
    UserId.of('4234523452435'),
))

@Injectable()
export class InMemoryUserRepository implements IUserRepository{
    private readonly logger     : Logger = new Logger(InMemoryUserRepository.name);
    constructor(
    ){

    }
    async getByUsername(aUsername: string | Username): Promise<User> {
        try {
            const querySpec: any = {
                _id : aUsername
            };
            const user = await users.get(aUsername.toString());
            return user;
        } catch (err) {
            this.logger.error(`Unable to fetch User. UserId : ${aUsername} Message : ${err.message}.`);
            throw new Error('Something went wrong. Unable to fetch user information.');
        }
    }    
    async getById(id: UserId): Promise<User> {
        try {
            return null;
        } catch (err) {
            this.logger.error(`Unable to fetch User. UserId : ${id.toValue()} Message : ${err.message}.`);
            throw new Error('Something went wrong. Unable to fetch user information.');
        }
    }
    exists(t: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(t: User): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async save(t: User): Promise<any> {
        
    }

    toODM(user: User):any{
        const props = user.getProps();
        const model = new UserModel();
        model._id = user.id.toString();
        model.username = props.username.toValue()
        model.password = props.password?props.password.toValue():''
        model.isUser   = props.isUser
        model.userType = props.userType.toValue(),
        model.isSuperAdmin = props.isSuperAdmin
        model.userRole = model.userRole

        model.name = model.name;
        model.avatar = model.avatar

        return model;
    }

    toEntity(model: UserModel) {
        const userId = new UserId(model._id);
        return new User(
            {
                username : Username.of(model.username),
                password : model.password ? Password.of(model.password) : null,
                isVerified : model.isVerified,
                isUser : model.isUser,
                userType : UserType.of(model.userType),
                isSuperAdmin : model.isSuperAdmin,
                userRole : model.userRole,
                name : model.name,
                avatar : model.avatar
            },
            userId,
        );
    }
}