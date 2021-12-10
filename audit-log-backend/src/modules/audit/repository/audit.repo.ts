import { AuditModel } from "../model";
import { IRepository } from "./base.repo";


export interface IAuditRepository extends IRepository<AuditModel> {
    getById(id: string): Promise<AuditModel | null>;
}

export const IAuditRepositoryType = Symbol.for('IAuditRepository');