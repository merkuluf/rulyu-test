import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

describe('User API e2e tests', () => {
    let app: INestApplication

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })

    afterAll(async () => {
        await app.close()
    })

    describe('POST /create', () => {
        it('should create user with correct data', async () => {
            const response = await request(app.getHttpServer())
                .post('/create')
                .send({
                    full_name: 'Maxim Merkulov',
                    role: 'developer',
                    efficiency: 100,
                })

            expect(response.status).toBe(201)
            expect(response.body).toEqual({
                success: true,
                result: {
                    id: expect.any(Number),
                },
            })
        })
        it('should return error for huge full_name', async () => {
            const longName = 'a'.repeat(1001)
            const response = await request(app.getHttpServer())
                .post('/create')
                .send({
                    full_name: longName,
                    role: 'developer',
                    efficiency: 85,
                })

            // expect(response.status).toBe(400)
            expect(response.body).toEqual({
                success: false,
                result: {
                    error: expect.any(String),
                },
            })
        })
    })
})
