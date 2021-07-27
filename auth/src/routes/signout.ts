import express from 'express'

const router = express.Router()

router.post('/api/users/signout', (req, res) => {
  console.log('Hi There from Sign Out !')
  res.send('Hi There from Sign Out !')
})

export { router as signOutRouter }
