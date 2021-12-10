import { ValueObject } from '../../ValueObject';


export interface SecretProps {
    secret: string;
}

export default class Secret extends ValueObject<SecretProps> {
    private static SECRET_LENGTH = 4;
    public toValue() {
        return this.props.secret;
    }
    public static nextSecret() {
        if (this.isProduction()){
            let minNumber = 1;
            for (let i = 1; i < this.SECRET_LENGTH; i++) {
                minNumber *= 10;
            }

            const random = Math.floor(Math.random() * this.SECRET_LENGTH * minNumber);
            return new Secret({
                secret: minNumber + random + '',
            });
        }else{
            return new Secret({
                secret: '1'.repeat(this.SECRET_LENGTH),
            });
        }
    }

    public static from(secret: any) {
        return new Secret({ secret: secret });
    }

    private static isProduction(){
        return process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'
    }
}
