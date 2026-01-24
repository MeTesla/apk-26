const express = require('express')
const router = express.Router()

// Middlewares
const auth = require('../middlewares/auth')
const freeMinsMiddleware = require('../middlewares/freeMinsMiddleware')

// Controllers
const { creerCompte, verifierEmail, login,
    updateResultats, freeMins,
    getExo, annulerCompte,
    mdpOublie, demandePremium, validerPremium } = require('../controllers/controllerEleve')

const upload = require('../middlewares/upload')

router.post('/creer-compte', creerCompte)

router.post('/verifier-email', verifierEmail)

router.post('/annuler-compte', annulerCompte)

router.post('/login', login)

router.post('/update-resultats', auth, updateResultats)

router.post('/demande-premium', auth, upload.single('recuImage'), demandePremium)
router.post('/valider-premium', validerPremium)

router.get('/freeMins', freeMinsMiddleware, freeMins)

router.get('/', auth, getExo)

router.post('/mdp-oublie', mdpOublie)

module.exports = router
