const { postEmail, prepareData, generateToken } = require('./utils');
const express = require('express')
const mongoose = require('mongoose')

// const EleveModel = require('./models/EleveModel')

const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()

app.use(express.json())

// Routes
const router = require('./routes/routeEleve')


// Socket.IO
const { Server } = require('socket.io')
const http = require('http')
const server = http.createServer(app)

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
app.get('/admin/euduka/admin', (req, res) => {
    /*
    - envoyer form connexion ejs
        verifier email et password et répondre par True.
    - fetch dashboard
    */
    res.render('admin', { eleves: eleves });
});

const SECRET_KEY = 'mkljaz_çè(__j'
const URL = `mongodb+srv://pookarim:UJyLoPjoP0UjbruY@notesapp.prtaxaf.mongodb.net/test?ssl=true&authSource=admin&w=majority`

//delete all documents
app.delete('/delete', async (req, res) => {
    const delet = await EleveModel.deleteMany({});
    res.json('all decument deletedddd')
})

// BD connexion
// mongoose.connect(URL)
//     .then(() => {
//         console.log('Connexion à la base de données réussie !');
//     })
//     .catch(err => {
//         console.error('Erreur de connexion à la base de données :', err);
//     });

const url = '3000'
// const url='https://euduka.vercel.app'
server.listen(url, () => {
    console.log('Connected to server');
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