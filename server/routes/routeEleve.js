const express = require('express')
const Router = express.Router()
const getAllEleves = require('../controllers/controllerEleve.js')

Router.get('/eleves', getAllEleves)

module.exports = Router