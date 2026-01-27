const express = require('express')
const EleveModel = require('../models/EleveModel')
const jwt = require('jsonwebtoken')
const config = require('../config/env')
const ROLES = require('../config/roles')

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
        // Je dois gérer le cas d'un élève qui n'a pas vérifié son email
        // Token evoyé par émail dois avoir une durée de validité plus longue (4jours)
        message: 'Vous n\'avez pas de compte. Veuillez vous enregistrer !',
    })
    if (eleve.role == ROLES.NON_VERIFIE) return res.json({
        success: false,
        titre: 'notVerified',
        message: 'Votre compte n\'est pas encore activé. Veuillez vérifier votre email !',
    })

    // Premium users get unlimited access
    if (eleve.role === ROLES.PREMIUM) {
        return next(); // Let them through without consuming minutes
    }

    const { freeMins, dateFreeMin } = eleve

    const now = new Date()
    function timeStamp(d) {
        const time = d.getTime()
        return time
    }

    // ------------1   IS VALID Token (user still has active session)
    if ((timeStamp(dateFreeMin) + 1000 * 60 * 15) > timeStamp(now)) {
        return next(); // Token still valid, let them through
    }

    const date = new Date(dateFreeMin)

    // ------------2   No more minutes left
    if (freeMins <= 0) {
        return res.json({
            success: false,
            titre: 'noMoreMins',
            message: 'Vous n\'avez plus de solde minutes. Passez Premium',
            freeMins
        })
    }

    // ------------3   Same day 24H check (must wait before getting new free minutes)
    if (timeStamp(dateFreeMin) + (60 * 1000) > timeStamp(now)) {
        return res.json({
            success: false,
            titre: 'waitDay',
            message: 'Vous devez attendre 24h avant d\'avoir des minutes gratuites',
            freeMins
        })
    }

    // If token is expired, proceed to freeMins controller
    jwt.verify(token, config.SECRET_KEY, (err, user) => {
        if (err && err.name === "TokenExpiredError") {
            next();
        } else {
            // Token is still valid but shouldn't be here
            return res.json({
                success: false,
                titre: 'invalidState',
                message: 'État invalide. Veuillez vous reconnecter.'
            })
        }
    });
}

module.exports = freeMinsMiddleware