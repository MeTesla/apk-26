const express = require('express')
const mongoose = require('mongoose')
const EleveModel = require('./EleveModel')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
// helo

const { postEmail, prepareData } = require('./utils');

const SECRET_KEY = 'mkljaz_çè(__j'
const URL = `mongodb+srv://pookarim:UJyLoPjoP0UjbruY@notesapp.prtaxaf.mongodb.net/test?ssl=true&authSource=admin&w=majority`

// Generate TOKEN
const expire = 1
function generateToken(id) {
    return jwt.sign({ id }, SECRET_KEY, { expiresIn: `${expire}m` })
}

//-------Créer compte
app.post('/creer-compte', async (req, res) => {
    const { nom, prenom, email, tel } = req.body
    const eleveExists= await EleveModel.findOne({email}) 
    if(eleveExists) return res.json({message: 'Vous êtes avez déjà un compte !'})
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
    // const delet = await EleveModel.deleteMany({});
    // res.json('all decument deletedddd')
})

//+10 mintues route
const freeMinsMiddleware = async (req, res, next) => {    
    const token = req.headers.authorization
    if (!token || (token==="")) return res.json({succuss: false,
            titre: 'noToken',
            message: 'Un problème est survenu. Veuillez contacter l\'Administareur',        
        })
    console.log('un');
    
    
    const payload = jwt.decode(token);
    if(!payload) return res.json({success: false,
            titre: 'noPayload',
            message: 'Un problème est survenu. Veuillez contacter l\'Administareur',        
        })
    
       
    req.userEmail = payload.id
    const email = payload.id
        console.log('deux');
    //trouver eleve dans BD , msg s'il n'existe pas
    const eleve = await EleveModel.findOne({email})    
    if (!eleve) return res.json({succuss: false,
            titre: 'noEleve',
            message: 'Vous n\'avez pas de compte. Veuillez vous enregistrer !',
        })
    
    
    const { freeMins, dateFreeMin } = eleve
    
    const now = new Date()    
    function timeStamp(d) {
        const time = d.getTime()
        return time
    }
    
    // ------------1   IS VALID Token
    if ((timeStamp(dateFreeMin) + 1000 * 60) > timeStamp(now)) {
        return res.json({succuss: false,
            titre: 'validToken',
            message : 'Les 15 minutes ne sont pas encore écoulées !'
        })
    
    }
    const date = new Date(dateFreeMin)
    console.log('trois');
    // ------------2
    if (freeMins >= 3) {
        return res.json({success: false,
            titre: 'noMoreMins',
            message: 'Vous n\'avez plus de solde minutes. Passer Prmium',
            freeMins
        })    
    }
    
    // ------------3   Same day 24H
    if (timeStamp(dateFreeMin) + (2 * 60 * 1000) > timeStamp(now)) {
        return res.json({success: false,
            titre: 'waitDay',
            message: 'Vous devez attendre 24h avant d\'avoir des minutes gratuites',
            freeMins
        })
    }
    console.log('quatres');
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err && err.name === "TokenExpiredError") {
            next();
        }
    });
}

app.get('/freeMins', freeMinsMiddleware, async (req, res) => {
    console.log('cinq');
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
        
        return res.json({succuss: true,
            titre: 'Félicitation',
            message: 'Vous avez 15 minutes gratuites !',
            token,
            freeMins : eleveUpdated.freeMins
        })
    }    
})       

//MIDDLEWARE : get EXO
const auth = async (req, res, next) => {
    // Bearer Token ???   
    //revoir la logie de ce middleware :
    
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