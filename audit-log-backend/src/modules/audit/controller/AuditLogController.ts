import { Body, Controller, Inject, Post, Res } from "@nestjs/common";
import { AuditRequestDto } from "../dto";
import { IAuditRepository, IAuditRepositoryType } from "../repository";



@Controller('audits')
export class AuditLogController {

    constructor(
        @Inject(IAuditRepositoryType)
        private repository : IAuditRepository
    ){

    }
    
    @Post('/')
    async createLog(@Body() body : AuditRequestDto,@Res() res : any){
        
        // const request : AuditRequestDto = {
        //     username : body.username,
        //     password : body.password
        // }
        // const result = await this.otpLoginUseCase.execute(request)
        // if(result.isSuccess){
        //     let userInfo = result.getValue()
        //     let token = await this.tokenGenerator.generate({
        //         userId : userInfo.userId,
        //         roleId : userInfo.roleId,
        //         name   : userInfo.name,
        //         isSuperUser : userInfo.isSuperAdmin,
        //         isUser : userInfo.isUser,
        //         userType : userInfo.userType

        //     })
        //     const response = this.otpLoginVerifyPresenter.present(Result.ok(token));
        //     res.status(response.statusCode).json(response.data);
        // }else{
        //     const response = this.otpLoginPresenter.present(result);
        //     res.status(response.statusCode).json(response.data);
        // }
        // return;
    }
}