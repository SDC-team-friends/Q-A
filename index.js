const express = require('express')
const dotenv = require('dotenv').config()
const qaRoutes = require('./routes/qaRoutes.js')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/qa', qaRoutes)

app.listen(PORT, () => `server listening on PORT: ${PORT}`)