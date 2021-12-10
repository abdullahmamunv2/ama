import { ValueObject } from '../ValueObject';
import { Result } from '../Result';


const AllowedUserType = ['doctor','patient']
export interface UserTypeProps {
    type : string;
}

export default class UserType extends ValueObject<UserTypeProps> {
    public static DOCTOR  = 'doctor'
    public static PATIENT = 'patient'
    public toValue() {
        return this.props.type;
    }

    public static createType(type: string): Result<UserType> {
        if (!type || !AllowedUserType.includes(type)) {
            return Result.fail(`Invalid user type. Allowed values ${AllowedUserType}`);
        }

        return Result.ok(
            new UserType({
                type
            }),
        );
    }
    public static of(type : string): UserType{
        return new UserType({
            type
        })
    }
}
