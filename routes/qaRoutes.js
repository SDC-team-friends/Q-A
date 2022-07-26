const router = require('express').Router()
const { getQuestions, getAnswers, postQuestion, postAnswer, questionHelpful, answerHelpful, reportQuestion, reportAnswer } = require('../controllers/qaControllers.js')

router.get('/questions', getQuestions)
router.get('/questions/:question_id/answers', getAnswers)

router.post('/questions', postQuestion)
router.post('/questions/:question_id/answers', postAnswer)

router.put('/questions/:question_id/helpful', questionHelpful)
router.put('/answers/:answer_id/helpful', answerHelpful)
router.put('/questions/:question_id/report', reportQuestion)
router.put('/answers/:answer_id/report', reportAnswer)


module.exports = router