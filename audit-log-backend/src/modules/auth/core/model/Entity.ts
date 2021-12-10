import { Identifier } from './Identifier';

const isEntity = (v: any): v is Entity<any, any> => {
    return v instanceof Entity;
};

export abstract class Entity<I extends Identifier<number | string>, T> {
    protected readonly _id: I;
    protected readonly props: T;

    constructor(props: T, id: I) {
        this._id = id;
        this.props = props;
    }

    public equals(object?: Entity<I, T>): boolean {
        if (object == null || object == undefined) {
            return false;
        }

        if (this === object) {
            return true;
        }

        if (!isEntity(object)) {
            return false;
        }

        return this._id.equals(object._id);
    }

    public getProps() {
        return this.props;
    }
}
