import { ValueObject } from '../ValueObject';
import { Result } from '../Result';

export interface UsernameProps {
    username: string;
}

export default class Username extends ValueObject<UsernameProps> {
    private static USERNAME_REGEX = /^.*$/;
    public toValue() {
        return this.props.username;
    }

    public static createUsername(aUsername: string): Result<Username> {
        if (!aUsername) {
            return Result.fail('Username may not be set to empty');
        }
        if (!this.USERNAME_REGEX.test(aUsername)) {
            return Result.fail('Username should be valid mobile number.');
        }

        return Result.ok(
            new Username({
                username: aUsername,
            }),
        );
    }

    public static of(username : string): Username{
        return new Username({
            username : username
        })
    }
    
}
