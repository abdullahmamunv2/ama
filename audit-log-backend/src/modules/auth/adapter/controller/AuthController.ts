import { Controller, Inject, Post, Body, Res } from "@nestjs/common";
import { OTPLoginUseCaseType, IOTPLoginUseCase, OTPLoginVerifyUseCaseType, IOTPLoginVerifyUseCase, OTPLoginRequest, OTPLoginVerifyRequest } from "@modules/auth/core/usecase";
import { OTPLoginRequestDto, OTPLoginVerifyRequestDto } from "../dto";
import { OTPLoginPresenter, OTPLoginPresenterType, OTPLoginVerifyPresenterType, OTPLoginVerifyPresenter } from "../presenter";
import { ITokenGeneratorType, ITokenGenerator, JwtToken } from "../api/token";
import { Result } from "@modules/auth/core/model/Result";


@Controller('auth')
export class AuthController {
    constructor(
        @Inject(OTPLoginUseCaseType)
        private otpLoginUseCase : IOTPLoginUseCase,
        
        @Inject(OTPLoginPresenterType)
        private otpLoginPresenter : OTPLoginPresenter,

        @Inject(OTPLoginVerifyPresenterType)
        private otpLoginVerifyPresenter : OTPLoginVerifyPresenter,

        @Inject(ITokenGeneratorType)
        private tokenGenerator : ITokenGenerator<JwtToken>

    ){

    }
    @Post('/login')
    async otpLogin(@Body() body : OTPLoginRequestDto,@Res() res : any){
        
        const request : OTPLoginRequest = {
            username : body.username,
            password : body.password
        }
        const result = await this.otpLoginUseCase.execute(request)
        if(result.isSuccess){
            let userInfo = result.getValue()
            let token = await this.tokenGenerator.generate({
                userId : userInfo.userId,
                roleId : userInfo.roleId,
                name   : userInfo.name,
                isSuperUser : userInfo.isSuperAdmin,
                isUser : userInfo.isUser,
                userType : userInfo.userType

            })
            const response = this.otpLoginVerifyPresenter.present(Result.ok(token));
            res.status(response.statusCode).json(response.data);
        }else{
            const response = this.otpLoginPresenter.present(result);
            res.status(response.statusCode).json(response.data);
        }
        return;
    }

    
}