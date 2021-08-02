import { DatabaseConnectionError } from './errors/database-connection-error'
import mongoose from 'mongoose'
import { app } from './app'

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw Error(' JWT_KEY must be defined ! ')
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log('DB connection success !')
  } catch (err) {
    throw new DatabaseConnectionError('Error Connecting to database')
  }

  app.listen(3000, () => {
    console.log('🔥 Listening on port -> 3000 🔥')
  })
}

start()
