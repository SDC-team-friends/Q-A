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

const getQuestions = (id, page, count) => {
  let amt
  if (page === 0) {
    return pool.query(`SELECT q.id question_id, q.body question_body, to_timestamp(q.date_written/1000) question_date, q.asker_name, q.helpful question_helpfulness, q.reported,(SELECT json_object_agg(answers.id, row_to_json(answers)) FROM (SELECT id, body, to_timestamp(date_written/1000) as date, answerer_name, helpful AS helpfulness, (SELECT json_agg(json_build_object('id', p.id, 'url', p.url)) FROM photos AS p WHERE p.answer_id = answers.id)photos FROM answers WHERE question_id = q.id) answers) answers FROM questions AS q WHERE q.product_id=${id} AND q.reported=false FETCH FIRST ${count} ROW ONLY`)
  }
  if (page !== 0) {
    amt = count * (page - 1)
    return pool.query(`SELECT q.id question_id, q.body question_body, to_timestamp(q.date_written/1000) question_date, q.asker_name, q.helpful question_helpfulness, q.reported,(SELECT json_object_agg(answers.id, row_to_json(answers)) FROM (SELECT id, body, to_timestamp(date_written/1000) as date, answerer_name, helpful AS helpfulness, (SELECT json_agg(json_build_object('id', p.id, 'url', p.url)) FROM photos AS p WHERE p.answer_id = answers.id)photos FROM answers WHERE question_id = q.id) answers) answers FROM questions AS q WHERE q.product_id=${id} AND q.reported=false OFFSET ${amt} FETCH FIRST ${count} ROW ONLY`)
  }
}

const getAnswers = (id, page, count) => {
  let amt
  if (page === 0) {
    return pool.query(`SELECT a.id answer_id, a.body body, to_timestamp(a.date_written/1000) date, a.answerer_name, a.helpful helpfulness, (SELECT json_agg(json_build_object('id', p.id, 'url', p.url)) FROM photos AS p WHERE p.answer_id = a.id) photos FROM answers as a WHERE a.question_id=${id} AND a.reported=false `)
  } else {
    amt = count * (page - 1)
    return pool.query(`SELECT a.id answer_id, a.body body, to_timestamp(a.date_written/1000) date, a.answerer_name, a.helpful helpfulness, (SELECT json_agg(json_build_object('id', p.id, 'url', p.url)) FROM photos AS p WHERE p.answer_id = a.id) photos FROM answers as a WHERE question_id=${id} AND reported=false OFFSET ${amt} FETCH FIRST ${count} ROW ONLY`)
  }
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