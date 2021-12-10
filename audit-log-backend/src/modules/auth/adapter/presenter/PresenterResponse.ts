



export default class PresenterResponse{
    statusCode : number
    data       : any
    private constructor(
        statusCode : number,
        data : any
    ){ 
        this.statusCode = statusCode,
        this.data       = data;
        
    }

    static from(statusCode : number,
        data : any){
            return new PresenterResponse(statusCode,data);
        }
}