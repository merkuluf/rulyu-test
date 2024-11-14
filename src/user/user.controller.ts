import {
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common'
import { UserService } from '@/user/user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { DeleteUserDto } from './dto/delete-user.dto'

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    async create(@Body() payload: CreateUserDto) {
        try {
            return await this.userService.createUser(payload)
        } catch (e) {
            throw new ConflictException('User was not created')
        }
    }

    @Get('get/:id?')
    async get(
        @Param('id') id?: string,
        @Query('role') role?: string,
        @Query('full_name') full_name?: string
    ) {
        try {
            const userId = id ? parseInt(id, 10) : undefined
            return await this.userService.getUser(userId, role, full_name)
        } catch (e) {
            throw new NotFoundException('User(s) not found')
        }
    }

    @Patch('update/:id')
    async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
        try {
            const userId = parseInt(id, 10)
            return await this.userService.updateUser(userId, data)
        } catch (e) {
            return new ConflictException('User was not updated')
        }
    }

    @Delete('delete/:id?')
    async delete(@Param('id') id?: string) {
        try {
            const userId = id ? parseInt(id, 10) : undefined
            await this.userService.deleteUser(userId)
            return
        } catch (e) {
            throw new ConflictException('User(s) was not deleted')
        }
    }
}
