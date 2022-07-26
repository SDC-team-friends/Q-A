const { Pool } = require('pg')
const mongoose = require('mongoose')

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
    return pool.query(`SELECT q.id question_id, q.body question_body, to_timestamp(q.date_written/1000) question_date, q.asker_name, q.helpful question_helpfulness, q.reported,(SELECT json_object_agg(answers.id, row_to_json(answers)) FROM (SELECT id, body, to_timestamp(date_written/1000) as date, answerer_name, helpful AS helpfulness, (SELECT json_agg(json_build_object('id', p.id, 'url', p.url)) FROM photos AS p WHERE p.answer_id = answers.id)photos FROM answers WHERE question_id = q.id) answers) answers FROM questions AS q WHERE q.product_id=$1 AND q.reported=false FETCH FIRST $2 ROW ONLY`, [id, count])
  } else {
    amt = count * (page - 1)
    return pool.query(`SELECT q.id question_id, q.body question_body, to_timestamp(q.date_written/1000) question_date, q.asker_name, q.helpful question_helpfulness, q.reported,(SELECT json_object_agg(answers.id, row_to_json(answers)) FROM (SELECT id, body, to_timestamp(date_written/1000) as date, answerer_name, helpful AS helpfulness, (SELECT json_agg(json_build_object('id', p.id, 'url', p.url)) FROM photos AS p WHERE p.answer_id = answers.id)photos FROM answers WHERE question_id = q.id) answers) answers FROM questions AS q WHERE q.product_id=$1 AND q.reported=false OFFSET $2 FETCH FIRST $3 ROW ONLY`, [id, amt, count])
  }
}

const getAnswers = (id, page, count) => {
  let amt
  if (page === 0) {
    return pool.query(`SELECT a.id answer_id, a.body body, to_timestamp(a.date_written/1000) date, a.answerer_name, a.helpful helpfulness, (SELECT json_agg(json_build_object('id', p.id, 'url', p.url)) FROM photos AS p WHERE p.answer_id = a.id) photos FROM answers as a WHERE a.question_id=$1 AND a.reported=false`, [id])
  } else {
    amt = count * (page - 1)
    return pool.query(`SELECT a.id answer_id, a.body body, to_timestamp(a.date_written/1000) date, a.answerer_name, a.helpful helpfulness, (SELECT json_agg(json_build_object('id', p.id, 'url', p.url)) FROM photos AS p WHERE p.answer_id = a.id) photos FROM answers as a WHERE question_id=$1 AND reported=false OFFSET $2 FETCH FIRST $3 ROW ONLY`, [id, amt, count])
  }
}

const postQuestion = (id, body, name, email) => {
  const newDate = new Date().getTime()
  return pool.query(`INSERT INTO questions (product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [id, body, newDate, name, email, false, 0])
}

const postAnswer = (id, body, name, email, photos) => {
  const newDate = new Date().getTime()
  id = Number(id)
  if (!photos) {
    return pool.query(`INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [id, body, newDate, name, email, false, 0])
  } else {
    return pool.query(`WITH ta AS (INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id) INSERT INTO photos (answer_id, url) VALUES ((SELECT id from ta), unnest($8::text[]))`, [id, body, newDate, name, email, false, 0, photos])
  }
}

const reportQuestion = (id) => {
  return pool.query('UPDATE questions SET reported=true WHERE id=$1', [id])
}


const reportAnswer = (id) => {
  return pool.query('UPDATE answers SET reported=true WHERE id=$1', [id])
}

const questionHelpful = (id) => {
  return pool.query('UPDATE questions SET helpful=helpful + 1 WHERE id=$1', [id])
}

const answerHelpful = (id) => {
  return pool.query('UPDATE answers SET helpful=helpful + 1 WHERE id=$1', [id])
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
