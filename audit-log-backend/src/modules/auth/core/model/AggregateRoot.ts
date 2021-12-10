import { Entity } from './Entity';
import { Identifier } from './Identifier';
import { IDomainEvent } from './IDomainEvent';

export abstract class AggregateRoot<I extends Identifier<number | string>, T> extends Entity<I, T> {
    // A list of domain events that occurred on this aggregate
    // so far.
    private _domainEvents: IDomainEvent[] = [];

    get id(): I {
        return this._id;
    }

    get domainEvents(): IDomainEvent[] {
        return this._domainEvents;
    }

    protected addDomainEvent(domainEvent: IDomainEvent): void {
        // Add the domain event to this aggregate's list of domain events
        this._domainEvents.push(domainEvent);

        //logging
        this.logDomainEventAdded(domainEvent);
    }

    public clearEvents(): void {
        
        this._domainEvents.splice(0, this._domainEvents.length);

        //logging
        this.logDomainEventCleared();
    }

    private logDomainEventCleared(){
        console.log(`<<<<<<< All Events Cleared At ${new Date()}. Total Events : ${this._domainEvents.length} >>>>>>>`);
        console.log('Details : ');
        this._domainEvents.forEach((event,index)=>{
            console.log(`#${index+1} Event Occured At : ${event.dateTimeOccurred}  || Event Data: ${JSON.stringify(event,null,'\t')}`);
        })
        console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')

        
    }

    private logDomainEventAdded(domainEvent: IDomainEvent): void {
        console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Event Occured <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`);
        console.log('Details : ');
        console.log('Type           :',domainEvent.getEventType())
        console.log(`Occured At     : ${domainEvent.dateTimeOccurred}`);
        console.log(`Event Payload  : ${domainEvent.toString()}`);
        console.log(`>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`);
    }
}
