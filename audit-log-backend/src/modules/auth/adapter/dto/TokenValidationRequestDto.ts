import { IsNotEmpty } from 'class-validator';

export class TokenValidationRequestDto {
    
    @IsNotEmpty()
    token : string
    @IsNotEmpty()
    product : string

}