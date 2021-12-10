import { IsNotEmpty,IsIn } from 'class-validator';


export const UserTypes = ['patient' , 'doctor']

export class OTPLoginVerifyRequestDto {
    
    @IsNotEmpty()
    challengeId : string
    @IsNotEmpty()
    secret : string

    @IsIn(UserTypes)
    userType : string
}