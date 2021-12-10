import IUseCase from "./IUseCase";
import { Result } from "../model/Result";

export interface OTPLoginVerifyRequest {
    challengeId: string;
    secret: string;
    strategy: string;
    userType: string;
}

export interface OTPLoginVerifyResponse {
    isVerified : boolean
    userId : string;
    roleId? : string;
    name   : string;
    isSuperAdmin : boolean;
    userType : string;
    isUser : boolean
}


export interface IOTPLoginVerifyUseCase extends IUseCase<OTPLoginVerifyRequest, Result<OTPLoginVerifyResponse>>{
    
}


export const OTPLoginVerifyUseCaseType = Symbol.for('OTPLoginVerifyUseCase');