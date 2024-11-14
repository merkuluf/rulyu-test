import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async createUser(data: {
        full_name: string
        role: string
        efficiency: number
    }) {
        const full_name = data.full_name.trim() // убрал ненужные символы
        const role = data.role.trim() // убрал ненужные символы
        return await this.prisma.user.create({
            data: { ...data, full_name, role },
        })
    }

    async getUser(id?: number, role?: string, full_name?: string) {
        const where: any = {}
        if (id) where.id = id
        if (role) where.role = role
        if (full_name) where.full_name = full_name

        const users = await this.prisma.user.findMany({ where })
        console.log(users)

        if (users.length === 0) {
            throw new NotFoundException('User(s) not found')
        }

        return users
    }

    // Метод для обновления пользователя
    async updateUser(
        id: number,
        data: { full_name?: string; role?: string; efficiency?: number }
    ) {
        const userExist = await this.prisma.user.findFirst({
            where: { id },
        })

        if (!userExist) {
            throw new NotFoundException(`user with id ${id} was not found`)
        }

        const full_name = data.full_name.trim() // убрал ненужные символы
        const role = data.role.trim() // убрал ненужные символы

        return await this.prisma.user.update({
            where: { id },
            data: { ...data, full_name, role },
        })
    }

    // Метод для удаления пользователя
    async deleteUser(id?: number) {
        if (id) {
            const userExist = await this.prisma.user.findFirst({
                where: { id },
            })
            if (userExist) {
                return await this.prisma.user.delete({
                    where: { id },
                })
            } else {
                throw new NotFoundException(`user with id ${id} was not found`)
            }
        } else {
            await this.prisma.user.deleteMany()
            return
        }
    }
}
