const express = require('express')
const EleveModel = require('../models/EleveModel')
const jwt = require('jsonwebtoken')
const config = require('../config/env')

//+10 mintues Middleware & route
const freeMinsMiddleware = async (req, res, next) => {
    const token = req.headers.authorization

    if (!token || (token === "")) return res.json({
        success: false,
        titre: 'noToken',
        message: 'Un problème est survenu. Veuillez contacter l\'Administareur',
    })


    const payload = jwt.decode(token);
    if (!payload) return res.json({
        success: false,
        titre: 'noPayload',
        message: 'Un problème est survenu. Veuillez contacter l\'Administareur',
    })

    req.userEmail = payload.email


    const email = payload.email
    const eleve = await EleveModel.findOne({ email })
    if (!eleve) return res.json({
        success: false,
        titre: 'noEleve',
        // Je dois gérer le cas d'un élève qui n'a pas vérifié son email, cas larbi@larbi.co
        // Token evoyé par émail dois avoir une durée de validité plus longue (4jours)
        message: 'Vous n\'avez pas de compte. Veuillez vous enregistrer !',
    })
    if (eleve.role == 'attenteR') return res.json({
        success: false,
        titre: 'notVerified',
        message: 'Votre compte n\'est pas encore activé. Veuillez vérifier votre email !',
    })

    if (eleve.role == 'premium') {
        return res.json({
            success: true,
            titre: 'Premium',
            message: 'Accès illimité pour les membres Premium !',
            token, // On renvoie le token pour rester cohérent
            eleveUpdated: eleve
        })
    }


    const { freeMins, dateFreeMin } = eleve

    const now = new Date()
    function timeStamp(d) {
        const time = d.getTime()
        return time
    }

    // ------------1   IS VALID Token
    if ((timeStamp(dateFreeMin) + 1000 * 60) > timeStamp(now)) {
        return res.json({
            success: false,
            titre: 'validToken',
            message: 'Les 15 minutes ne sont pas encore écoulées !'
        })

    }
    const date = new Date(dateFreeMin)

    // ------------2
    if (freeMins <= 0) {
        return res.json({
            success: false,
            titre: 'noMoreMins',
            message: 'Vous n\'avez plus de solde minutes. Passer Prmium',
            freeMins
        })
    }

    // ------------3   Same day 24H
    if (timeStamp(dateFreeMin) + (2 * 60 * 1000) > timeStamp(now)) {
        return res.json({
            success: false,
            titre: 'waitDay',
            message: 'Vous devez attendre 24h avant d\'avoir des minutes gratuites',
            freeMins
        })
    }

    jwt.verify(token, config.SECRET_KEY, (err, user) => {
        if (err && err.name === "TokenExpiredError") {
            next();
        }
    });
}

module.exports = freeMinsMiddleware