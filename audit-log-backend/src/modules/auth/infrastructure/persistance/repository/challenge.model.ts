import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export type ChallengeDocument = Document<ChallengeModel>;

interface IChallenge {
    type: string;
    challengerId: string;
    secret: string;
    expiredAt: Date;
}

@Schema({
    timestamps: true,
})
export class ChallengeModel implements IChallenge {
    @Prop({
        required: true,
    })
    _id : string

    @Prop({
        required : true
    })
    type: string;  

    @Prop({
        required : true
    })  
    challengerId: string;
    @Prop({
        required : true
    })
    secret: string;
    @Prop({
        required : true
    })
    expiredAt: Date;


}

export const ChallengeSchema = SchemaFactory.createForClass(
    ChallengeModel
);