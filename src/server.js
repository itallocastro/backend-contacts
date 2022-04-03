require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
})

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

const baseUrl = process.env.BASE_URL || ''
const routes = require('./routes')

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'))

Object.keys(routes).forEach((key) => {
    app.use(`${baseUrl}/${key}`, routes[key])
})

module.exports = app