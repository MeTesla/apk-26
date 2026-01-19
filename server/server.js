const { postEmail, prepareData, generateToken } = require('./utils');
const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/env')

// const EleveModel = require('./models/EleveModel')

const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()

app.use(express.json())

// Routes
const router = require('./routes/routeEleve')
const firebaseRouter = require('./routes/firebaseRoutes')


// Socket.IO
const { Server } = require('socket.io')
const http = require('http');
const EleveModel = require('./models/EleveModel');
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: config.CORS_ORIGINS
    }
})
app.use(cors({
    origin: config.CORS_ORIGINS
}))

app.use('/', router)
app.use('/api/firebase', firebaseRouter)


// Test EJS HTML engine.
app.set('view engine', 'ejs');
const eleves = [
    { nom: 'Dupont', prenom: 'Jean', age: 20 },
    { nom: 'Martin', prenom: 'Sophie', age: 22 },
    { nom: 'Tremblay', prenom: 'Julien', age: 19 },
];

// Route admin
app.post('/admin/euduka/admin', async (req, res) => {
    const { email, password } = req.body
    if (email == "a" && password == "a") {
        // return res.render('admin', { eleves: eleves });
        const reponse = await EleveModel.find({})
        return res.json({
            success: true,
            message: 'data sent',
            data: reponse
        })
    } else {
        return res.json({
            success: false,
            message: 'Email ou mot de passe incorrect'
        })
    }
    /*
    - envoyer form connexion ejs
        verifier email et password et répondre par True.
    - fetch dashboard
    */
});

//delete all documents
app.delete('/delete', async (req, res) => {
    const delet = await EleveModel.deleteMany({});
    res.json('all decument deletedddd')
})

// BD connexion
mongoose.connect(config.MONGODB_URL)
    .then(() => {
        console.log('Connexion à la base de données réussie !');
    })
    .catch(err => {
        console.error('Erreur de connexion à la base de données :', err);
    });

// const url='https://euduka.vercel.app'
server.listen(config.PORT, () => {
    console.log(`✅ Server listening on port ${config.PORT}`);
})


// websocket
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