const { Pool } = require('pg')
const mongoose = require('mongoose')

const questionsSchema = mongoose.Schema({
  product_id: { type: Number, required: true },
  body: { type: String, required: true },
  date_written: Number,
  asker_name: { type: String, required: true },
  asker_email: { type: String, required: true },
  reported: { type: Boolean, default: false },
  helpful: { type: Number, default: 0 },
})

const answersSchema = mongoose.Schema({
  question_id: { type: Number, required: true },
  body: { type: String, required: true },
  date_written: Number,
  answerer_name: { type: String, required: true },
  answerer_email: { type: String, required: true },
  reported: { type: Boolean, default: false },
  helpful: { type: Number, default: 0 },
  photos: [String]
})

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  port: process.env.PGPORT,
  password: process.env.PGPASS,
  database: process.env.PGDATABASE,
})

const getQuestions = (id, cb) => {

}

const getAnswers = (id, cb) => {

}

const postQuestion = (id, cb) => {

}

const postAnswer = (id, cb) => {

}

const reportQuestion = (id, cb) => {

}

const reportAnswer = (id, cb) => {

}

const questionHelpful = (id, cb) => {

}

const answerHelpful = (id, cb) => {

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