import request from 'supertest'
import { app } from '../../app'

const user = {
  email: 'myEmail@test.com',
  password: 'password',
}

const wrongEmail = {
  email: 'myEmail@test.comm',
  password: 'password',
}

const wrongPassword = {
  email: 'myEmail@test.com',
  password: 'passwordd',
}

describe('Sign In Route', () => {
  let response: request.Response
  beforeEach(async () => {
    response = await request(app).post('/api/users/signup').send(user).expect(201)
  })
  it('returns a 200 on success', async () => {
    await request(app).post('/api/users/signin').send(user).expect(200)
  })
  it('returns a 400 on wrong Email', async () => {
    const error = await request(app).post('/api/users/signin').send(wrongEmail).expect(400)
    expect(error.body).toEqual({
      errors: [
        {
          message: 'This User Doesnt Exist !',
        },
      ],
    })
  })
  it('returns a 400 on wrong Password', async () => {
    await request(app).post('/api/users/signin').send(wrongPassword).expect(400)
  })
  it('sets up cookie after sign in success', async () => {
    expect(response.get('Set-Cookie')).toBeDefined()
  })
})
