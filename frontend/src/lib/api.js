import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : '',
})

api.interceptors.request.use((config) => {
  if (typeof sessionStorage !== 'undefined') {
    const isAdmin = sessionStorage.getItem('adminAuth')
    if (isAdmin === 'true') {
      config.headers['x-admin-auth'] = 'true'
    }
  }
  return config
})

export const initSubmission = (name, email) =>
  api.post('/api/submissions/init', { name, email }).then(r => r.data)

export const getQuestions = () =>
  api.get('/api/questions').then(r => r.data)

export const getQuestionCounts = () =>
  api.get('/api/questions/counts').then(r => r.data)

export const createQuestion = (data) =>
  api.post('/api/questions', data).then(r => r.data)

export const updateQuestion = (id, data) =>
  api.patch(`/api/questions/${id}`, data).then(r => r.data)

export const deleteQuestion = (id) =>
  api.delete(`/api/questions/${id}`).then(r => r.data)

export const reorderQuestions = (orderedIds) =>
  api.patch('/api/questions/reorder', { orderedIds }).then(r => r.data)

export const submitAnswers = (id, answers) =>
  api.patch(`/api/submissions/${id}/answers`, { answers }).then(r => r.data)

export const getSettings = () =>
  api.get('/api/settings').then(r => r.data)

export const updateSettings = (timerSeconds) =>
  api.patch('/api/settings', { timerSeconds }).then(r => r.data)

export const adminLogin = (username, password) =>
  api.post('/api/auth/login', { username, password }).then(r => r.data)

export const getSubmissions = (status) =>
  api.get('/api/submissions', { params: status ? { status } : {} }).then(r => r.data)

export const getSubmission = (id) =>
  api.get(`/api/submissions/${id}`).then(r => r.data)

export const reviewSubmission = (id, typeInGrades) =>
  api.patch(`/api/submissions/${id}/review`, { typeInGrades }).then(r => r.data)

export const getSections = () =>
  api.get('/api/sections').then(r => r.data)

export const createSection = (name) =>
  api.post('/api/sections', { name }).then(r => r.data)

export const deleteSection = (name) =>
  api.delete(`/api/sections/${encodeURIComponent(name)}`).then(r => r.data)
