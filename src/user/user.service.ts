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
        try {
            const full_name = data.full_name.trim() // убрал ненужные символы
            const role = data.role.trim() // убрал ненужные символы
            const user = await this.prisma.user.create({
                data: { ...data, full_name, role },
            })
            return { success: true, result: { id: user.id } }
        } catch (error) {
            return { success: false, result: { error: error.message } }
        }
    }

    async getUser(id?: number, role?: string, full_name?: string) {
        try {
            const where: any = {}
            if (id) where.id = id
            if (role) where.role = role
            if (full_name) where.full_name = full_name

            const users = await this.prisma.user.findMany({ where })

            if (users.length === 0) {
                return {
                    success: false,
                    result: { error: 'User(s) not found' },
                }
            }

            return { success: true, result: { users } }
        } catch (error) {
            return { success: false, result: { error: error.message } }
        }
    }

    // Метод для обновления пользователя
    async updateUser(
        id: number,
        data: { full_name?: string; role?: string; efficiency?: number }
    ) {
        try {
            const userExist = await this.prisma.user.findFirst({
                where: { id },
            })

            if (!userExist) {
                throw new NotFoundException(`user with id ${id} was not found`)
            }

            const full_name = data.full_name.trim() // убрал ненужные символы
            const role = data.role.trim() // убрал ненужные символы

            const user = await this.prisma.user.update({
                where: { id },
                data: { ...data, full_name, role },
            })
            return { success: true, result: user }
        } catch (error) {
            return { success: false, result: { error: error.message } }
        }
    }

    // Метод для удаления пользователя
    async deleteUser(id?: number) {
        try {
            if (id) {
                const userExist = await this.prisma.user.findFirst({
                    where: { id },
                })
                if (userExist) {
                    const user = await this.prisma.user.delete({
                        where: { id },
                    })
                    return { success: true, result: user }
                } else {
                    throw new NotFoundException(
                        `user with id ${id} was not found`
                    )
                }
            } else {
                await this.prisma.user.deleteMany()
                return { success: true }
            }
        } catch (error) {
            return { success: false, result: { error: error.message } }
        }
    }
}
