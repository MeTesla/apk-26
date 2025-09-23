const express = require('express')
const mongoose = require('mongoose')
const EleveModel = require('./EleveModel')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
//git phon~
// phone + tablette 2
//const prepareData = require('./utils')
/*
Créer compte
    server: verifier si l'émail n'est déjà utilisé.
recevoir token (15 min + changement de menu + localStorage)
Demande 2ème token :
    email existe BD 
    extraire (dateFreeMins, freeMinsCounter)
    isValidToke
    freeMinsCounter>5
    sameDay
    generate new Token

*/
const { postEmail, prepareData } = require('./utils');

const SECRET_KEY = 'mkljaz_çè(__j'
const URL = `mongodb+srv://pookarim:UJyLoPjoP0UjbruY@notesapp.prtaxaf.mongodb.net/test?ssl=true&authSource=admin&w=majority`

// Generate TOKEN
const expire = 1

function generateToken(id) {
    return jwt.sign({ id }, SECRET_KEY, { expiresIn: `${expire}m` })
}

//-------Créer compte
// Ce route doit uniquement renvoyer un token de 10 minutes.
// +10min est un autre route qui vérifie le token et l'expiration et les nbr tokens
app.post('/creer-compte', async (req, res) => {
    const { nom, prenom, email, tel } = req.body
    
    const token = await generateToken(email)
    
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    //futureDate.setMinutes(now.getMinutes() + minutesToAdd);
    
    const eleve = new EleveModel({ nom, prenom, email, tel, token })
    await eleve.save()
    
    //await postEmail(req, res, nom, prenom, email, token)
    res.json({ eleve })
})

//delete all documents
app.delete('/delete', async (req, res) => {
    const delet = await EleveModel.deleteMany({});
    res.json('all decument deletedddd')
})

//+10 mintues route
const freeMinsMiddleware = async (req, res, next) => {    
    const token = req.headers.authorization
    if (!token || (token==="")) return res.json('pas de token freeMins')
    
    const payload = jwt.decode(token);
    if(!payload) return res.json('pas de token valid')
    
    req.userEmail = payload.id
    const email = payload.id

    //trouver eleve dans BD , msg s'il n'existe pas
    const eleve = await EleveModel.findOne({email})    
    if (!eleve) return res.json({message: 'Vous n\'êtes pas enregistré', token:"" })        
    const { freeMins, dateFreeMin } = eleve
    

    const now = new Date()    
    function timeStamp(d) {
        const time = d.getTime()
        return time
    }
    
    // ------------1   IS VALID Token
    if ((timeStamp(dateFreeMin) + 1000 * 60) > timeStamp(now)) {
        return res.json({ success: false, message: 'Token valid', token })
    }
    const date = new Date(dateFreeMin)
    
    // ------------2
    if (freeMins >= 3) {
        return res.json({ success: false, message: '3 fois 15 min', token })
    }
    
    console.log((timeStamp(now) - timeStamp(dateFreeMin)) > 2 * 60 * 1000)
    // ------------3   Same day 24H
    if (timeStamp(dateFreeMin) + 2 * 60 * 1000 > timeStamp(now)) {
        return res.json({ success: false, message: 'Attends 24h', token })
    }
    
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err && err.name === "TokenExpiredError") {
            next();
        }
    });
}

app.get('/freeMins', freeMinsMiddleware, async (req, res) => {
    
    if (!res.headersSent) {
        const token = await generateToken(req.userEmail)
        // --------- UPDATE DOCUMENT       
        const eleveUpdated = await EleveModel.findOneAndUpdate({ email: req.userEmail },
        {
            $inc: { freeMins: 1 },
            $set: {
                dateFreeMin: new Date(),
                token
            },
        },
        {
            new: true,
            runValidators: true
        })
        
        res.json({ message: 'new token', token, eleveUpdated })
    }
    
})



// Vérifier le nombre de freeMins pris
// const {freeMins, dateFreeMin} = await EleveModel.findOne({email})
// if(freeMins >=3) return res.json({message:'No more minutes',dateFreeMin})        


// //Verifier le temps écoulé entre Tokens
// const now = Date.now()
// const difference = Math.abs(now - dateFreeMin)
// const minutes = new Date(difference).getMinutes()
// if(minutes <= 2) return res.json('Il faut attendre 3min : ' + minutes +'mins');


// const eleve = await EleveModel.findOneAndUpdate(
//     {email},
//     {
//         $inc: { freeMins: 1 },
//         $set: { dateFreeMin: Date.now() },
//         $set: {token: generateToken(email) }
//     },
//     {
//         new: true,
//         runValidators: true 
//     }
// )

// res.json(eleve)

// }




// const myDate= dateFreeMin
// const minutes = new Date(myDate)
// const date = new Date(Date.now())



//const {freeMins,dateFreeMin} = updatedEleve
//res.json({freeMins,dateFreeMin})


// token
// Valid token
// expired token
// token email existent dans BD
// verifier nbr < 10
// 24h se sont écouolées après expiration token


//MIDDLEWARE : get EXO
const auth = async (req, res, next) => {
    // Bearer Token ???   
    //revoir la logie de ce middleware :
    // guest : no token
    // registred token
    // registred expire token
    // registred +10 times token
    // premium token
    
    // Verifier le role dans la BD
    // premium user : new collection ? OUI, copier user Data à la nouvelle collectinon
    
    
    const { authorization } = req.headers
    if (!authorization) {
        return res.json('accès interdit')
        //front : modal (créer compte)
    }
    
    try {
        const isValidToken = jwt.verify(authorization, SECRET_KEY)
        if (!isValidToken) return res.json('Votre session a pris fin.')
        req.user = authorization
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json('Le token a expiré, veuillez vous reconnecter.');
        } else {
            return res.status(401).json('Token invalide');
        }
    }
    req.authorization = authorization
    next()
}

app.get('/', auth, (req, res) => {
    const { exo } = req.query
    const data = prepareData(exo)
    res.json(data)
})

//Admin dashboard
app.post('/admin', () => {
    // verifier email et password dans BD
    // envoyer HTML template du dashboard avec data 
})

//DB connection
mongoose.connect(URL)
    .then(() => {
        console.log('Connexion à la base de données réussie !');
    })
    .catch(err => {
        //console.error('Erreur de connexion à la base de données :', err);
    });


app.listen('3000', () => {
    // console.log('Connected to server');    
})