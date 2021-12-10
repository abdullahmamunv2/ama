export interface IDomainEvent {
    dateTimeOccurred: Date;
    getAggregateId<T>(): T;
    getEventType() : string;
}
