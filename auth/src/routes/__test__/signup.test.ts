import request from 'supertest'
import { app } from '../../app'

const user = {
  email: 'myEmail@test.com',
  password: 'password',
}

const onlyEmail = {
  email: 'myEmail@test.com',
}

const onlyPassword = {
  password: 'password',
}

describe('Sign Up Route', () => {
  it('returns a 201 on success', async () => {
    const resp = await request(app).post('/api/users/signup').send(user)
    expect(resp.statusCode).toEqual(201)
    expect(resp.body.email).toEqual(user.email)
  })
  it('returns a 400 if only Email', async () => {
    await request(app).post('/api/users/signup').send(onlyEmail).expect(400)
  })
  it('returns a 400 if only Password', async () => {
    await request(app).post('/api/users/signup').send(onlyPassword).expect(400)
  })
  it('returns a 400 if no Email nor Password', async () => {
    await request(app).post('/api/users/signup').send({}).expect(400)
  })
  it('Disallows Duplicate Email', async () => {
    await request(app).post('/api/users/signup').send(user).expect(201)
    await request(app).post('/api/users/signup').send(user).expect(400)
  })
  it('sets up cookie after sign up success', async () => {
    const response = await request(app).post('/api/users/signup').send(user).expect(201)
    expect(response.get('Set-Cookie')).toBeDefined()
  })
})
