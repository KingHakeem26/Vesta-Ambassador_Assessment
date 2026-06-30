import { Router } from 'express'
import { supabase } from '../lib/supabase.js'

const router = Router()

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('sections')
    .select('name')
    .order('name', { ascending: true })
  if (error) return res.status(500).json({ error: error.message })
  res.json(data.map(r => r.name))
})

router.post('/', async (req, res) => {
  const { name } = req.body
  if (!name?.trim()) return res.status(400).json({ error: 'Name is required' })
  const { data, error } = await supabase
    .from('sections')
    .insert({ name: name.trim() })
    .select()
    .single()
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

router.delete('/:name', async (req, res) => {
  const { name } = req.params
  const sectionName = decodeURIComponent(name)

  // Reassign questions in this section to 'Uncategorized'
  await supabase
    .from('questions')
    .update({ section: 'Uncategorized' })
    .eq('section', sectionName)

  const { error } = await supabase
    .from('sections')
    .delete()
    .eq('name', sectionName)

  if (error) return res.status(500).json({ error: error.message })
  res.json({ success: true })
})

export default router
