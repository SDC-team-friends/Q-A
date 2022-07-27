const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const qaRoutes = require('./routes/qaRoutes.js')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/qa', qaRoutes)

app.listen(PORT, () => console.log(`server listening on PORT: ${PORT}`))