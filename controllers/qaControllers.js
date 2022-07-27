const db = require('../models/qaModel.js')

const getQuestions = async (req, res) => {
  const { product_id } = req.query
  console.log(product_id)
  const page = req.query.page || 0
  const count = req.query.count || 5
  try {
    const { rows } = await db.getQuestions(product_id, page, count)
    console.log(rows)
    res.status(200).json(rows)
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
    const { rows } = await db.postQuestion(product_id, body, name, email)
    res.status(201).send('CREATED')
  } catch(err) {

  }
}

const postAnswer = async (req, res) => {
  try{

  } catch(err) {

  }
}

const reportQuestion = async (req, res) => {
  try{

  } catch(err) {

  }
}

const reportAnswer = async (req, res) => {
  try{

  } catch(err) {

  }
}

const questionHelpful = async (req, res) => {
  try{

  } catch(err) {

  }
}

const answerHelpful = async (req, res) => {
  try{

  } catch(err) {

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