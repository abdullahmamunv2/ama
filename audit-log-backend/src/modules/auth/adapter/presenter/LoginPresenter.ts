import HTTP_CODE from 'http-status-codes'
import IPresenter from './IPresenter';
import PresenterResponse from './PresenterResponse';



export abstract class  LoginPresenter<T> implements IPresenter<T> {
    abstract present(viewModel: T): PresenterResponse;
    getStatusCode(errorCode : string){
        switch(errorCode){
            case 'ERR_CONFLICT':
                return HTTP_CODE.CONFLICT;
            case 'ERR_FAILED':
                return HTTP_CODE.BAD_REQUEST;
            case 'ERR_NOT_FOUND':
                return HTTP_CODE.NOT_FOUND
            case 'ERR_TO_MANY_REQUEST':
                return HTTP_CODE.TOO_MANY_REQUESTS
            case 'ERR_INTERNAL':
            default:
                return HTTP_CODE.INTERNAL_SERVER_ERROR;
        }
    }
}