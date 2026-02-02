const express = require('express')
const EleveModel = require('../models/EleveModel')
const jwt = require('jsonwebtoken')
const config = require('../config/env')
const ROLES = require('../config/roles')

//+10 mintues Middleware & route
const freeMinsMiddleware = async (req, res, next) => {
    const token = req.headers.authorization
    console.log('1');
    
    if (!token || (token === "")) return res.json({
        success: false,
        titre: 'noToken',
        message: 'Un problème est survenu. Veuillez contacter l\'Administareur',
    })
 console.log('2');

    const payload = jwt.decode(token);
    if (!payload) return res.json({
        success: false,
        titre: 'noPayload',
        message: 'Un problème est survenu. Veuillez contacter l\'Administareur',
    })
 console.log('3');
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
     console.log('4');
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
console.log('5');
    // ------------1  VALID session
    if ((timeStamp(dateFreeMin) + 1000 * 60 * 2) > timeStamp(now)) {
        return res.json({
            success: false,
            titre: 'validSession',
            message: 'Votre session est encore valide !',            
        })
    }
 console.log('6');
    const date = new Date(dateFreeMin)

    // ------------2   No more freeMins
    if (freeMins <= 0) {
        return res.json({
            success: false,
            titre: 'noMoreMins',
            message: 'Vous n\'avez plus de solde minutes. Passez Premium',            
        })
    }
 console.log('7');
    // ------------3  Attente de 2 min
    if (timeStamp(dateFreeMin) + (2 * 60 * 1000) > timeStamp(now)) {
        return res.json({
            success: false,
            titre: 'waitDay',
            message: 'Vous devez attendre 24h avant d\'avoir des minutes gratuites',
            freeMins
        })
    }
 console.log('8');
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
     console.log('1');
}

module.exports = freeMinsMiddleware