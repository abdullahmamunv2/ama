import { AggregateRoot } from '../../AggregateRoot';
import { Result } from '../../Result';
import UserId from '../UserId';
import ChallengeId from './ChallengeId';
import Secret from './Secret';
import VerificationChallegeArised from './ChallegeArised';

export enum ChallengeType {
    OTP = 'OTP',
}

export interface VerificationChallengeProps {
    type: ChallengeType;
    challengerId: UserId;
    secret: Secret;
    expiredAt: Date;
}

export default class VerificationChallenge extends AggregateRoot<ChallengeId, VerificationChallengeProps> {
    private static TTL = 1 * 60 * 1000;

    public getChallegerId() {
        return this.props.challengerId;
    }
    public justify(aSecret: any): Result<boolean> {
        if (!this._isChallengeExpired()) {
            const secret = Secret.from(aSecret);
            if (this.props.secret.equals(secret)) {
                return Result.ok<boolean>(true);
            } else {
                return Result.fail<boolean>('Secret not matched.', 'ERR_INVALID_SECRET');
            }
        } else {
            return Result.fail<boolean>('Challenge got expired.', 'ERR_CHALLENGE_EXP');
        }
    }

    private _isChallengeExpired() {
        const ttl = +this.props.expiredAt - +new Date();
        return ttl < 0;
    }
    public getExpireTimeInSec(){
        return VerificationChallenge.TTL
    }
    public static createChallenge(type: ChallengeType, challengerId: UserId): Result<VerificationChallenge> {
        const challengeId = ChallengeId.nextId();
        const expiredAt = new Date(new Date().getTime() + this.TTL);
        const secret = Secret.nextSecret();
        const challenge = new VerificationChallenge(
            {
                type: type,
                challengerId: challengerId,
                expiredAt: expiredAt,
                secret: secret,
            },
            challengeId,
        );

        challenge.addDomainEvent(new VerificationChallegeArised(challenge));
        return Result.ok(challenge);
    }
}
