import { Response, Request, NextFunction } from 'express'
import { CustomError } from '../errors/custom-error'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    console.log(err)
    res.status(err.statusCode).send({ errors: err.serializeErrors() })
  } else {
    console.log('Something went wrong !', err)
    res.status(500).send({
      errors: [
        {
          message: err.message || 'Internal Server Error',
        },
      ],
    })
  }
}
