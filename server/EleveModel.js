const mongoose = require('mongoose')

const elevesSchema= new mongoose.Schema({
    nom :{type:String, require},
    prenom :{type: String, require},
    email:{type: String, require},
    tel :{type: String, require},
    
    token:{type: String},
    
    freeMins:{type: Number, default: 2},
    dateFreeMin:{type: Date,default: Date.now},
    
    role:{type: String},
    dateCreation: {type:Date, default: Date.now}
}) 

const EleveModel = mongoose.model('Eleve', elevesSchema)

module.exports=EleveModel
