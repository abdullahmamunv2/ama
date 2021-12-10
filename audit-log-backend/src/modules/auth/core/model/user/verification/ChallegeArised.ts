import { IDomainEvent } from '../../IDomainEvent';
import { DomainEvents } from '../../DomainEvents';
import VerificationChallenge from './VerificationChallenge';

export default class VerificationChallegeArised implements IDomainEvent {
    getEventType(): string {
        return 'VerificationChallegeArised'
    }
    public dateTimeOccurred: Date;
    public challenge: VerificationChallenge;
    constructor(challenge: VerificationChallenge) {
        this.dateTimeOccurred = new Date();
        this.challenge = challenge;
    }

    getAggregateId<T>(): T {
        return (this.challenge.id as unknown) as T;
    }
}
