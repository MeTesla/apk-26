import {accueil} from '../../scripts/main.js'
import {pairs} from './apparaiement-db.js'
//import confetti from 'https://cdn.skypack.dev/canvas-confetti';
//import {confetti} from '../../assets/confetti.js'
//import {popupFermer} from '../fermer/fermer.js'

// ---------- APPARAIEMENT  ------------
export function apparaiement(){
   window.scrollTo(0, 0);
   document.body.classList.add('hide')
 let html = htmlCode()  
 document.body.innerHTML+=html

 let col1=document.querySelector('.col1')
 let col2=document.querySelector('.col2')
 let mots=[], syns=[], repA, repB
 
      // créer les divs
for(let i=0;i <pairs.length;i++){
 let divMot=document.createElement('div')
 let contDivMot=document.createElement('div')
 divMot.setAttribute('data-mot',pairs[i].mot)
 divMot.setAttribute('class','appar-mot')
 contDivMot.setAttribute('class','cont-div-mot')
 divMot.innerText=pairs[i].mot
   contDivMot.appendChild(divMot)
   mots.push(contDivMot)
     
   let divSyn=document.createElement('div')
   let contDivSyn=document.createElement('div')
   divSyn.setAttribute('data-mot',pairs[i].mot)
   divSyn.setAttribute('class','appar-syn')
   contDivSyn.setAttribute('class','cont-div-syn')
   divSyn.innerText=pairs[i].syn
   contDivSyn.appendChild(divSyn)
   syns.push(contDivSyn)
    }
    
    // shuffle mots et syns tables
 mots.sort(function(a, b){return 0.5 - Math.random()})
 syns.sort(function(a, b){return 0.5 - Math.random()})
      
      //append shuffeled elements
 for(let i=0; i <mots.length;i++){
       col1.appendChild(mots[i])
       col2.appendChild(syns[i])
   }

      //gérer les séléctions et dataset
    
 let apparMot=document.querySelectorAll('.appar-mot')
 let apparSyn=document.querySelectorAll('.appar-syn')
    
 for(let i=0; i <apparMot.length; i++){
     
 apparMot[i].addEventListener('click',()=>{
  for(let j=0; j<apparMot.length; j++){
   apparMot[j].style.backgroundColor=""
   apparMot[j].style.color="gray"
  }
  apparMot[i].style.backgroundColor="rgba(80,24,250, 0.7)"
  apparMot[i].style.color="white"
  repA=apparMot[i]
  verification()
     })    
     
  apparSyn[i].addEventListener('click',()=>{
   for (let j = 0; j <apparMot.length; j++) {
    apparSyn[j].style.backgroundColor = ""
    apparSyn[j].style.color = "gray"
      }
   apparSyn[i].style.backgroundColor="rgba(80,24,250, 0.7)"  
    apparSyn[i].style.color="white"  
    repB=apparSyn[i]
    verification()
     })    
    }
    
    // vérifier les réponses
    
    //au début, j'ai stoqué dans repA et repB le texte des obj dom. au moment de vérification je n'ai plus accès au objet dom. comme sol, j'ai stoqué dans repA et repB les deux objet choisis.
    
    
document.body.classList.add('hide')    /*verifier.addEventListener('click', ()=>{
       if(repA && repB){
          if(repA.dataset.mot == repB.dataset.mot){
           repA.style.display="none"
           repB.style.display="none"
          } else{
          repB.style.backgroundColor = "" 
          repB.style.color = "gray" 
          repA.style.backgroundColor = "" 
          repA.style.color = "gray" 
          }
       }
    }) */
function verification(){
   // setTimeout : pour que la disparition ne soit pas brusque
   // repA,B dans la première condition
   // prob: le clique rapide sur deux boutons produit une anomalie: désactiver les réponses.
     
     if (repA && repB) {
      setTimeout(()=>{}, 300)
        if (repA.dataset.mot == repB.dataset.mot) {
         // confetti({particleCount: 250, origin:{x:.5,y:1}})
          let sound= new Audio()
          sound.src='../components/apparaiement/assets/yay.mp3'
          sound.volume=.1
          sound.play()
           repA.style.display = "none"
           repB.style.display = "none"
        } else {
         let sound= new Audio()
          sound.src='../components/apparaiement/assets/wrong.mp3'
          sound.volume=.2
          sound.play()
          repB.style.backgroundColor = ""
          repB.style.color = "gray"
           
          repA.style.backgroundColor = ""
          repA.style.color = "gray"
        }
        repA=""
        repB=""
     }
     
    }

function htmlCode(){
 let html=`<section class="apparaiement">
     <img class="fermerImg" src="../../components/quiz-img/quizImgAssets/images/close.png">
     
    <div class="consigne">
     Clique sur le mot puis sur son synonyme
    </div>
    <div class="app-container">
      <div class="col1"></div>
      <div class="col2"></div>
    </div>
 </section>
 <div class="fermer">
    <div class="msg">
     Voulez-vous vraiment quitter ?
    </div>
    <div class="btns center">
     <div class="oui">Oui</div>
     <div class="non">Non</div>
    </div>
 </div>
    
 <style>
 /* ---------- Apparaiement------------*/
.apparaiement{
    width:100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background: rgb(142, 213, 222);
}

.apparaiement .app-container{
    height: 60%;
    width: 90%;
    margin: 20px auto;
    display: flex;
    justify-content: space-between
 }
 
 .app-container .col1, .app-container .col2{
    width: 48%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
}
 
 .col1 .cont-div-mot, .col2 .cont-div-syn{
    width: 70%;
    height: 40px;
    bbox-shadow: 0 0 1px gray;
    color: dimgray;
    background-color : white ;
    font-size: 1rem;
    margin: 10px auto;
    border-radius: 15px;
    overflow: hidden;
 }
 .cont-div-mot .appar-mot, .appar-syn{
    width: 100%;
    height: 100%;
    padding: 10px;
    text-align: center;
    border-radius: 15px;
    transition:.5s ease;
    ffont-weight: bold;
 }
  .appar-mot:active, .appar-syn:active{
  transform: scale(0.95)
  }
  
    .fermer{
     width: 80% ;
     height: 140px;
     position: absolute;
     top: 50% ;
     left: 50% ;
     transform: translate(-50% ,-50%);
     border :2px solid gray ;
     border-radius: 20px;
     padding: 10px;
     font-size: 1.2rem;
     flex-direction: column;
     color: gray;
     background-color: white ;
     zz-index: 444;
     display :none ;
    }
    .btns{
     width: 100% ;
     margin-top: 20px;
     
    }
    .oui, .non{
     width: 30% ;
     padding: 10px;
     margin: 10px;
     text-align: center;
     background-color: mediumseagreen;
     border-radius: 10px;
     font-size: 16px;
     color:white ;
    }
    .center{
     display: flex;
     justify-content: center;
     align-items: center;
    }
</style>`
return html
}
//let block=document.querySelector('.apparaiement')
let fermer
document.querySelector('.fermerImg').addEventListener('click',()=> {
 fermer =document.querySelector('.fermer')
 fermer.style.display='flex'
}) 
 let block= document.querySelector('.apparaiement')
 let oui= document.querySelector('.oui')
 oui.addEventListener('click', () =>{
  
  block.remove()
  document.body.classList.remove('hide')
  setTimeout(() => {
    fermer.remove()
    accueil()
  }, 100);
 })
 
 oui.addEventListener('click', () =>{
  fermer.remove()
 })
 console.log('appar') ;


}//fin function apparaiement
