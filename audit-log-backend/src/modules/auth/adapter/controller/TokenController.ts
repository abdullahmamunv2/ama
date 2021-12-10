import { Controller, Inject, Post, Body, Res, UseGuards, Get,Headers } from "@nestjs/common";
import { ITokenGeneratorType, ITokenGenerator, JwtToken } from "../api/token";
import { SecretKeyGuard } from "@common/guards";



@Controller('auth/token')
export class TokenController {
    constructor(
        @Inject(ITokenGeneratorType)
        private tokenGenerator : ITokenGenerator<JwtToken>

    ){

    }
    @Get('/validate')
    async validate(@Headers('authorization') authHeader : string ,@Res() res : any){
        if(authHeader){
            let token = authHeader.split(' ').length == 2 ? authHeader.split(' ')[1] : ''
            try{
                let userInfo = await this.tokenGenerator.verify(token)
                res.json({
                    status : 'success',
                    data : userInfo
                })
            }catch(err){
                res.status(400).json({
                    status : 'error',
                    statusCode : 400,
                    code : 'ERR_FAILED',
                    message : err.message
                })
            }
        }else{
            res.status(400).json({
                status : 'error',
                statusCode : 400,
                code : 'ERR_FAILED',
                message : 'Invalid Access Token.Should be provide in Authorization Header'
            })
        }
        
        return;
    }

    @UseGuards(SecretKeyGuard)
    @Post('/permissions')
    async otpLoginVerify(@Body() body : any,@Res() res : any){
        res.json({isVarified : true})
        return ;
    }
}