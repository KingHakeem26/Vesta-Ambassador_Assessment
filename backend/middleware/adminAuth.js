export function adminAuth(req, res, next) {
  const token = req.headers['x-admin-auth']
  if (token !== 'true') {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}
