const express = require('express')
const mongoose = require('mongoose')

const EleveModel = require('./EleveModel')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()


// New: Import Socket.IO
const { Server } = require('socket.io')
const http = require('http')

// Create HTTP server and attach Express
const server = http.createServer(app)

// New: Initialize Socket.IO with the HTTP server
const io = new Server(server, {
    cors: {
        origin: ['http://127.0.0.1:5500', 'http://localhost:3000',
            'https://euduka.vercel.app', 'https://euduka.page.gd',
            'http://localhost:5500'
        ]
    }
})


app.use(cors({
    // ne pas mettre '/' à la fin de l'origine
    origin: ['http://127.0.0.1:5500', 'http://localhost:3000',
        'https://euduka.vercel.app', 'https://euduka.page.gd',
        'http://localhost:5500'
    ]
}))
app.use(express.json())


const { postEmail, prepareData } = require('./utils');

// ----------------------------------
// Configuration de EJS comme moteur de template
app.set('view engine', 'ejs');
// Exemple de données des élèves
const eleves = [
    { nom: 'Dupont', prenom: 'Jean', age: 20 },
    { nom: 'Martin', prenom: 'Sophie', age: 22 },
    { nom: 'Tremblay', prenom: 'Julien', age: 19 },
];

// Route pour l'admin
app.get('/admin', (req, res) => {
    /*
        1- chercher les élèves dans la BDD
        2- inclure les données dans le template EJS
    */
    res.render('admin', { eleves: eleves });
});
// ----------------------------------




const SECRET_KEY = 'mkljaz_çè(__j'
const URL = `mongodb+srv://pookarim:UJyLoPjoP0UjbruY@notesapp.prtaxaf.mongodb.net/test?ssl=true&authSource=admin&w=majority`
//visual studio code : mongodb+srv://pookarim:UJyLoPjoP0UjbruY@notesapp.prtaxaf.mongodb.net/
// Generate TOKEN

function generateToken(email, expire) {
    return jwt.sign({ email }, SECRET_KEY, { expiresIn: `${expire}m` })
}

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

//-------Créer compte
app.post('/creer-compte', async (req, res) => {
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

})

//-------Login----------------
app.post('/login', async (req, res) => {


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
        if (eleve.role === 'attenteR') return res.json({
            success: false,
            message: 'Votre compte n\'est pas encore activé. Veuillez vérifier votre email !'
        })
        // if(eleve.password !== password) return res.json({
        //     success: false,
        //     message: 'Mot de passe incorrect'
        // })

        return res.json({ eleve, success: true, titre: eleve.role })
        console.log(eleve);

    } catch (error) {
        res.json({ success: false, message: 'Erreur serveur. Veuillez réessayer plus tard' })
    }
})

// Vérifier email
app.post('/verifier-email', async (req, res) => {
    //AJOUTER : Votre compte est déjà actié. ne rien faire.
    const { token } = req.body
    console.log(token)
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.json({
                // navigateur: envoyer role:''
                success: false,
                role: 'attenteR',
                message: 'Le lien de vérification a expiré ou est invalide.'
            })
        }
    })

    const eleve = await EleveModel.findOne({ token })

    if (!eleve) return res.json({
        succuss: false,
        message: 'Un problème est survenu : il n\'y apas d\'eleve de ce nom'
    })

    if (eleve.token == token) {
        const eleveUpdated = await EleveModel.findOneAndUpdate({ token },
            { $set: { role: 'registred' } },
            {
                new: true,
                runValidators: true
            })

        return res.json({
            success: true,
            message: 'exist',
            eleveUpdated,
            token: generateToken(eleve.email, 10)
        })
    } else {
        return res.json({
            succuess: false,
            message: 'Une erreur s\'était produite. Veuillez contacter l\'admin'
        })
    }

})

// Update resultats
app.post('/update-resultats', auth, async (req, res) => {
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
        io.to(eleve._id.toString()).emit('notification', { message: 'Votre score a été mis à jour', score: result.score || result })


        res.json({ eleve, success: true })


    } catch (error) {
        res.json({
            success: false,
            message: 'Erreur serveur. Veuillez réessayer plus tard' + error.message
        })

    }
})


//delete all documents
app.delete('/delete', async (req, res) => {
    const delet = await EleveModel.deleteMany({});
    res.json('all decument deletedddd')
})

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

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err && err.name === "TokenExpiredError") {
            next();
        }
    });
}

app.get('/freeMins', freeMinsMiddleware, async (req, res) => {

    if (!res.headersSent) {
        const token = await generateToken(req.userEmail, 10) // token valide 10 minutes
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

        return res.json({
            success: true,
            titre: 'Félicitation',
            message: 'Vous avez 15 minutes gratuites !',
            token,
            eleveUpdated
        })
    }
})



app.get('/', auth, (req, res) => {
    const { exo } = req.query
    const data = prepareData(exo)
    res.json(data)
})

//Admin dashboard
// app.post('/admin', () => {
//     /*
//         1- envoyer HTML template de login page admin (password)
//         2- verifier password
//         3- envoyer HTML template du dashboard admin avec data (list des eleves, stats, etc)

//     */

// })

// <script src="https://cdn.socket.io/4.0.0/socket.io.min.js"></script>


//DB connection
mongoose.connect(URL)
    .then(() => {
        console.log('Connexion à la base de données réussie !');
    })
    .catch(err => {
        console.error('Erreur de connexion à la base de données :', err);
    });

// Dell
const url = '3000'
// const url='https://euduka.vercel.app'
server.listen(url, () => {
    console.log('Connected to server');
})


// websocket

// New: Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id)

    // Example: Listen for a custom event from client (e.g., join a room based on user ID)
    socket.on('join', (userId) => {
        socket.join(userId)  // Join a room for targeted notifications
    })

    // Example: Send a notification to a specific user
    socket.on('send-notification', (data) => {
        // Emit to the user's room
        io.to(data.userId).emit('notification', { message: data.message, score: data.score })
    })

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id)
    })
})
