import { NotFoundError } from './errors/not-found-error'
import { errorHandler } from './middlewares/error-handler'
import express from 'express'
import 'express-async-errors'

import { json } from 'body-parser'
import { currentUserRouter } from './routes/current-user'
import { signInRouter } from './routes/signin'
import { signOutRouter } from './routes/signout'
import { signUpRouter } from './routes/signup'

const app = express()
app.use(json())

app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)

// 404 Handeling Not Defined Routes
app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

app.listen(3000, () => {
  console.log('🔥 Listening on port -> 3000 🔥 !')
})
