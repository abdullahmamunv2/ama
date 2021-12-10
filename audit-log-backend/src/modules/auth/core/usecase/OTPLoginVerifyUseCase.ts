import { Inject, Injectable, Logger } from "@nestjs/common";
import IUseCase from './IUseCase';
import { Result } from '../model/Result';
import { IChallengeRepositoryType, IChallengeRepository, IUserRepositoryType, IUserRepository } from '../repository';
import { User } from "../model/user";
import { ChallengeType, VerificationChallenge, ChallengeId } from "../model/user/verification";
import { OTPLoginVerifyRequest, OTPLoginVerifyResponse } from "./IOTPLoginVerifyUseCase";


@Injectable()
export class OTPLoginVerifyUseCase implements IUseCase<OTPLoginVerifyRequest, Result<OTPLoginVerifyResponse>> {
    constructor(
        @Inject(IUserRepositoryType)
        private readonly userRepository: IUserRepository,

        @Inject(IChallengeRepositoryType)
        private readonly challengeRepository: IChallengeRepository
    ) {}
    async execute(request: OTPLoginVerifyRequest): Promise<Result<OTPLoginVerifyResponse>> {
        try {
            const challegeId = ChallengeId.from(request.challengeId);
            const challege = await this.challengeRepository.getById(challegeId);
            if (challege) {
                const challegeResult = challege.justify(request.secret);
                if (challegeResult.isSuccess) {
                    let userId = challege.getChallegerId();
                    let user = await this.userRepository.getById(userId);
                    if (!user) {
                        user = User.createOTPVerifiedUser(userId,request.userType).getValue();
                        await this.userRepository.save(user);
                    }
                    return Result.ok<OTPLoginVerifyResponse>({
                        isVerified : true,
                        userId  : user.id.toString(),
                        roleId : user.getRole(),
                        name : user.getName(),
                        isSuperAdmin : user.getProps().isSuperAdmin,
                        userType : user.getProps().userType.toValue(),
                        isUser : user.getProps().isUser

                    })
                } else {
                    return Result.fail(challegeResult.error, challegeResult.errorCode);
                }
            } else {
                return Result.fail('Invalid challege.', 'ERR_CHALLEGE_NOT_FOUND');
            }
        } catch (err) {
            return Result.fail(err.message, 'ERR_INTERNAL');
        }
    }
    // private publishEvent(challenge : VerificationChallenge){
    //     challenge.domainEvents.forEach((event:IDomainEvent)=>{
    //         this.eventBus.publish(event);
    //     })
    // }
}

