import { NotFoundError } from './errors/not-found-error'
import { errorHandler } from './middlewares/error-handler'
import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'

import { json } from 'body-parser'
import { currentUserRouter } from './routes/current-user'
import { signInRouter } from './routes/signin'
import { signOutRouter } from './routes/signout'
import { signUpRouter } from './routes/signup'

const app = express()
app.set('trust proxy', true) // trust traffic even if its comming from proxy (NGNIX)
app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test', // only used for https connections - it shoud be false if we want to test otherwise our tests wont pass because supertest uses plain HTTP and not HTTPS
  })
)

app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)

// 404 Handeling Not Defined Routes
app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
