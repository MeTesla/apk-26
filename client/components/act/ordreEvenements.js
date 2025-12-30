
//import {accueil} from '../../scripts/main.js'
//import confetti from 'https://cdn.skypack.dev/canvas-confetti';
import { closeAct, homeAct } from '../misc/closeAct.js'
import { entete } from '../misc/entete.js';
/*
App's logic
1- créer un nombre de div équivalent au nombre de phrases
    dans le tableau des phrase 3 4 5 max
2-leur attribué les phrases , class, id
3 calculer height of Drag et attribuer cette valeur à Drop

! - penser a l'animation des phrases au déplacement.
! problème getboudingclientrect().top n'a pas donné le resultat attendu
    j'ai dû utiliser flex avec une marge
! probleme (for of) : j'ai utilisé FOR
! problem comparaison of two arrays / résolut: convert arrays toString() and compare them
! j'ai réussi mon algo de randomiser
*/ 
const l=console.log

export function ordreEvenements(bloc,data) {
  const div = document.createElement('div');
  div.classList.add('ordre-events');
  div.innerHTML = code();
  bloc.appendChild(div);
  
  // Home & Close buttons 
  const home = document.querySelector('.home')
  home.onclick = () => { homeAct(div) }
  const close = document.querySelector('.close')
  close.onclick = () => { closeAct(div); }

  const container =document.querySelector('.container');
  let drag = document.querySelector('.drag')
  let drop = document.querySelector('.drop')
  let verifier = document.querySelector('.valider')
  let resultat = document.querySelector('.resultat')
  let message = document.querySelector('.message')
  let bnRep = document.querySelector('.bn-rep')
  let voirRep = document.querySelector('.voir-rep')
  let suivant = document.querySelector('.ph-suivante')
  //let refaire = document.querySelector('.refaire')
  let index = 0, nbrEvents= 5, initOneChapEvents=[], oneChapEvents=[]
  let phrasesIndexes=[], sortedPhrasesIndexes=[], dropedPhrases=[]

loadQuestion()
function loadQuestion() {
  const sortedData=[...data]
  sortedData.sort(function(a,b){return 0.5 - Math.random()})
  for(let i=0; i<3; i++){
    oneChapEvents.push(sortedData[i])
    phrasesIndexes.push(data.indexOf(sortedData[i]))
  }
  
  sortedPhrasesIndexes = [...phrasesIndexes]
  sortedPhrasesIndexes.sort(function(a, b){return a - b})
  
  initOneChapEvents = [...oneChapEvents] // Pour la correction
  
  //oneChapEvents.sort(function(a,b){return 0.5 - Math.random()})  
  // créer des div au nombre de phrases
  for (let i = 0; i < oneChapEvents.length; i++) {
    const div = document.createElement('div')
    div.setAttribute('class', 'phrase')
    div.dataset.order=phrasesIndexes[i]
    div.innerHTML = oneChapEvents[i]
    drag.appendChild(div)
    
    div.addEventListener('click', (ev) => {
      if (div.parentElement == drag) {
        div.classList.add("li")
        drop.append(div)
      } else {
        div.classList.remove('li')
        drag.appendChild(div)
      }
    })
  }  
  drop.style.height = drag.getBoundingClientRect().height + 'px'

}


  // boutton verifier
verifier.addEventListener('click', ()=>{
  if (!drop.hasChildNodes()) return
  resultat.style.bottom = "0"
  
  //praparer le tableau des réponses
  
  for (let i=0; i<drop.childNodes.length;i++){
      dropedPhrases.push(drop.childNodes[i].dataset.order)
  }
  
  
  if (dropedPhrases.toString()==sortedPhrasesIndexes.toString()){   
    l(dropedPhrases.toString(),sortedPhrasesIndexes.toString()) 
    message.innerText = "C'est correct"
    voirRep.style.display="none" 
  } else{
     voirRep.style.display="block"     
     message.innerText = "C'est incorrect !"
     bnRep.style.display="none"
     
     // AFFICHER LA BONNE REPONSE
     sortedPhrasesIndexes.forEach((el,i)=>{
       const div=document.createElement('div')
       div.classList='phrase'
       div.innerText=data[sortedPhrasesIndexes[i]]
       bnRep.appendChild(div)
     })
  }

})

voirRep.onclick = () => {
  bnRep.style.display = "block"
  voirRep.style.display = "none"
  message.innerHTML = "" // .display="non"
}
//boutton suviant
suivant.addEventListener('click', () => {
  if(index < nbrEvents){
    index += 1
    reinitialiser()
  } else{
    resultat.style.bottom = "0"
    resultat.innerHTML=`<h1 style="color: var(--comp)">FIN de session</h1>`      
  }
  // Le prob prevenait de l'integration du click sur suivant dans la fonction click verifier
  // Peut être c'est l'effet buble
  
  
})
//Refaire
/*refaire.addEventListener('click', () => {
  //reinitialiser()
})
*/

function reinitialiser(re){
  bnRep.innerHTML=""
  drag.innerHTML=""
  drop.innerHTML=""
  initOneChapEvents=[]
  oneChapEvents=[]
  phrasesIndexes=[]
  sortedPhrasesIndexes=[]
  dropedPhrases=[]
  resultat.style.bottom = "-100vh" //display="none"//resultat.remove()
  loadQuestion()
}

function code(){
    const html=`${entete()}
    <div class="consigne">
      Je mets en ordre les évènements du chapitre.
    </div>
    
    <div class="drag-drop">
         <div class="drop"></div>
         <div class="drag"></div>
    </div>
    
    <div class="valider">Vérifier </div>
    
    <div class="resultat">
      <div class="res-cont"> 
        <div class="message"></div>
        <div class="bn-rep"> </div>
        <div class="ph-options">  
          <div class="ph-suivante"> Suivant </div>
          <div class="voir-rep"> Voir la réponse </div>
        </div>  
      </div>
    </div>
    
    <style>
 .drag-drop{
   flex-basis: 80%;
   width: 95%;
   margin: auto;
  }

.drag, .drop{
  border: 1px solid grey;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 10px;
  margin-top: 15px;
}
.drag{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 160px;
}

.drop{
  counter-reset: counter; 
  margin-bottom: 10px;
  padding-left: 30px;
 }

.phrase{
    width: 95%;
    padding: 10px;
    margin: 5px auto;
    border-radius: 5px ;
    color: #333;
    background-color: #eeeeeee9;
    animation : anime 0.5s;
}
 
.li{
   position :relative ;
   counter-increment: counter;
   animation : anime 0.5s;
}
@keyframes anime{
  from {opacity: 0; }
  to {opacity: 1;}
}
.li::before{
 content: counter(counter);
 position :absolute ;
 left: -32px ; top:4px;
 width :25px;
 height :25px;
 text-align: center;
 font-weight: bold;
 line-height:25px;
 border-radius: 50%;
 color : white ;
 background-color: #795548;
 zz-index:-1;
}

.ordre-events .mmmmmmmmmodal{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  display: flex; justify-content: center; align-items: center;
  font-size: 2rem;
  color: black;
  background-color: #000000e1;
}

.resultat{
   height: 90vh;
   width: 100%;
   position: absolute; 
   bottom:-100vh;
   display:flex;
   align-items: center;
   justify-content: center; 
   background-color: rgba(255,255,255);
   transition: .2s ease-in-out;
}   
.resultat .res-cont{
   min-height: 200px;
   width: 90%;
   border-radius: 10px;
   margin: 0 auto;
   background-color: var(--pr);
   border: 1px solid var(--sec);
   padding: 15px;
   display:flex;
   flex-direction: column;
   justify-content: space-around;
}
.message{
   font-size: 2rem;
   height: 40px;
   text-align: center;
   ccolor: var(--);
}
.bn-rep{
  display: none
  opacity: 0;
  transition: opacity 0.3s;
}
.bn-rep span{
   ccolor: var(--correct);
   font-weight: bold;
}
.ph-options{
  display: flex;
  gap: 10px;
  flex-direction: column;
  margin: 10px;
}

.ph-options > div {
   color: var(--pr);
   width: 80%;
   height: 40px;
   line-height: 40px;
   text-align: center;
   border-radius: 20px;
   margin: auto;
   font-size: 16px;
   background-color: var(--comp);
}
</style>`
    
   return html
  }
   
} // fin ordreEvenements