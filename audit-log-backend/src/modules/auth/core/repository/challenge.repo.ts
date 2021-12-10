import { IRepository } from "./base.repo";
import { ChallengeId, VerificationChallenge } from "../model/user/verification";


export interface IChallengeRepository extends IRepository<VerificationChallenge> {
    getById(id: ChallengeId): Promise<VerificationChallenge | null>;
}

export const IChallengeRepositoryType = Symbol.for('IChallengeRepository');