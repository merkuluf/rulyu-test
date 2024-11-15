import { IsNotEmpty, IsString, IsNumber, Min, Max, Length, IsOptional } from 'class-validator'

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @Length(1, 99)
    full_name: string

    @IsOptional()
    @IsString()
    @Length(1, 99)
    role: string

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    efficiency: number
}
