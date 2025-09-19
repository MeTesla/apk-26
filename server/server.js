const express = require('express')
const mongoose = require('mongoose')
const EleveModel = require('./EleveModel')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app=express()
app.use(cors())
app.use(express.json())


//const prepareData = require('./utils')
const {postEmail, prepareData} = require('./utils');

const SECRET_KEY='mkljaz_çè(__j'
const URL = `mongodb+srv://pookarim:UJyLoPjoP0UjbruY@notesapp.prtaxaf.mongodb.net/test?ssl=true&authSource=admin&w=majority`

// Generate TOKEN
const expire = 1
function generateToken(id){
    return jwt.sign({id}, SECRET_KEY,{expiresIn:`${expire}m`})
} 

//-------Créer compte
// Ce route doit uniquement renvoyer un token de 10 minutes.
// +10min est un autre route qui vérifie le token et l'expiration et les nbr tokens
app.post('/creer-compte', async(req, res)=>{
    const {nom, prenom, email, tel}=req.body
       
    const token= await generateToken(email)
    
    const today= new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    //futureDate.setMinutes(now.getMinutes() + minutesToAdd);
    
    const eleve = new EleveModel({nom, prenom, email, tel, token})
    await eleve.save()

    //await postEmail(req, res, nom, prenom, email, token)
    res.json({eleve})
})

//delete all documents
app.delete('/delete', async(req, res)=>{
    //const delet = await EleveModel.deleteMany({});
    res.json('all decument deletedddd')
})

//+10 mintues route
const freeMinsMiddleware = async(req, res, next)=>{
    // Gérer le cas où le token n'a pas expiré (frontend|| backend)
    const token = req.headers.authorization
    if(!token) return res.json('pas de token +dix min requête')
    
    const payload = jwt.decode(token);
    req.userEmail = payload.id
        
    //trouver eleve dans BD , msg s'il n'existe pas
    const email = payload.id
    const {freeMins, dateFreeMin} = await EleveModel.findOne({email})
    const now= new Date()
    function timeStamp(d){
        // const date = new Date(d)
        const time = d.getTime()
        return time
    }
    //console.log('function : ' + timeStamp(dateFreeMin));
    console.log(timeStamp(dateFreeMin) - timeStamp(now))
    
    
    // ------------1    VALID
    if((timeStamp(dateFreeMin) + 1000*60*2) < timeStamp(now) ){ // > >  <<
        // console.log('1-VALID-----' +dateFreeMin > now + ' ' + now + ' ' + dateFreeMin);
        return res.json({success:false,message:'Token valid', token})        
    }
    console.log(dateFreeMin > now );
    const date = new Date(dateFreeMin)
    console.log('heures : ' + date.getHours() + ' | minutes : '+ date.getMinutes() )
    // dateFreeMin : 3     token time
    // now         : 5

    
    // ------------2    3 FOIS
    if(freeMins >= 11){ 
        
        return res.json({success:false,message:'3 fois 15 min', token})
    }    
    
    
    // ------------3    24H
    if((now - dateFreeMin) < 60*1000){ // Attendez 24H
        
        return res.json({success:false,message:'Attends 24h', token})
    }
    
    
    /* verifier : role, countFreeMins , dateFreeMins
        role : JE VAIS PAS TRAITER PREMIUM ICI        
    */

    jwt.verify(token, SECRET_KEY , (err, user) => {
        if (err && err.name==="TokenExpiredError"){              
            next();            
        }
    });
} 

app.get('/freeMins',freeMinsMiddleware,async (req, res)=>{
    
    if(!res.headersSent){
        const token = await generateToken(req.userEmail)
        // --------- UPDATE DOCUMENT       
        const eleveUpdated = await EleveModel.findOneAndUpdate(
            {email:req.userEmail},
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
            }
        )
        
        res.json({message :'new token',token, eleveUpdated})
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
    //console.log(minutes, date);
    


    //const {freeMins,dateFreeMin} = updatedEleve
    //res.json({freeMins,dateFreeMin})
    

    // token
    // Valid token
    // expired token
    // token email existent dans BD
    // verifier nbr < 10
    // 24h se sont écouolées après expiration token


//MIDDLEWARE : get EXO
const auth = async(req, res, next)=>{
    // Bearer Token ???   
    //revoir la logie de ce middleware :
        // guest : no token
        // registred token
        // registred expire token
        // registred +10 times token
        // premium token

        // Verifier le role dans la BD
        // premium user : new collection ? OUI, copier user Data à la nouvelle collectinon
             
    
    const {authorization} = req.headers    
    if(!authorization) {
        // console.log('Authorization non accordée');
        return res.json('accès interdit')
        //front : modal (créer compte)
    }

        try {
        const isValidToken = jwt.verify(authorization, SECRET_KEY)
            if(!isValidToken) return res.json('Votre session a pris fin.')
            req.user = authorization  
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json('Le token a expiré, veuillez vous reconnecter.');
            } else {
                return res.status(401).json('Token invalide');
            }
        }
    req.authorization=authorization
    next()
}

app.get('/', auth, (req, res)=>{
    const {exo}=req.query       
    const data = prepareData(exo)
    res.json(data)
})

//Admin dashboard
app.post('/admin',()=>{
    // verifier email et password dans BD
    // envoyer HTML template du dashboard avec data 
})

//DB connection
mongoose.connect(URL)
    .then(() => {
        console.log('Connexion à la base de données réussie !');
    })
    .catch(err => {
        // console.error('Erreur de connexion à la base de données :', err);
    });


app.listen('3000',()=>{
    // console.log('Connected to server');    
})