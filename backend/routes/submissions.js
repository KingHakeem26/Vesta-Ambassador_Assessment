import { Router } from 'express'
import { supabase } from '../lib/supabase.js'

const router = Router()

router.post('/init', async (req, res) => {
  const { name, email } = req.body
  const { data, error } = await supabase
    .from('submissions')
    .insert({ name, email, status: 'pending_review' })
    .select()
    .single()
  if (error) return res.status(500).json({ error: error.message })
  res.json({ submissionId: data.id })
})

router.patch('/:id/answers', async (req, res) => {
  const { id } = req.params
  const { answers } = req.body

  const { data: questions, error: qErr } = await supabase
    .from('questions')
    .select('id, type, correct_answers')
    .eq('type', 'mc')

  if (qErr) return res.status(500).json({ error: qErr.message })

  let mcScore = 0
  for (const q of questions) {
    const userAnswer = answers[q.id]
    if (!userAnswer) continue
    const userSorted = [...userAnswer].sort().join(',')
    const correctSorted = [...(q.correct_answers || [])].sort().join(',')
    if (userSorted === correctSorted) mcScore++
  }

  const { error } = await supabase
    .from('submissions')
    .update({ answers, mc_score: mcScore, status: 'pending_review' })
    .eq('id', id)

  if (error) return res.status(500).json({ error: error.message })
  res.json({ success: true, mcScore })
})

router.patch('/:id/review', async (req, res) => {
  const { id } = req.params
  const { typeInGrades } = req.body

  // Fetch submission + total question counts in parallel
  const [{ data: submission, error: sErr }, { count: mcTotal }, { count: typeInTotal }] = await Promise.all([
    supabase.from('submissions').select('mc_score').eq('id', id).single(),
    supabase.from('questions').select('*', { count: 'exact', head: true }).eq('type', 'mc'),
    supabase.from('questions').select('*', { count: 'exact', head: true }).eq('type', 'typein'),
  ])

  if (sErr) return res.status(500).json({ error: sErr.message })

  const totalQuestions = (mcTotal || 0) + (typeInTotal || 0)
  const typeInCorrect = typeInGrades.filter(g => g.correct).length
  const finalScore = totalQuestions > 0
    ? Math.round(((submission.mc_score + typeInCorrect) / totalQuestions) * 100)
    : 0
  const result = finalScore >= 60 ? 'pass' : 'fail'

  const { error } = await supabase
    .from('submissions')
    .update({ typein_grades: typeInGrades, final_score: finalScore, result, status: 'reviewed' })
    .eq('id', id)

  if (error) return res.status(500).json({ error: error.message })
  res.json({ success: true, finalScore, result, totalQuestions, mcTotal, typeInTotal })
})

router.get('/', async (req, res) => {
  const { status } = req.query
  let query = supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (status) query = query.eq('status', status)

  const { data, error } = await query
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return res.status(500).json({ error: error.message })

  const { data: questions } = await supabase
    .from('questions')
    .select('*')
    .order('order_num', { ascending: true })

  res.json({ submission: data, questions })
})

export default router
