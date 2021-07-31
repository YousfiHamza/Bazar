import { DatabaseConnectionError } from './../errors/database-connection-error'
import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { User } from '../models/user.model'
import { BadRequestError } from '../errors/bad-request-error'
import jwt from 'jsonwebtoken'
import { validateRequest } from '../middlewares/request-validator'

const router = express.Router()

router.post(
  '/api/users/signup',
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

    if (existingUser) {
      console.log('Email in Use !')
      throw new BadRequestError('Email Already In Use !')
    }

    const user = User.buildUser({ email, password })
    try {
      await user.save()
    } catch (e) {
      throw new DatabaseConnectionError(e.message)
    }

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    )

    req.session = {
      jwt: userJwt,
    }

    console.log('User Created !')
    res.status(201).send(user)
  }
)

export { router as signUpRouter }
