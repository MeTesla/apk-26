const express = require('express')
const router = express.Router()

// Middlewares
const auth = require('../middlewares/auth')
const freeMinsMiddleware = require('../middlewares/freeMinsMiddleware')

// Controllers
const { creerCompte, verifierEmail, login,
    updateResultats, freeMins,
    getExo, annulerCompte } = require('../controllers/controllerEleve')

router.post('/creer-compte', creerCompte)

router.post('/verifier-email', verifierEmail)

router.post('/annuler-compte', annulerCompte)

router.post('/login', login)

router.post('/update-resultats', auth, updateResultats)

router.get('/freeMins', freeMinsMiddleware, freeMins)

router.get('/', auth, getExo)

module.exports = router
