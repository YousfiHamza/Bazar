import { Password } from './../utils/password'
import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { BadRequestError } from '../errors/bad-request-error'
import { User } from '../models/user.model'
import jwt from 'jsonwebtoken'
import { validateRequest } from '../middlewares/request-validator'

const router = express.Router()

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email Must Be Provided !'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 caracters !'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (!existingUser) {
      console.log('User doesnt exist !')
      throw new BadRequestError('This User Doesnt Exist !')
    }

    const match = await Password.compare(existingUser.password, password)

    if (!match) {
      console.log('Wrong credentials !')
      throw new BadRequestError('Wrong credentials !')
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    )

    req.session = {
      jwt: userJwt,
    }

    console.log(`${email} Successfully Logged in !`)
    res.status(200).send(existingUser)
  }
)

export { router as signInRouter }
