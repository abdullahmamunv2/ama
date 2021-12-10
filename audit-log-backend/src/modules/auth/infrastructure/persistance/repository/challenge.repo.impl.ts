import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger, Injectable } from '@nestjs/common';
import { IChallengeRepository } from '@modules/auth/core/repository';
import { ChallengeModel, ChallengeDocument } from './challenge.model';
import { VerificationChallenge, ChallengeId, ChallengeType, Secret } from '@modules/auth/core/model/user/verification';
import { UserId } from '@modules/auth/core/model/user';

@Injectable()
export class ChallengeRepository implements IChallengeRepository {
    private readonly logger     : Logger = new Logger(ChallengeRepository.name);
    constructor(
        @InjectModel(ChallengeModel.name) 
        private readonly model: Model<ChallengeDocument>,
    ){

    }
    async exists(t: VerificationChallenge): Promise<boolean> {
        throw new Error('Method not implemented');
    }
    async getById(id: ChallengeId): Promise<VerificationChallenge | null> {
        try {
            const querySpec: any = {
                _id : id.toString()
            };
            const challenge = await this.model.findOne(querySpec);
            if (challenge) {
                return this.toEntity(challenge as any);
            } else {
                return null;
            }
        } catch (err) {
            this.logger.error(`Unable to fetch Challenge. challengeId : ${id.toValue()} Message : ${err.message}.`);
            throw new Error('Something went wrong. Unable to fetch user information.');
        }
    }
    async delete(t: VerificationChallenge): Promise<any> {
        /*try{
            let user = await UserModel.find({_id : t.id.toValue()});
            return !!user;
        }catch(err){
            throw new Error('Something went wrong. Unable to delete user.'); 
        }*/
        throw new Error('Something went wrong. Unable to delete user.');
    }
    async save(t: VerificationChallenge): Promise<any> {
        try {
            const saveSpec: any = {
                _id : t.id.toString()
            };
            const doc = this.toODM(t);
            await this.model.updateOne(saveSpec, doc, { upsert: true });
        } catch (err) {
            this.logger.error(`Unable to save challenge. ChallengeId : ${t.id.toString()} Message : ${err.message}.`);
            throw new Error('Something went wrong. Unable to save challenge.');
        }
    }

    toODM(challenge: VerificationChallenge):any{
        const props = challenge.getProps();
        const model = new ChallengeModel();
        model._id = challenge.id.toString();
        model.type = props.type.toString();
        model.secret = props.secret.toValue();
        model.expiredAt = props.expiredAt;
        model.challengerId = props.challengerId.toString()
        return model;
    }

    toEntity(model: ChallengeModel) {
        const challegeId = ChallengeId.from(model._id);
        const userId = new UserId(model.challengerId);
        return new VerificationChallenge(
            {
                type: model.type as ChallengeType,
                challengerId: userId,
                secret: Secret.from(model.secret),
                expiredAt: model.expiredAt,
            },
            challegeId,
        );
    }
}
