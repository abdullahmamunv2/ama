import { IsNotEmpty } from 'class-validator';

export class AuditRequestDto {
    @IsNotEmpty()
    username : string

    @IsNotEmpty()
    password : string
}