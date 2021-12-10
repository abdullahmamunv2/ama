import { UserInfo } from './UserInfo';


export interface ITokenGenerator<T> {
    generate(user : UserInfo): Promise<T>
    verify(token : string) : Promise<UserInfo>
    generateByRefreshToken(refreshToken : string) : Promise<T>
}

export const ITokenGeneratorType = Symbol.for('ITokenGenerator')

