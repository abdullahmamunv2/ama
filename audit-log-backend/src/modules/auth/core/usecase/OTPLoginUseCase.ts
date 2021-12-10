import { Inject, Injectable, Logger } from "@nestjs/common";
import IUseCase from './IUseCase';
import { Result } from '../model/Result';
import { IChallengeRepositoryType, IChallengeRepository, IUserRepositoryType, IUserRepository } from '../repository';
import { User } from "../model/user";
import { ChallengeType, VerificationChallenge } from "../model/user/verification";
import { EventBus } from "@nestjs/cqrs";
import { IDomainEvent } from "../model/IDomainEvent";
import { IOTPLoginUseCase, OTPLoginRequest, OTPLoginResponse } from "./IOTPLoginUseCase";



@Injectable()
export class OTPLoginUseCase implements IOTPLoginUseCase {
    constructor(
        @Inject(IUserRepositoryType)
        private readonly userRepository: IUserRepository,
        private eventBus   : EventBus
    ) {}
    async execute(request: OTPLoginRequest): Promise<Result<OTPLoginResponse>> {
        try{
            let user = await this.userRepository.getByUsername(request.username);
            if(!user){
                return  Result.fail('Invalid username.', 'ERR_INVALID');
            }
            let passMatchResult = user.tryLogin(request.username,request.password)
            if(passMatchResult.isFailure){
                return  Result.fail('Invalid password.', 'ERR_INVALID');
            }
            return Result.ok<OTPLoginResponse>({
                isVerified : true,
                userId  : user.id.toString(),
                roleId : user.getRole(),
                name : user.getName(),
                isSuperAdmin : user.getProps().isSuperAdmin,
                userType : user.getProps().userType.toValue(),
                isUser : user.getProps().isUser

            })
        }catch(err){
            return Result.fail(err.message, 'ERR_INTERNAL');
        }
    }
    private publishEvent(challenge : VerificationChallenge){
        challenge.domainEvents.forEach((event:IDomainEvent)=>{
            this.eventBus.publish(event);
        })
    }
}
