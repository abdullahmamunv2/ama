import UserId from './UserId';
import { AggregateRoot } from '../AggregateRoot';
import Username from './Username';
import Password from './Password';
import { Result } from '../Result';
import UserType from './UserType';
import { VerificationChallenge, ChallengeType } from './verification';


export interface UserProps {
    username: Username;
    password?: Password;
    isVerified: boolean;
    isSuperAdmin:boolean;
    name? : string
    isUser : boolean;
    userType : UserType;
    avatar? : string;
    userRole? : string;
}

export default class User extends AggregateRoot<UserId, UserProps> {
    public isAccountVerified() {
        return this.props.isVerified;
    }
    public getUsername() {
        return this.props.username.toValue();
    }
    public getRole(){
        return this.props.userRole;
    }
    public setName(aName : string){
        if(aName){
            this.props.name = aName;
            return Result.ok();
        }
        return Result.fail('User Name must be valid.');
        
    }
    public getName(){
        return this.props.name;
    }
    public setAvatar(aAvatar : string){
        if(aAvatar){
            this.props.avatar = aAvatar;
            return Result.ok();
        }
        else{
            if(this.props.avatar){
                return Result.fail('Avatar must be valid.');
            }
            return Result.ok();
        }
        
    }
    public getAvatar(){
        return this.props.avatar
    }

    public verifyAccount() {
        if (!this.props.isVerified) {
            this.props.isVerified = true;
        }
    }
    public static tryOtpLogin(aUsername: string):Result<VerificationChallenge>{
        const usernameResult = Username.createUsername(aUsername);
        const combineResult = Result.combine([usernameResult]);

        if (combineResult.isSuccess) {
            const userId    = UserId.of(usernameResult.getValue().toValue())
            const challenge = VerificationChallenge.createChallenge(ChallengeType.OTP, userId);
            return challenge;
        } else {
            return combineResult;
        }
    }
    public  tryLogin(aUsername: string, aPassword: string): Result<boolean> {
        const usernameResult = Username.createUsername(aUsername);
        const passwordResult = Password.createPassword(aPassword);

        const combineResult = Result.combine([usernameResult, passwordResult]);
        if (combineResult.isSuccess) {
            if (this.isAccountVerified()) {
                const passwordMatched = this.props.password?.isEqual(aPassword);
                if (passwordMatched) {
                    return Result.ok<boolean>(passwordMatched);
                } else {
                    return Result.fail<boolean>('Invalid password.', 'ERR_INVALID_PASSWORD');
                }
            } else {
                return Result.fail<boolean>('Please verify your account.', 'ERR_ACC_NOT_VERIFIED');
            }
        } else {
            return combineResult;
        }
    }
    public static createOTPVerifiedUser(userId: UserId,userType:string){
        const usertTypeResult   = UserType.createType(userType);
        const combineResult     = Result.combine([usertTypeResult]);

        if (combineResult.isSuccess) {
            
            const user = new User(
                {
                    username: Username.of(userId.toString()),
                    isVerified: true,
                    isSuperAdmin : false,
                    isUser : true,
                    userType : usertTypeResult.getValue()
                },
                userId,
            );
            return Result.ok(user);
        } else {
            return combineResult;
        }
    }
    public static createUser(aUsername: string, aPassword: string,name:string,userType:string): Result<User> {
        const usernameResult    = Username.createUsername(aUsername);
        const passwordResult    = Password.createPassword(aPassword);
        const usertTypeResult   = UserType.createType(userType);
        const combineResult     = Result.combine([usernameResult, passwordResult,usertTypeResult]);

        if (combineResult.isSuccess) {
            const userId = UserId.nextId();
            const user = new User(
                {
                    username: usernameResult.getValue(),
                    password: passwordResult.getValue(),
                    isVerified: false,
                    isSuperAdmin : false,
                    name : name,
                    isUser : true,
                    userType : usertTypeResult.getValue()
                },
                userId,
            );

            return Result.ok(user);
        } else {
            return combineResult;
        }
    }
}
