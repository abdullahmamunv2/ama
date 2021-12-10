import { ITokenGenerator } from "./ITokenGenerator";
import { JwtToken } from "./Token";
import { UserInfo } from "./UserInfo";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as jwt from 'jsonwebtoken'

@Injectable()
export class JwtTokenGenerator implements ITokenGenerator<JwtToken> {
    constructor(
        private configService: ConfigService
    ){
        
    }
    async generate(user: UserInfo): Promise<JwtToken> {
        return this.sign(user)
    }
    async generateByRefreshToken(refreshToken : string) : Promise<JwtToken> {
        return this.sign({})
    }     
    async verify(token: string): Promise<UserInfo> {
        const config = this.configService.get('AUTH_TOKEN')
        const options = {
            expiresIn: config.accessTokenExpireIn,
            audience: config.audience,
            issuer: config.issuer     
        };
        let verifyKey = config.publicKey?config.publicKey:config.secretKey;
        let data = await  jwt.verify(token, verifyKey);
        return {
            userId : data.userId,
            roleId : data.roleId,
            name   : data.name,
            isSuperUser : data.isSuperUser,
            userType : data.userType,
            isUser : data.isUser 
        }


    }

    private async sign(data:any) : Promise<JwtToken>{ 
        return {
            accessToken : await this.signAccessToken(data),
            refreshToken : await this.signRefreshToken(data)
        }

    }


    public async signAccessToken(data:UserInfo) : Promise<string>{
        const config = this.configService.get('AUTH_TOKEN')
        const options = {
            expiresIn: config.accessTokenExpireIn,
            audience: config.audience,
            issuer: config.issuer,
            subject: data.userId,       
        };
        let signKey = config.privateKey?config.privateKey:config.secretKey;

        const token = jwt.sign(data, signKey, options);
        return token;
    }

    private async signRefreshToken(data:UserInfo){
        const config = this.configService.get('AUTH_TOKEN')
        const options = {
            expiresIn: config.refreshTokenExpireIn,
            audience: config.audience,
            issuer: config.issuer,
            subject: data.userId,       
        };
        (data as any).isRefresh = true;
        let signKey = config.privateKey?config.privateKey:config.secretKey;

        const token = jwt.sign(data, signKey, options);
        return token;
    }
}
