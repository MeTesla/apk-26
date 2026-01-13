const { postEmail, prepareData, generateToken } = require('./utils');
const express = require('express')
const mongoose = require('mongoose')

const EleveModel = require('./models/EleveModel')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()

app.use(express.json())
// Middlewares
const auth = require('./middlewares/auth')
const freeMinsMiddleware = require('./middlewares/freeMinsMiddleware')

// Routes
const router = require('./routes/routeEleve')




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

app.use('/', router)


// Test EJS HTML engine.
app.set('view engine', 'ejs');
const eleves = [
    { nom: 'Dupont', prenom: 'Jean', age: 20 },
    { nom: 'Martin', prenom: 'Sophie', age: 22 },
    { nom: 'Tremblay', prenom: 'Julien', age: 19 },
];

// Route admin
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

//-------Créer compte
// app.post('/creer-compte', async (req, res) => {
//     const { nom, prenom, email, tel } = req.body
//     if (!nom || !prenom || !email || !tel) return res.json({
//         success: false,
//         titre: 'infoManquantes',
//         message: 'Tous les champs sont obligatoires',
//     })
//     const eleveExists = await EleveModel.findOne({ email })
//     if (eleveExists) return res.json({
//         success: false,
//         titre: 'compteExiste',
//         message: 'Vous êtes avez déjà un compte !'
//     })


//     const today = new Date()
//     const tomorrow = new Date(today)
//     tomorrow.setDate(today.getDate() + 1)

//     const token = await generateToken(email, 1) // token valide 3 jours
//     const eleve = new EleveModel({ nom, prenom, email, tel, role: 'attenteR', token })
//     await eleve.save()

//     await postEmail(req, res, nom, prenom, email, token)
//     return res.json({
//         success: true,
//         titre: "attenteR",
//         role: eleve.role,
//         message: "Un mail vous a été envoyés. Pour finaliser votre inscription cliquez sur le lien du mail."
//     })
//     // => token creer comte == token verifier
// })

// Vérifier email
app.post('/verifier-email', async (req, res) => {
    //AJOUTER : Votre compte est déjà activé. ne rien faire.
    const { token } = req.body
    console.log(token)
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.json({
                // navigateur: envoyer role:''
                success: false,
                role: 'attenteR',
                message: 'Le lien de vérification a expiré ou il est invalide.'
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
        // io.to(eleve._id.toString()).emit('notification', { message: 'Votre score a été mis à jour', score: result.score || result })


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

const url = '3000'
// const url='https://euduka.vercel.app'
server.listen(url, () => {
    console.log('Connected to server');
})


// websocket

// Fonction pour envoyer une liste
const djcvf = [
    { 'question': `Maupassant est un écrivain du 20ème siècle`, 'rep': 'Faux' },
    { 'question': `Victor Hugo est un écrivain du 19ème siècle`, 'rep': 'Vrai' },
    { 'question': `Le dernier jour d'un condamné est paru en 1929`, 'rep': 'Faux' },
    { 'question': `Le dernier jour d'un condamné est paru en 1829`, 'rep': 'Vrai' },
    { 'question': `Le dernier jour d'un condamné est un roman autobiographique`, 'rep': 'Faux' },
    { 'question': `Le dernier jour d'un condamné est un journal intime`, 'rep': 'Faux' },
    { 'question': `Le dernier jour d'un condamné est un roman à thèse`, 'rep': 'Vrai' },
    { 'question': `Le narrateur dans le dernier jour d'un condamné est un condamné à mort`, 'rep': 'Vrai' },
    { 'question': `Le narrateur dans le dernier jour d'un condamné est Victor Hugo`, 'rep': 'Faux' },
    { 'question': `Le dernier jour d'un condamné est contre la peine de mort.`, 'rep': 'Faux' },
    { 'question': `La thse dfendue dans Le dernier jour dun condamné est labolition de la peine de mort`, 'rep': 'Faux' },
    { 'question': `Le condamné du roman est condamné aux travaux forcés.`, 'rep': 'Faux' }
]

setInterval(() => io.emit('liste', djcvf), 4000)