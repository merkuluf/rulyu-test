import { IsOptional, IsNumber, Min } from 'class-validator'

export class DeleteUserDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    id?: number
}
