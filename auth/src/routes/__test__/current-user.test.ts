import request from 'supertest'
import { app } from '../../app'
import { signUp } from '../../test/helpers'

const user = {
  email: 'myEmail@test.com',
  password: 'password',
}

describe('Current User Route', () => {
  it('returns the current user on Success', async () => {
    const cookie = await signUp()
    const response = await request(app).get('/api/users/currentuser').set('Cookie', cookie).send().expect(200)
    expect(response.body.currentUser.email).toEqual(user.email)
  })
  it('returns the null on Failure', async () => {
    const cookie = await signUp()
    const response = await request(app).get('/api/users/currentuser').send().expect(200)
    expect(response.body.currentUser).toBeNull()
  })
})
