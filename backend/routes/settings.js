import { Router } from 'express'
import { supabase } from '../lib/supabase.js'

const router = Router()

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('id', 1)
    .single()
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

router.patch('/', async (req, res) => {
  const { timerSeconds } = req.body
  const { data, error } = await supabase
    .from('settings')
    .update({ timer_seconds: timerSeconds })
    .eq('id', 1)
    .select()
    .single()
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

export default router
