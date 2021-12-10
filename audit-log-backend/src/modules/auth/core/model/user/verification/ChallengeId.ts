import { Identifier } from '../../Identifier';
import { v4 as uuidv4 } from 'uuid';

export default class ChallengeId extends Identifier<string> {
    public static nextId(): ChallengeId {
        let uuid = uuidv4();
        uuid = uuid.replace(/-/g, '');
        return new ChallengeId(uuid);
    }

    public static from(id: string) {
        return new ChallengeId(id);
    }
}
