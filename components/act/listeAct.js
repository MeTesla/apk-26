//--------- ACTIVITIES 
import {lecteur} from './lecteur.js' 
import {resume} from './resume.js' 
import {qcm} from './qcm.js'
import {remplirVide} from './remplirVide.js'
import {vf} from './vf.js'
import {ordreEvenements} from './ordreEvenements.js'
import {ordrePhrases} from './ordrePhrases.js'
 
function toast(msg) {
  Toastify({
    text: msg,
    className: "toast-id",
    position: "center",
    close: true
  }).showToast();
}
const serveur ='http://localhost:3000/'

const vffData = async (exo)=>{
  const reponse = await fetch(serveur+`?exo=${exo}`,{
    headers:{
      "Content-Type":"application/json",
      authorization: localStorage.getItem('token') || ''
    }
  })
  const data =await reponse.json()
  if(data =='Le token a expiré, veuillez vous reconnecter.') {
    
    toast("Vous n'êtes pas autorisé !!");
    return 
  }
  
  return data
}

const wrapper= document.querySelector('.wrapper')

export function listeAct(bloc){
  const html=`<img class="index" src ="./assets/img/previous.svg"></svg>
  <div class="list">
  <li class="list-elements lst-lire">Lire le roman</li>
  <li class="list-elements lst-resume">Résumé</li>
  <li class="list-elements lst-vf" >Vrai-Faux</li>
  <li class="list-elements lst-qcm">QCM</li>
  <li class="list-elements lst-ordre-ph">Mettre en ordre des phrases</li>
  <li class="list-elements lst-ordre-ev">Mettre en ordre des évènements</li>
  <li class="list-elements lst-vide">Remplir le vide</li>
  </div>`
  
  const activites=document.createElement('ul')
  activites.innerHTML=html
  activites.classList.add('liste-act')
  bloc.appendChild(activites)
  
  // Afficher la page d'accueil
  const accueil=document.querySelector('.index')
  const listBlc=document.querySelector('.liste-act')
  
  accueil.onclick=()=> listBlc.remove()
    
  const lire=document.querySelector('.lst-lire')
  lire.onclick= async()=> {
    const  {oeuvre} = await vffData('bamoeuvre')||''
    if(!oeuvre){
      return toast("Token invalid. Penser à passer Premium")
    }
    lecteur(wrapper, oeuvre)
    }
  
  const res=document.querySelector('.lst-resume')
  res.onclick= async()=> {
    const  {resumee} = await vffData('bamresume') 
    if(!resumee){return console.log('Vou n\êtes pas autorisé')}
    resume(wrapper, resumee)
    }
    
  const q=document.querySelector('.lst-qcm')
  q.onclick=async()=> {
    const  {qcmData} = await vffData('bamqcm') 
    if(!qcmData){return console.log('Vou n\être pas autorisé')}
    qcm(wrapper, qcmData)
    }
  
  const vide=document.querySelector('.lst-vide')
  vide.onclick= async()=> {
    const  {textesVide} = await vffData('bamvide') 
    if(!textesVide){return console.log('Vou n\être pas autorisé')}
    remplirVide(wrapper, textesVide)
    }
  
  const vF=document.querySelector('.lst-vf')
  vF.onclick= async()=> {
    const  {bamvf} = await vffData('bamvf') 
    if(!bamvf){return console.log('Vou n\être pas autorisé')}
    vf(wrapper, bamvf)
    }
  
  const ordreEvents=document.querySelector('.lst-ordre-ev')
  ordreEvents.onclick=async()=> {
    const {ordreEventsData} = await vffData('bamordreev') 
    if(!ordreEventsData){return console.log('Vou n\être pas autorisé')}
    ordreEvenements(wrapper, ordreEventsData)
    }
    
  const ordrePh=document.querySelector('.lst-ordre-ph')
  ordrePh.onclick=async()=> {
    const {phrases} = await vffData('bamordreph') 
    if(!phrases){return console.log('Vou n\être pas autorisé')}
    ordrePhrases(wrapper, phrases)
  }
}
