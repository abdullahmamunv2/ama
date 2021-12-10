import { Identifier } from '../Identifier';
import { v4 as uuidv4 } from 'uuid';

export default class UserId extends Identifier<string> {
    public static nextId(): UserId {
        let uuid = uuidv4();
        uuid = uuid.replace(/-/g, '');
        return new UserId(uuid);
    }

    public static of(id : string){
        return new UserId(id);
    }
}
