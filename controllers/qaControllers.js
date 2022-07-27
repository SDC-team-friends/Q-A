const db = require('../models/qaModel.js')

const getQuestions = async (req, res) => {
  const { product_id } = req.query
  const page = req.query.page || 0
  const count = req.query.count || 5
  try {
    const { rows } = await db.getQuestions(product_id, page, count)
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

const postQuestion = (req, res) => {

}

const postAnswer = (req, res) => {

}

const reportQuestion = (req, res) => {

}

const reportAnswer = (req, res) => {

}

const questionHelpful = (req, res) => {

}

const answerHelpful = (req, res) => {

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