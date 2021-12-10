import * as bcrypt from 'bcryptjs';
import { ValueObject } from '../ValueObject';
import { Result } from '../Result';

export interface PasswordProps {
    password: string;
}

export default class Password extends ValueObject<PasswordProps> {
    private static SALT_ROUND = 10;
    public toValue() {
        return this.props.password;
    }

    public isEqual(aPassword: string): boolean {
        return bcrypt.compareSync(aPassword, this.props.password);
    }

    public static createPassword(aPassword: string): Result<Password> {
        if (!aPassword) {
            return Result.fail('Password may not be set to empty');
        }
        if (aPassword.length < 4 || aPassword.length > 15) return Result.fail('password length must be of 6-15');
        aPassword = bcrypt.hashSync(aPassword, this.SALT_ROUND);
        return Result.ok(
            new Password({
                password: aPassword,
            }),
        );
    }
    public static of(password : string): Password{
        return new Password({
            password
        })
    }
}
