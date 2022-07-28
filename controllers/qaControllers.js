const db = require('../models/qaModel.js')

const getQuestions = async (req, res) => {
  const { product_id } = req.query
  const page = req.query.page || 0
  const count = req.query.count || 5
  try {
    const { rows } = await db.getQuestions(product_id, page, count)
    const data = {
      product_id,
      results: rows
    }
    res.status(200).json(data)
  } catch(err) {
    res.status(400).send(err)
  }
}

const getAnswers = async (req, res) => {
  const { question_id } = req.params
  const page = req.query.page || 0
  const count = req.query.count || 5
  try {
    const { rows } = await db.getAnswers(question_id, page, count)
    const data = {
      question: question_id,
      page,
      count,
      results: rows
    }
    res.status(200).json(data)
  } catch(err) {
    res.status(400).send(err)
  }
}

const postQuestion = async (req, res) => {
  const { body, name, email , product_id} = req.body
  try{
    await db.postQuestion(product_id, body, name, email)
    res.status(201).send('CREATED')
  } catch(err) {
    res.status(400).send(err)
  }
}

const postAnswer = async (req, res) => {
  const { body, name, email } = req.body
  const { question_id } = req.params
  const photos = req.body.photos || null
  try{
    await db.postAnswer(question_id, body, name, email, photos)
    res.status(201).send('CREATED')
  } catch(err) {
    res.status(400).send(err)
  }
}

const reportQuestion = async (req, res) => {
  const { question_id } = req.params
  try{
    await db.reportQuestion(question_id)
    res.status(204).end()
  } catch(err) {
    res.status(400).send(err)
  }
}

const reportAnswer = async (req, res) => {
  const { answer_id } = req.params
  try{
    await db.reportAnswer(answer_id)
    res.status(204).end()
  } catch(err) {
    res.status(400).send(err)
  }
}

const questionHelpful = async (req, res) => {
  const { question_id } = req.params
  try{
    await db.questionHelpful(question_id)
    res.status(204).end()
  } catch(err) {
    res.status(400).send(err)
  }
}

const answerHelpful = async (req, res) => {
  const { answer_id } = req.params
  try{
    await db.answerHelpful(answer_id)
    res.status(204).end()
  } catch(err) {
    res.status(400).send(err)
  }
}

module.exports = {
  getQuestions,
  getAnswers,
  postQuestion,
  postAnswer,
  reportQuestion,
  reportAnswer,
  questionHelpful,
  answerHelpful
}