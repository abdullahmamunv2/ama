import IUseCase from "./IUseCase";
import { Result } from "../model/Result";

export interface OTPLoginRequest {
    username: string;
    password: string;
}

export interface OTPLoginResponse {
    isVerified : boolean
    userId : string;
    roleId? : string;
    name   : string;
    isSuperAdmin : boolean;
    userType : string;
    isUser : boolean
}


export interface IOTPLoginUseCase extends IUseCase<OTPLoginRequest, Result<OTPLoginResponse>>{

}


export const OTPLoginUseCaseType = Symbol.for('OTPLoginUseCase');