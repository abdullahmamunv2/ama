import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AuditDocument = Document<AuditModel>;


export interface IAudit{
    _id : string;
    name: string;
    region: string;
    description: string;
    lat : number;
    long : number;
    createdBy : string
    updatedBy : string
}


@Schema({
  timestamps: true,
})
export class AuditModel implements IAudit {
  @Prop({
    required: true,
  })
  _id : string;

  @Prop({
    required : true
  })
  name : string

  @Prop()
  region  : string
  @Prop()
  description  : string

  @Prop()
  lat : number

  @Prop()
  long : number;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;
}

export const AuditSchema = SchemaFactory.createForClass(
  AuditModel
);
