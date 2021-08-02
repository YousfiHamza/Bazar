import request from 'supertest'
import { app } from '../../app'

const user = {
  email: 'myEmail@test.com',
  password: 'password',
}

describe('Sign Out Route', () => {
  it('returns an empty object on success', async () => {
    await request(app).post('/api/users/signup').send(user).expect(201)
    await request(app).post('/api/users/signin').send(user).expect(200)
    const response = await request(app).post('/api/users/signout').send({}).expect(200)
    expect(response.get('Set-Cookie')[0]).toEqual(
      'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
    )
  })
})
