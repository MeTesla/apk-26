const express = require('express')
const mongoose = require('mongoose')
const EleveModel = require('./EleveModel')
const jwt = require('jsonwebtoken') 
const cors = require('cors')
const app = express()
app.use(cors({
    // ne pas mettre '/' à la fin de l'origine
    origin: ['http://127.0.0.1:5500', 'http://localhost:3000',
        'https://euduka.vercel.app', 'https://euduka.page.gd',
        'http://localhost:5500'
    ] 
}))
app.use(express.json())

const { postEmail, prepareData } = require('./utils');

const SECRET_KEY = 'mkljaz_çè(__j'
const URL = `mongodb+srv://pookarim:UJyLoPjoP0UjbruY@notesapp.prtaxaf.mongodb.net/test?ssl=true&authSource=admin&w=majority`

// Generate TOKEN

function generateToken(email, expire) {
    return jwt.sign({ email }, SECRET_KEY, { expiresIn: `${expire}m` })
}

//-------Créer compte
app.post('/creer-compte', async (req, res) => {
    const { nom, prenom, email, tel } = req.body
    if(!nom || !prenom|| !email || !tel) return res.json({
        success: false,
        titre:'infoManquantes',
        message: 'Tous les champs sont obligatoires',
    })
    const eleveExists= await EleveModel.findOne({email}) 
    if(eleveExists) return res.json({success:false, 
        titre: 'compteExiste',
        message: 'Vous êtes avez déjà un compte !'})
    
    
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    //futureDate.setMinutes(now.getMinutes() + minutesToAdd);
    const token = await generateToken(email,30)
    const eleve = new EleveModel({ nom, prenom, email, tel, role:'attenteR', token})
    await eleve.save()
    
    await postEmail(req, res, nom, prenom, email, token)
    return res.json({
        success: true,
        titre:"attenteR",
        role: eleve.role,
        message: "Un mail vous a été envoyés. Pour finaliser votre inscription cliquez sur le lien du mail."
    })
    //Envoyer email de vérification
    //Ne pas envoyer de minutes.
    // return res.json({ success :true, titre:'registred',
    //     message: 'Vous avez créé un compte. Vous gagnez 15 min par jour 5 fois',
    //     token,
    //     eleve
    //  })
})

// Vérifier email
app.post('/verifier-email', async(req,res)=>{
    const {token}= req.body

    const eleve = await EleveModel.findOne({token})

    if(!eleve) return res.json({
        succuss: false,
        message: 'Un problème est survenu'
    })

    if(eleve.token == token){
        res.json({success : true, message: 'exist', eleve, token:generateToken(eleve.email, 1)})    
    }
})

//delete all documents
app.delete('/delete', async (req, res) => {
    const delet = await EleveModel.deleteMany({});
    res.json('all decument deletedddd')
})

// Verify email
app.get('/verify-email',(req, res)=>{
   
})

//+10 mintues Middleware & route
const freeMinsMiddleware = async (req, res, next) => {    
    const token = req.headers.authorization
    console.log('tok' + token);
    
    if (!token || (token==="")) return res.json({success: false,
            titre: 'noToken',
            message: 'Un problème est survenu. Veuillez contacter l\'Administareur',        
        })    
    console.log('1');
    
    const payload = jwt.decode(token);
    if(!payload) return res.json({success: false,
            titre: 'noPayload',
            message: 'Un problème est survenu. Veuillez contacter l\'Administareur',        
        })
    console.log('2');   
    req.userEmail = payload.email
    console.log(payload.email);
    
    const email = payload.email
    const eleve = await EleveModel.findOne({email})    
    if (!eleve) return res.json({success: false,
            titre: 'noEleve',
            message: 'Vous n\'avez pas de compte. Veuillez vous enregistrer !',
        })
    
    console.log('3');
    const { freeMins, dateFreeMin } = eleve
    
    const now = new Date()    
    function timeStamp(d) {
        const time = d.getTime()
        return time
    }
    
    // ------------1   IS VALID Token
    if ((timeStamp(dateFreeMin) + 1000 * 60) > timeStamp(now)) {
        return res.json({success: false,
            titre: 'validToken',
            message : 'Les 15 minutes ne sont pas encore écoulées !'
        })
    
    }
    const date = new Date(dateFreeMin)
    console.log('4');
    // ------------2
    if (freeMins <= 0) {
        return res.json({success: false,
            titre: 'noMoreMins',
            message: 'Vous n\'avez plus de solde minutes. Passer Prmium',
            freeMins
        })    
    }
    console.log('5');
    // ------------3   Same day 24H
    if (timeStamp(dateFreeMin) + (2 * 60 * 1000) > timeStamp(now)) {
        return res.json({success: false,
            titre: 'waitDay',
            message: 'Vous devez attendre 24h avant d\'avoir des minutes gratuites',
            freeMins
        })
    }
    console.log('6');
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err && err.name === "TokenExpiredError") {
            next();
        }
    });
}

app.get('/freeMins', freeMinsMiddleware, async (req, res) => {
    console.log('7');
    console.log(req.userEmail);
    
    if (!res.headersSent) {
        const token = await generateToken(req.userEmail, 1)
        // --------- UPDATE DOCUMENT       
        const eleveUpdated = await EleveModel.findOneAndUpdate({ email: req.userEmail },
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
        
        return res.json({success: true,
            titre: 'Félicitation',
            message: 'Vous avez 15 minutes gratuites !',
            token,
            eleveUpdated
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
    const {exo} = req.query
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
 
//
const url='3000'
// const url='https://euduka.vercel.app'
app.listen(url, () => {
    console.log('Connected to server');    
})