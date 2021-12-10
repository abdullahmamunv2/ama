import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { Model } from "mongoose";
import { IAuditRepository } from "./audit.repo";
import { AuditModel } from "../model";

@Injectable()
export class AuditRepository implements IAuditRepository {
    private readonly logger     : Logger = new Logger(AuditRepository.name);
    constructor(
        @InjectModel(AuditModel.name) 
        private readonly model: Model<AuditModel>,
    ){
        
    }
  
    async getById(id: string): Promise<AuditModel> {
        try {
            const querySpec: any = {
                _id : id.toString()
            };
            const user = await this.model.findOne(querySpec);
            return user;
        } catch (err) {
            this.logger.error(`Unable to fetch User. UserId : ${id} Message : ${err.message}.`);
            throw new Error('Something went wrong. Unable to fetch user information.');
        }
    }
    exists(t: AuditModel): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(t: AuditModel): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async save(t: AuditModel): Promise<any> {
        try {
            
            const saveSpec: any = {
                _id : t._id
            };

            await this.model.updateOne(saveSpec, t, { upsert: true });
        } catch (err) {
            this.logger.error(`Unable to save user. UserId : ${t._id} Message : ${err.message}.`);
            throw new Error('Something went wrong. Unable to save challenge.');
        }
    }
}