const nodemailer = require('nodemailer');
const {bamvf,
bamoeuvre,
bamresume,
bamqcm,
bamordreph,
bamordreev,
bamvide,
antigonevf,
antigoneoeuvre,
antigoneresume,
antigoneqcm,
antigoneordreph,
antigoneordreev,
antigonevide,
djcvf,
djcoeuvre,
djcresume,
djcqcm,
djcordreph,
djcordreev,
djcvide} = require('./bd/data');

async function postEmail(req, res, token){
    // Configuration du transporteur Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail', // ou un autre service de messagerie
        auth: {
            user: 'pookarim@gmail.com', // votre adresse email
            pass: 'ynsl tthr kcoq hpdg' // votre mot de passe ou un mot de passe d'application
        },
        tls: {
            rejectUnauthorized: false // Ignorer les erreurs de certificat
        } 
    });
    //const { to, subject, text } = req.body;
    const mailOptions = {
        from: 'pookarim@gmail.com',
        to: 'euduka.fr@gmail.com',
        subject: 'Mot de passe',
            html: `<p style="font-size:1.2rem; "> Copier ce code et coller le dans la case dédiée :</p>
            <h2 style="text-align: center"> ${token} </h2>
            <h4> Voir cette vidéo pour savoir comment faire </h4>
            <a href="https://www.youtube.com/watch?v=1bH_ukYn81c">Cliquer ici</a>`
    };
    
    return transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email envoyé');
    });
}

function prepareData(exo){
    switch (exo) {
        case 'bamvf': return bamvf; break;    
        case 'bamoeuvre': return bamoeuvre; break;
        case 'bamresume': return bamresume; break;
        case 'bamqcm': return bamqcm; break;        
        case 'bamordreph': return bamordreph; break;        
        case 'bamordreev': return bamordreev; break;        
        case 'bamvide': return bamvide; break;  

        case 'antigonevf': return antigonevf; break;    
        case 'antigoneoeuvre': return antigoneoeuvre; break;
        case 'antigoneresume': return antigoneresume; break;
        case 'antigoneqcm': return antigoneqcm; break;        
        case 'antigoneordreph': return antigoneordreph; break;        
        case 'antigoneordreev': return antigoneordreev; break;        
        case 'antigonevide': return antigonevide; break;                
        
        case 'djcvf': return djcvf; break;    
        case 'djcoeuvre': return djcoeuvre; break;
        case 'djcresume': return djcresume; break;
        case 'djcqcm': return djcqcm; break;        
        case 'djcordreph': return djcordreph; break;        
        case 'djcordreev': return djcordreev; break;        
        case 'djcvide': return djcvide; break;        
        
        
        default:
            break;
    }
}
module.exports={postEmail, prepareData}