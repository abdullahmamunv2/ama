// import { UserLoginRequest, UserLoginResponse, UserLoginUseCase, UserLoginUseCaseType } from '@core/usecases/user';
// import jwt from 'jsonwebtoken';
// import { TokenService } from '@common/services/token.service';
// import { ITokenGenerator, JwtToken } from '@modules/auth/core/token';
// import { Injectable } from '@nestjs/common';
// import { User } from '@modules/auth/core/model/user';



// const TOKEN_SECRET = '@!@#$$D434S';
// const ISSUER = 'accounts.progga.io';
// const AUDIENCE = 'progga.io';



// export interface LoginResponse {
//     isSuccess: boolean;
//     classId?:string;
//     userId: string;
//     username: string;
//     roles: string[];
//     errorCode: string;
//     message: string;
// }

// @Injectable()
// export class TokenGenerator implements ITokenGenerator {
//     generate(user: User): Promise<JwtToken> {
//         throw new Error("Method not implemented.");
//     }
//     public static opts: any = {
//         jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
//         secretOrKey    : TOKEN_SECRET,
//         issuer         : ISSUER,
//         audience       : AUDIENCE
//     };
//     constructor(
//         @inject(UserLoginUseCaseType)
//         private _useCase: UserLoginUseCase,
//     ) {}

    
//     async sign(data:any){ 
//         const options = {
//             expiresIn: '90d',
//             audience: AUDIENCE,
//             issuer: ISSUER,
//             subject: data.user.userId,       
//         };
//         const token = jwt.sign(data, TOKEN_SECRET, options);
//         return token;

//     }
// }

// export const LoginApiType = Symbol.for('LoginApi');
