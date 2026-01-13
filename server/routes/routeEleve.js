const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const freeMinsMiddleware = require('../middlewares/freeMinsMiddleware')

const creerCompte = require('../controllers/controllerEleve')



router.post('/creer-compte', creerCompte)
// Router.get('/creer-compte', '')
// Router.get('/verifier-email', '')
// Router.get('/login', '')
// Router.get('/update-resultat', '')
// Router.get('/freeMins', '')

module.exports = router


/*
Routes :
    - /
    - creer-compte
    - verifier-email
    - login
    - update-resultat
    - freeMins    

SERVER :
     import express from "express";
     import routerNotes from "./routes/routerNotes.js";
     app.use("/", routerNotes);

ROUTER:
     import express from "express"; 
     const router = express.Router();
     import {notesController} from '....'
     router.get('/', notesController)

*/