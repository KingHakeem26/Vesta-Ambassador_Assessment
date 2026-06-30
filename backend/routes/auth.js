import { Router } from 'express'

const router = Router()

router.post('/login', (req, res) => {
  const { username, password } = req.body
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.json({ success: true })
  }
  res.status(401).json({ error: 'Invalid credentials' })
})

export default router
