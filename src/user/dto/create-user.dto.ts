import { IsNotEmpty, IsString, IsNumber, Min, Max, Length } from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 99)
    full_name: string

    @IsNotEmpty()
    @IsString()
    @Length(1, 99)
    role: string

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(100)
    efficiency: number
}
