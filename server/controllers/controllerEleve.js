const { postEmail, generateToken, prepareData } = require('../utils')
const jwt = require('jsonwebtoken')
const EleveModel = require('../models/EleveModel')
const config = require('../config/env')
const ROLES = require('../config/roles')
// const { prepareData } = require('../utiles')

const creerCompte = async (req, res) => {
    const { nom, prenom, email, tel } = req.body
    if (!nom || !prenom || !email || !tel) return res.json({
        success: false,
        titre: 'infoManquantes',
        message: 'Tous les champs sont obligatoires',
    })
    const eleveExists = await EleveModel.findOne({ email })
    if (eleveExists) return res.json({
        success: false,
        titre: 'compteExiste',
        message: 'Vous êtes avez déjà un compte !'
    })


    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)

    const token = await generateToken(email, 1)
    const eleve = new EleveModel({ nom, prenom, email, tel, role: ROLES.NON_VERIFIE, token })
    await eleve.save()

    await postEmail(req, nom, prenom, email, token, 'Bienvenue chez Euduka', 'verifier-email')
    return res.json({
        success: true,
        token,
        titre: "non_verifie",
        role: eleve.role,
        message: "Un mail vous a été envoyés. Pour finaliser votre inscription cliquez sur le lien du mail."
    })
}

const verifierEmail = async (req, res) => {
    const { token } = req.body
    try {
        // Verify token
        jwt.verify(token, config.SECRET_KEY)

        // Find the student with this token
        const eleve = await EleveModel.findOne({ token })

        if (!eleve) {
            return res.json({
                success: false,
                message: 'Aucun compte correspondant à ce lien de vérification.'
            })
        }

        // Update student role to 'basic'
const newToken = await generateToken(eleve.email, 120)

        const eleveUpdated = await EleveModel.findOneAndUpdate(
            { token },
            { $set: { role: ROLES.BASIC, token: newToken } },
            { new: true, runValidators: true }
        )

        return res.json({
            success: true,
            message: 'Votre email a été vérifié avec succès.',
            eleveUpdated,
            token: newToken
        })

    } catch (err) {
        // Supprimer l'élève si le token est expiré ou invalide
        await EleveModel.findOneAndDelete({ token })

        return res.json({
            success: false,
            role: ROLES.NON_VERIFIE,
            message: 'Le lien de vérification a expiré ou il est invalide. Votre pré-inscription a été annulée, veuillez recommencer.'
        })
    }
}

const annulerCompte = async (req, res) => {
    const { token } = req.body

    try {
        const eleve = await EleveModel.findOneAndDelete({ token })
        if (eleve) {
            return res.json({
                success: true,
                message: 'Votre compte a été supprimé avec succès.'
            })
        }
    } catch (error) {
        return res.json({
            succuss: false,
            message: 'Une erreur s\'était produite. Veuillez réessayer plus tard'
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) return res.json({
        success: false,
        message: 'Email et mot de passe sont requis'
    })
    try {
        const eleve = await EleveModel.findOne({ email })
        if (!eleve) return res.json({
            success: false,
            message: 'Aucun compte associé à cet émail. Veuillez créer un compte'
        })
        if (eleve.role === ROLES.NON_VERIFIE) return res.json({
            success: false,
            message: 'Votre compte n\'est pas encore activé. Veuillez vérifier votre email !'
        })
        // if(eleve.password !== password) return res.json({
        //     success: false,
        //     message: 'Mot de passe incorrect'
        // })

        const token = await generateToken(email, 120); // Token valide 2 heures (120 min)
        eleve.token = token;
        await eleve.save();

        return res.json({ eleve, success: true, titre: eleve.role })
        console.log(eleve);

    } catch (error) {
        res.json({ success: false, message: 'Erreur serveur. Veuillez réessayer plus tard' })
    }
}

const getExo = (req, res) => {
    const { exo } = req.query
    const data = prepareData(exo)
    res.json(data)
}

const updateResultats = async (req, res) => {
    const token = req.authorization
    const result = req.body.res
    try {
        const eleve = await EleveModel.findOneAndUpdate({ token },
            {
                $set: {
                    resultats: result
                },
            },
            {
                new: true,
                runValidators: true
            }
        )
        if (!eleve) return res.json({
            success: false,
            message: 'pas d\'eleve'
        })

        // New: Emit real-time notification to the user
        // io.to(eleve._id.toString()).emit('notification', { message: 'Votre score a été mis à jour', score: result.score || result })


        res.json({ eleve, success: true })


    } catch (error) {
        res.json({
            success: false,
            message: 'Erreur serveur. Veuillez réessayer plus tard' + error.message
        })

    }
}

const freeMins = async (req, res) => {
    if (!res.headersSent) {
        const token = await generateToken(req.userEmail, 10) // token valide 10 minutes
        // --------- UPDATE DOCUMENT (opération atomique)
        const eleveUpdated = await EleveModel.findOneAndUpdate(
            { email: req.userEmail, freeMins: { $gt: 0 } },
            {
                $inc: { freeMins: -1 },
                $set: {
                    dateFreeMin: new Date(),
                    token
                },
            },
            {
                new: true,
                runValidators: true
            })

        if (!eleveUpdated) {
            return res.json({
                success: false,
                titre: 'noMoreMins',
                message: 'Vous n\'avez plus de solde minutes. Passez Premium',
                freeMins: 0
            })
        }

        return res.json({
            success: true,
            titre: 'Félicitation',
            message: 'Vous avez 10 minutes gratuites !',
            token,
            eleveUpdated
        })
    }
}

const mdpOublie = async (req, res) => {
    const { email } = req.body
    try {
        const eleve = await EleveModel.findOne({ email })
        if (!eleve) return res.json({
            success: false,
            message: 'Aucun compte associé à cet email.'
        })
        const token = await generateToken(email, 15)
        const eleveUpdated = await EleveModel.findOneAndUpdate({ email },
            {
                $set: {
                    token
                }
            },
            {
                new: true,
                runValidators: true
            }
        )
        // send email with token
        await postEmail(req, eleve.nom, eleve.prenom, email, token, 'Réinitialisation de mot de passe', 'mdp-reinitialiser')
        return res.json({
            success: true,
            message: 'Un email a été envoyé à votre adresse pour réinitialiser votre mot de passe.'
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

const adminLogin = async (req, res) => {
    const { email, password } = req.body
    if (email == "a@a.com" && password == "a") { // Admin credentials
        const reponse = await EleveModel.find({})
        if (req.accepts('html')) {
            return res.render('admin', { eleves: reponse });
        }
        return res.json({
            success: true,
            message: 'data sent',
            data: reponse
        })
    } else {
        if (req.accepts('html')) {
            return res.render('login_admin', { error: 'Email ou mot de passe incorrect' });
        }
        return res.json({
            success: false,
            message: 'Email ou mot de passe incorrect'
        })
    }
}

const mdpReinitialiser = async (req, res) => {

}

const demandePremium = async (req, res) => {
    const { numeroRecu } = req.body;
    const token = req.authorization; // Ou req.authorization selon comment votre middleware auth le gère

    // Le middleware 'auth' devrait normalement injecter l'email ou l'ID dans req
    // Mais ici on dirait que vous utilisez le token pour trouver l'élève dans updateResultats

    try {
        if (!numeroRecu || !req.file) {
            return res.json({
                success: false,
                message: 'Le numéro de reçu et l\'image sont obligatoires.'
            });
        }

        const imagePath = `/uploads/${req.file.filename}`;

        const eleve = await EleveModel.findOneAndUpdate(
            { token: token },
            {
                $set: {
                    premiumRequest: {
                        date: new Date(),
                        numeroRecu: numeroRecu,
                        imageRecu: imagePath,
                        statut: 'en_attente'
                    },
                    role: ROLES.ATTENTE_PREMIUM
                }
            },
            { new: true }
        );

        if (!eleve) {
            return res.json({
                success: false,
                message: 'Élève non trouvé. Veuillez vous reconnecter.'
            });
        }

        res.json({
            success: true,
            message: 'Votre demande a été envoyée avec succès. Elle sera traitée sous 24h.',
            eleve
        });

    } catch (error) {
        res.json({
            success: false,
            message: 'Erreur lors de l\'envoi de la demande : ' + error.message
        });
    }
}

const validerPremium = async (req, res) => {
    const { token } = req.body; // Token de l'élève à valider
    try {
        const eleve = await EleveModel.findOneAndUpdate(
            { token: token },
            {
                $set: {
                    role: ROLES.PREMIUM,
                    'premiumRequest.statut': 'valide'
                }
            },
            { new: true }
        );

        if (!eleve) return res.json({ success: false, message: 'Élève non trouvé' });

        res.json({
            success: true,
            message: `Le compte de ${eleve.nom} est maintenant PREMIUM`,
            eleve
        });
    } catch (error) {
        res.json({ success: false, message: 'Erreur : ' + error.message });
    }
}

module.exports = {
    creerCompte,
    verifierEmail,
    login, updateResultats, freeMins,
    getExo, annulerCompte,
    mdpOublie,
    demandePremium,
    validerPremium,
    adminLogin
};