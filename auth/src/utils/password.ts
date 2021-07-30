import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'
// or we can use simply 'bcrypt'

const scryptAsync = promisify(scrypt)

export class Password {
  //static so we can call them through Password.method() without a new to instanciate with the 'new' keyword
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex')
    const buffer = (await scryptAsync(password, salt, 64)) as Buffer

    return `${buffer.toString('hex')}.${salt}`
  }
  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPass, salt] = storedPassword.split('.')
    const buffer = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer

    return hashedPass === buffer.toString('hex')
  }
}
