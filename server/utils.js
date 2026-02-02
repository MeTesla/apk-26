const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
const config = require('./config/env')

// Generate TOKEN
function generateToken(email, expire) {
    return jwt.sign({ email }, config.SECRET_KEY, { expiresIn: `${expire}m` })
}

// postEmail
async function postEmail(req, nom, prenom, email, token, message = "", pageHtml = 'verifier-email',) {
    // Configuration du transporteur Nodemailer
    const transporter = nodemailer.createTransport({
        service: config.EMAIL_SERVICE,
        auth: {
            user: config.EMAIL_USER,
            pass: config.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false // Ignorer les erreurs de certificat
        }
    });
    //const { to, subject, text } = req.body;
    //<h1><a href="${config.CLIENT_URL}/verifier-email.html?token=${token}">Valider votre Email </a></h1>
    const client = config.CLIENT_URL
    const mailOptions = {
        from: config.EMAIL_USER,
        to: config.EMAIL_USER,
        subject: 'Mot de passe',
        html: `<div style="border: 1px solid gray;border-radius: 20px; width: 70%; margin: auto; padding: 50px;">
            <p style="font-size:1.2rem; "> Bonjour ${nom + ' ' + prenom}</p>
            <p style="font-size:1.2rem; "> votre Email : ${email}</p>
            <h2>${message}</h2>
            <h1><a href=${client}/${pageHtml}.html?token=${token}>Cliquez ici</a></h1>
            
            </div>`
    };

    return transporter.sendMail(mailOptions);
}

// server DB data
const { bamvf,
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
    djcvide } = require('./bd/data');

// prepare data
function prepareData(exo) {
    switch (exo) {
        case 'bamvf': return bamvf; break;
        case 'bamoeuvre': return bamoeuvre; break;
        case 'bamresume': return bamresume; break;
        case 'bamqcm': return bamqcm; break; //.slice(0,10)
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

module.exports = { postEmail, prepareData, generateToken }
