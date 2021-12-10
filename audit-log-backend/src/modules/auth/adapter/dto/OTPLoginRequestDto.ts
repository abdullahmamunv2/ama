import { IsNotEmpty } from 'class-validator';

export class OTPLoginRequestDto {
    @IsNotEmpty()
    username : string

    @IsNotEmpty()
    password : string
}