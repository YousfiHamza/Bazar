import mongoose from 'mongoose'
import { Password } from '../utils/password'

// An interface that describes the propreties to create a new user
interface userAttrs {
  email: string
  password: string
}

// An interface that describes the propreties of the user model
interface UserModel extends mongoose.Model<UserDoc> {
  buildUser(user: userAttrs): UserDoc
}

// An interface that describes the propreties of the user Document
interface UserDoc extends mongoose.Document {
  email: string
  password: string
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password
        delete ret.__v
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

// too fancy syntax - we can easily use bcrypt !
// we dont use arrow fct so the value of 'this' will be the valuer of the user we want to persist instead of refering to the file
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'))
    this.set('password', hashed)
  }
  done()
})

// // to make sure we pass the right attributs with their right types
// const buildUser = (user: userAttrs) => {
//   return new User(user)
// }

// better this way if we want to export only User, no need to export buildUser too
userSchema.statics.buildUser = (user: userAttrs) => {
  return new User(user)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }
