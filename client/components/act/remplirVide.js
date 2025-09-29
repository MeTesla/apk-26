
import {closeAct,homeAct} from '../misc/closeAct.js'
import {entete} from '../misc/entete.js'

const l = console.log

export function remplirVide(bloc, data){
 const div=document.createElement('div');
 div.classList.add('vide') 
 div.innerHTML = htmlCode()
 bloc.appendChild(div)

 // Close and Home
 let home = document.querySelector('.home')
 home.onclick = () => { homeAct(div) }
 let close= document.querySelector('.close')
 close.onclick = () => { closeAct(div); }
 
 var paragraphe = document.querySelector('.paragraphe')
 var liste = document.querySelector('.liste')
 
  var resultat = document.querySelector('.resultat')
  var voirRep = document.querySelector('.voir-rep')
  var suivant = document.querySelector('.ph-suivante')
  var refaire = document.querySelector('.refaire')
   
  let verified = false, index = 0, nbrTextes=2, listeMotsTmp=[]
  
data.sort(function(a, b){return 0.5 - Math.random()}) 
loadQuestion()
 
  function loadQuestion() {
    let texteTmp = data[index].texte //copier le Texte = texteTmp
    listeMotsTmp = [...data[index].listeMots] // copier la liste des mots
    listeMotsTmp.sort(function(a, b){return 0.5 - Math.random()}) // shuffle liste de mots
  
   // Créer paragraphe
    for (let i = 0; i < listeMotsTmp.length; i++) {
       let gap = `<div class="gap"> </div>`
       let texte2 = texteTmp.replace(listeMotsTmp[i], gap)
       texteTmp = texte2      
       paragraphe.innerHTML = texteTmp
       //liste mots
       liste.innerHTML += "<span class='mot' >" + listeMotsTmp[i] + "</span>"
    }
    
      // gestion des réponses
    let mot, vide, motsChoisis=[]
    let vides=document.querySelectorAll('.gap')
    let mots=document.querySelectorAll('.liste .mot')
      
     
    for(let i =0; i < mots.length;i++){
      // clique sur les mots de la liste
      mots[i].addEventListener('click', (ev)=>{
        if (verified || motsChoisis.includes(ev.target.innerText)) return
        mots.forEach((item)=> item.style.backgroundColor="rgba(0,0,0, .08)")
        //color selected list word
        ev.target.style.backgroundColor="#E79b64" 
        // mot selectionné de la liste
        mot=ev.target
      }) 
        // clique sur les mots du paragraphe
        vides[i].addEventListener('click', (e)=>{
          if (e.target.innerText != "") {
            const m = Array.from(mots).filter(mot => {
              return mot.innerText == e.target.innerText
            })[0]
           m.style.opacity="1"
           motsChoisis.pop(m.innerText)
           e.target.innerText = ""
       }
        if(mot){
         e.target.innerText=mot.innerText
         motsChoisis.push(mot.innerText)
         e.target.style.transition="1s all ease"
         e.target.style.color="black"
         mot.style.opacity="0.5"
         mot.style.backgroundColor="rgba(0,0,0, .08)"
         mot = undefined
        } // fin if (typeof)
       }) //fin vides[i]
      }// fin for gestion réponses
  }
  
  let verifier = document.querySelector('.valider')
 verifier.addEventListener('click', (ev) => {
    verified = true;
    resultat.style.bottom = "40px"
    let gaps = document.querySelectorAll('.gap')
    gaps.forEach((item, i) => {
      let theFeed = document.createElement('span')
      
      if (item.innerText === data[index].listeMots[i]) {
        item.style.transition = "0.8s all ease"
        item.style.backgroundColor = "var(--correct)"
        item.appendChild(theFeed)
        theFeed.classList.add('correct')
      } else {
        item.appendChild(theFeed)
        theFeed.classList.add('incorrect')
        item.style.backgroundColor = "var(--incorrect)"
      }
    })
    verifier.style.display = "none";
    
  })    
// OPTIONS 
  suivant.addEventListener('click', () => { 
    if(index < nbrTextes){
      reinitialiser()
    }else{
      document.querySelector('.fin-session').style.display="flex"
      // resultat.style.bottom = "0"
      // resultat.innerHTML=`<h1 style="color: var(--comp)">FIN de session</h1>`  
    }
  })
  refaire.addEventListener('click', () => { reinitialiser('re') })
  voirRep.addEventListener('click', () => { voirReponse() })
 function reinitialiser(re){
  verified = false
  //listeMotsTmp=[]
  paragraphe.innerHTML=""
  liste.innerHTML=""
   
  if (!re) index += 1
  verifier.style.display = "block"
  resultat.style.bottom = "-100vh"
  loadQuestion()
 }
 
 function voirReponse(){
    let gaps=document.querySelectorAll('.paragraphe .gap')
    for(let i=0; i<gaps.length; i++){
      gaps[i].innerHTML = `<div>${data[index].listeMots[i]}</div>`
      gaps[i].className = "gap"
      gaps[i].style.backgroundColor="var(--correct)"
    }
 }
 
 function htmlCode(){
    const html = `${entete()} 
  <div class="consigne">Remplissez les espaces blancs par les mots de la liste :</div>
   <div class="sous-consigne">[Clique sur le mot puis sur l'endroit où tu veux l'insérer]</div>
   <div class="liste">        </div>
   <div class="paragraphe">   </div>
   <div class="valider">
      Vérifier
   </div>
   <div class="resultat">
    
      <div class="ph-options">
        <div class="ph-suivante">   Suivant         </div>
        <div class="voir-rep">      Voir la réponse </div>
        <div class="refaire">       Refaire         </div>
      </div>
    
   </div>
   <div class="fin-session">FIN de la sesssion</div>   
  <style>
  .consigne{
    padding: 10px;
  }

  .sous-consigne{
    font-size: 0.8rem;
    font-style: italic;
    text-align: center;
    padding-bottom: 10px;
  }
  .liste{
    margin: auto 14px;
  }

  .liste .mot{
    display: inline-block;
    padding: 5px;
    margin: 5px;
    background-color: var(--secc);
    border-radius: 10px;
 }  

  .paragraphe {
    width: 90% ;
    height: 45vh;
    overflow: auto;
    margin: auto;
    font-size: 16px;
    line-height: 40px;
    padding: 10px;
    text-align: justify;
    border: 1px solid var(--comp);
    border-radius: 10px;
   } 

  .gap {
    min-width: 80px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    display: inline-block;
    outline: none;
    border :1px solid var(--sec);
    border-radius: 7px;
    padding: 0 3px ;
    margin:-7px 0;
    position: relative;
  } 

  .correct, .incorrect {
    width: 12px; height: 12px;
    position: absolute;
    top: -6px; right: -6px;
    background-size: 16px;
    background-position: center;
   }
   
   .correct {
    background-image: url("./assets/img/correct.svg");
   }
   .incorrect {
    background-image: url("./assets/img/incorrect.svg");
   }
.resultat {
  position: absolute;
  width:100%;
  bottom: -100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255);
  transition: all 0.2s ease-in-out;
}
.ph-options {
    width: inherit;
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 40px;
    
  }
  
  .ph-options > div {
    color: var(--pr);
    text-align: center;
    border-radius: 20px;
    padding: 10px 15px;
    font-size: 16px;
    background-color: var(--comp);
  }
  .fin-session{
    position: fixed;
    top: 10vh;
    left: 0;
    width: 100%; height: 90%;
    background-color: white;
    color: var(--comp);
    display:none;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: bold;
    }
  </style>`
  return html
 }
 
} // fin fonction
