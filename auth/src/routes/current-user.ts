import express from 'express'

const router = express.Router()

router.get('/api/users/currentuser', (req, res) => {
  console.log('get req')
  res.send('Hi There !')
})

export { router as currentUserRouter }
