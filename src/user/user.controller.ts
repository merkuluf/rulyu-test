import {
    Body,
    Controller,
    Delete,
    Get,
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
        // console.log(payload)
        return this.userService.createUser(payload)
    }

    @Get('get/:id?')
    async get(
        @Param('id') id?: string,
        @Query('role') role?: string,
        @Query('full_name') full_name?: string
    ) {
        const userId = id ? parseInt(id, 10) : undefined
        return this.userService.getUser(userId, role, full_name)
    }

    @Patch('update/:id')
    async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
        const userId = parseInt(id, 10)
        return this.userService.updateUser(userId, data)
    }

    @Delete('delete/:id?')
    async delete(@Param('id') id?: string) {
        const userId = id ? parseInt(id, 10) : undefined
        return this.userService.deleteUser(userId)
    }
}
