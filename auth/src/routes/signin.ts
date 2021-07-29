import express from 'express'

const router = express.Router()

router.post('/api/users/signin', (req, res) => {
  console.log('Hi There from Sign In !')
  res.send('Hi There from Sign In !')
})

export { router as signInRouter }
