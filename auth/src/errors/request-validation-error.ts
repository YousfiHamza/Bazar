import { ValidationError } from 'express-validator'
import { CustomError } from './custom-error'

// We will use Abstract Classes instead of INTERFACES so be can have accces to the 'instanceof' proprety later for checks/conditions
// interface CustomErrorType {
//   statusCode: number
//   serializeErrors(): {
//     errors: {
//       message: string
//       field?: string
//     }[]
//   }
// }

export class RequestValidationError extends CustomError {
  statusCode = 400
  constructor(public errors: ValidationError[]) {
    // because of extends
    super('Error Validating The Credentials')
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  serializeErrors() {
    const formatedErrors = this.errors.map((error: ValidationError) => ({
      message: error.msg,
      field: error.param,
    }))
    return formatedErrors
  }
}
