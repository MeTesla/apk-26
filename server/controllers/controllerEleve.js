const { postEmail, generateToken } = require('../utils')
const EleveModel = require('../models/EleveModel')

const creerCompte = async (req, res) => {
    console.log(req);

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

    const token = await generateToken(email, 1) // token valide 3 jours
    const eleve = new EleveModel({ nom, prenom, email, tel, role: 'attenteR', token })
    await eleve.save()

    await postEmail(req, res, nom, prenom, email, token)
    return res.json({
        success: true,
        titre: "attenteR",
        role: eleve.role,
        message: "Un mail vous a été envoyés. Pour finaliser votre inscription cliquez sur le lien du mail."
    })
}

module.exprorts = creerCompte;