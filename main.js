const l=console.log
import { listeActDjc } from './djc/listeActDjc.js'
import {listeActAntigone} from './antigone/listeActAntigone.js'
import {listeAct} from './components/act/listeAct.js'
import {conic} from './utils.js'
import {qcmFigures} from './langue/figures/figures.js'
import {userSuggests} from './auth/login.js'
const loader=document.querySelector('.loader')
window.addEventListener("load", function () {
  loader.style.display="none";
  document.querySelector('.wrapper').style.display="block"
})
 
    //Token from url params
    // Récupérer le token de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

if (token) {
    // Enregistrer le token dans localStorage
    localStorage.setItem('jwtToken', token);
    console.log('Token enregistré dans localStorage');
}


// Nombre connexions
let nbrConnect
if(localStorage.getItem('nbrConnect')){
  nbrConnect= +(localStorage.getItem('nbrConnect')) + 1
  localStorage.setItem('nbrConnect', nbrConnect)
} else {
  nbrConnect=1
  localStorage.setItem('nbrConnect', nbrConnect)
}
if(nbrConnect==4){
  l('POP-UP : Vous êtes connecté ' + nbrConnect + ' foix')
  localStorage.removeItem('nbrConnect')
}
//nbrConnect=localStorage.setitem

// Conics
const notes = [5,2,7]
const conics=document.querySelector('.conics');
for(let i=0; i<3; i++){
  conics.appendChild(conic(notes[i]))
}

// Activités Oeuvres
const antigone = document.querySelector('.oeuvres-container .antigone')
const djc = document.querySelector('.oeuvres-container .djc')
const bam = document.querySelector('.oeuvres-container .bam')
const figure= document.querySelector('.figure')

bam.onclick=()=>{listeAct(document.body, 0)}
antigone.onclick=()=>{listeActAntigone(document.body, 0)}
djc.onclick=()=>{listeActDjc(document.body, 0)}
figure.onclick=()=>{qcmFigures(document.body)}

// Date examen
const mois = document.querySelector('.mois .chiffre')
const jours = document.querySelector('.jours .chiffre')
const heures = document.querySelector('.heures .chiffre')

const dateObjectif = "2026-05-26";
const tempsRestant = calculerTempsRestant(dateObjectif);

mois.innerHTML = tempsRestant.mois
jours.innerHTML = tempsRestant.jours
heures.innerHTML = tempsRestant.heures + 8

function calculerTempsRestant(dateDonnee) {
  // Convertir la date donnée en objet Date
  const dateObjectif = new Date(dateDonnee);

  // Obtenir la date actuelle
  const dateActuelle = new Date();

  // Calculer la différence de temps en millisecondes
  const differenceMillis = dateObjectif.getTime() - dateActuelle.getTime();

  // Calculer les mois, jours et heures
  const mois = Math.floor(differenceMillis / (1000 * 60 * 60 * 24 * 30));
  const jours = Math.floor((differenceMillis % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
  const heures = Math.floor((differenceMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  // Formatter le résultat
  return {mois: mois, jours: jours, heures: heures}//`${mois} : ${jours} : ${heures}`;
}


const nom= document.getElementById('nom')
const suggest= document.getElementById('suggest')
const envoyer=document.getElementById('btn-envoyer') 
envoyer.addEventListener('click', ()=>{ 
  if(!nom.value) {
    nom.style.border="2px solid red"
    setTimeout(() => {nom.style.border=""}, 1500);
    return
  }
  if(!suggest.value) {
    suggest.style.border="2px solid red"
    setTimeout(() => {suggest.style.border=""}, 1500);
    return
  }
  userSuggests(nom, suggest)    
})

