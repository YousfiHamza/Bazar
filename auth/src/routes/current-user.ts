import { currentUser } from './../middlewares/current-user'
import express from 'express'

const router = express.Router()

router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser })
})

export { router as currentUserRouter }
