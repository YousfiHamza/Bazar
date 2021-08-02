import request from 'supertest'
import { app } from '../app'

export const signUp = async () => {
  const user = {
    email: 'myEmail@test.com',
    password: 'password',
  }
  const signUpResponse = await request(app).post('/api/users/signup').send(user)
  const cookie = signUpResponse.get('Set-Cookie')
  return cookie
}
