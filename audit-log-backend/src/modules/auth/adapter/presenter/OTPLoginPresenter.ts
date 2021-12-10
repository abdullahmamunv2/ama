
import { Injectable } from "@nestjs/common";
import PresenterResponse from "./PresenterResponse";
import { LoginPresenter } from "./LoginPresenter";
import { Result } from "@modules/auth/core/model/Result";
import { OTPLoginResponse } from "@modules/auth/core/usecase";



@Injectable()
export class OTPLoginPresenter extends LoginPresenter<Result<OTPLoginResponse>>{
    present(viewModel: Result<OTPLoginResponse>) : PresenterResponse {
        const response: any = {};
        if (viewModel.isSuccess) {
            const model = viewModel.getValue();
            response.status = 'success',
            response.data = model;
            return PresenterResponse.from(200,response);
        } else {
            let httpCode = this.getStatusCode(viewModel.errorCode);
            response.statusCode = httpCode;
            response.status = 'error';
            response.code   = viewModel.errorCode;
            response.message = viewModel.error;

            return PresenterResponse.from(httpCode,response);
        }
    }

}

export const OTPLoginPresenterType = Symbol.for('LoginPresenter<Result<OTPLoginResponse>>');