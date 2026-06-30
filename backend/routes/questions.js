import { Router } from 'express'
import { supabase } from '../lib/supabase.js'

const router = Router()

router.get('/counts', async (req, res) => {
  const [{ count: mc }, { count: typein }] = await Promise.all([
    supabase.from('questions').select('*', { count: 'exact', head: true }).eq('type', 'mc'),
    supabase.from('questions').select('*', { count: 'exact', head: true }).eq('type', 'typein'),
  ])
  res.json({ mc: mc || 0, typein: typein || 0, total: (mc || 0) + (typein || 0) })
})

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .order('order_num', { ascending: true })
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

router.post('/', async (req, res) => {
  const { type, section, text, allowMultiple, options, correctAnswers, modelAnswer } = req.body

  const { data: maxData } = await supabase
    .from('questions')
    .select('order_num')
    .order('order_num', { ascending: false })
    .limit(1)
    .single()

  const order_num = maxData ? maxData.order_num + 1 : 1

  const { data, error } = await supabase
    .from('questions')
    .insert({
      order_num,
      type,
      section,
      text,
      allow_multiple: allowMultiple ?? null,
      options: options ?? [],
      correct_answers: correctAnswers ?? [],
      model_answer: modelAnswer ?? null,
    })
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

router.patch('/reorder', async (req, res) => {
  const { orderedIds } = req.body
  const updates = orderedIds.map((id, index) =>
    supabase.from('questions').update({ order_num: index + 1 }).eq('id', id)
  )
  await Promise.all(updates)
  res.json({ success: true })
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const { type, section, text, allowMultiple, options, correctAnswers, modelAnswer } = req.body

  const updates = {}
  if (type !== undefined) updates.type = type
  if (section !== undefined) updates.section = section
  if (text !== undefined) updates.text = text
  if (allowMultiple !== undefined) updates.allow_multiple = allowMultiple
  if (options !== undefined) updates.options = options
  if (correctAnswers !== undefined) updates.correct_answers = correctAnswers
  if (modelAnswer !== undefined) updates.model_answer = modelAnswer

  const { data, error } = await supabase
    .from('questions')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const { error } = await supabase.from('questions').delete().eq('id', id)
  if (error) return res.status(500).json({ error: error.message })
  res.json({ success: true })
})

export default router
