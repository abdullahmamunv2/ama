import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = Document<UserModel>;


export interface IUser{
    _id : string;
    username: string;
    password: string;
    isVerified: boolean;
    isSuperAdmin : boolean;
    isUser : boolean;
    userType : string;
    name? : string
    avatar? : string
    userRole : string;
}


@Schema({
  timestamps: true,
})
export class UserModel implements IUser {
  @Prop({
    required: true,
  })
  _id : string;

  @Prop({
    required : true
  })
  username : string
  @Prop()
  password  : string
  @Prop()
  isVerified  : boolean
  @Prop()
  isSuperAdmin : boolean

  @Prop()
  isUser : boolean;

  @Prop({
    enum: ['DOCTOR', 'PATIENT']
  })
  userType : string

  @Prop()
  name: string;

  @Prop()
  avatar: string;

  @Prop()
  userRole : string;
}

export const UserSchema = SchemaFactory.createForClass(
    UserModel
);
