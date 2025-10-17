//--------- ACTIVITIES 
import {lecteur} from '../components/act/lecteur.js' 
import {resume} from '../components/act/resume.js' 
import {qcm} from '../components/act/qcm.js'
import {remplirVide} from '../components/act/remplirVide.js'
import {vf} from '../components/act/vf.js'
import {ordreEvenements} from '../components/act/ordreEvenements.js'
import {ordrePhrases} from '../components/act/ordrePhrases.js'

// import { modalFreeMins } from '../components/misc/modals.js'
import { modalLokedContent } from '../components/misc/modals.js'

const url ='https://euduka.vercel.app/'
// const url ='http://localhost:3000/'
const vffData = async (exo)=>{
  const reponse = await fetch(url+`?exo=${exo}`,{
    headers:{
      "Content-Type":"application/json",
      authorization: localStorage.getItem('token')|| ''
    }
  })
  const data =await reponse.json() 
  if((!reponse.ok) || (data=="accès interdit")) return modalLokedContent()
  return data
}




const wrapper= document.querySelector('.wrapper')

export function listeActAntigone(bloc, num){
  document.body.style.overflow='hidden';
 const html=`<img class="index" src ="./assets/img/previous.svg"></svg>
 <div class="list">
   <li class="list-elements lst-lire">Lire la pièce</li>
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
 accueil.onclick=()=>{
  document.body.style.overflow='auto';
  listBlc.remove()
}

const lire=document.querySelector('.lst-lire')
 lire.onclick= async()=> {
  const  {oeuvre} = await vffData('antigoneoeuvre') || ''
  if(!oeuvre){return console.log('Vou n\être pas autorisé')}
  lecteur(wrapper, oeuvre)
  }
 
 const res=document.querySelector('.lst-resume')
 res.onclick= async()=> {
  const  {resumee} = await vffData('antigoneresume') || ''
  if(!resumee){return console.log('Vou n\être pas autorisé')}
  resume(wrapper, resumee)
  }
  
 const q=document.querySelector('.lst-qcm')
 q.onclick=async()=> {
  const  {qcmData} = await vffData('antigoneqcm') || ''
  if(!qcmData){return console.log('Vou n\être pas autorisé')}
  qcm(wrapper, qcmData)
  }
 
 const vide=document.querySelector('.lst-vide')
 vide.onclick= async()=> {
  const  {textesVide} = await vffData('antigonevide') || ''
  if(!textesVide){return console.log('Vou n\être pas autorisé')}
  remplirVide(wrapper, textesVide)
  }
 
 const vF=document.querySelector('.lst-vf')
 vF.onclick= async()=> {
  const  {antigonevf} = await vffData('antigonevf') || ''
  if(!antigonevf){return console.log('Vou n\être pas autorisé')}
  vf(wrapper, antigonevf)
  }
 
 const ordreEvents=document.querySelector('.lst-ordre-ev')
 ordreEvents.onclick=async()=> {
  const {ordreEventsData} = await vffData('antigoneordreev') || ''
  if(!ordreEventsData){return console.log('Vou n\être pas autorisé')}
  ordreEvenements(wrapper, ordreEventsData)
  }
  
 const ordrePh=document.querySelector('.lst-ordre-ph')
 ordrePh.onclick=async()=> {
  const {phrases} = await vffData('antigoneordreph') || ''
  if(!phrases){return console.log('Vou n\être pas autorisé')}
  ordrePhrases(wrapper, phrases)
  }


//  const lire=document.querySelector('.lst-lire')
//  lire.onclick=()=> {lecteur(wrapper,antigone)}
 
//  const res=document.querySelector('.lst-resume')
//  res.onclick=()=> {resume(wrapper,resumeAntigone)}
 
 
//  const q=document.querySelector('.lst-qcm')
//  q.onclick=()=>{qcm(wrapper, qcmData)}
 
//  const vide=document.querySelector('.lst-vide')
//  vide.onclick=()=>{remplirVide(wrapper, textesVide)}
 
//  const vF=document.querySelector('.lst-vf')
//  vF.onclick=()=>{vf(wrapper, vfData)}
 
//  const ordreEvents=document.querySelector('.lst-ordre-ev')
//  ordreEvents.onclick=()=>{ordreEvenements(wrapper, ordreEventsData)}
  
//  const ordrePh=document.querySelector('.lst-ordre-ph')
//  ordrePh.onclick=()=>{ordrePhrases(wrapper, phrases)}
}
