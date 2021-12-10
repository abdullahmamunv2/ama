import { ValueObject } from '../ValueObject';
import { Result } from '../Result';

export interface UserRoleProps {
    roles: ROLE[];
}

export enum ROLE {
    SADMIN = 'superadmin',
    ADMIN = 'admin',
    EDITOR = 'editor',
    USER = 'user',
}

export default class UserRole extends ValueObject<UserRoleProps> {
    public toValue() {
        return this.props.roles;
    }

    public toString(): string[] {
        return this.props.roles as string[];
    }

    public static createRole(roles: string[]): Result<UserRole> {
        if(!Array.isArray(roles)){
            return Result.fail(`Invalid user roles. Must be in [superadmin,admin,editor,user]`)
        }
        if(roles.length == 0){
            return Result.fail(`Invalid user roles. Must be in [superadmin,admin,editor,user]`)
        }
        let userRoles:ROLE[] = [];
        for(let i=0;i<roles.length;i++){
            if(!this.isInRole(roles[i])){
                return Result.fail(`Invalid user role[:${roles[i]}].Must be in [superadmin,admin,editor,user]`)
            }
            userRoles.push(roles[i] as ROLE)
        }
        return Result.ok(
            new UserRole({
                roles: userRoles,
            }),
        );
    }

    private static isInRole(role : string ){
        return Object.values(ROLE).includes(role as ROLE)
    }
}
