const l = console.log
import { closeAct, homeAct } from '../misc/closeAct.js'
import { entete } from '../misc/entete.js'
import { handleResultats, sliceScores,confet } from '../misc/utils.js'
import { getProfile } from '../../utils/storage.js'
import { EventManager } from '../../utils/eventManager.js'

export function ordrePhrases(bloc, data, callBack) {
   // Gestionnaire d'événements avec cleanup automatique
   const events = new EventManager()

   const div = document.createElement('div');
   div.classList.add('ordre-ph')
   div.innerHTML = htmlCode()
   bloc.appendChild(div)

   let home = document.querySelector('.home')
   home.onclick = () => { homeAct(div) }

   let close = document.querySelector('.close')
   close.onclick = () => { closeAct(div); }

   // let p="je suis fatigué de courir toute la journée";

   // console.log(p.split(" ").sort(function(a, b){return 0.5 - Math.random()}).join(" "));

   // --------DOM varibles
   var score = document.querySelector('.score')
   const progress = document.querySelector('.progress')
   var recepteur = document.querySelector('.recepteur')
   var emetteur = document.querySelector('.emetteur')
   var verifier = document.querySelector('.valider')
   var resultat = document.querySelector('.resultat')
   var message = document.querySelector('.message')
   var bnRep = document.querySelector('.bn-rep')
   var voirRep = document.querySelector('.voir-rep')
   var suivant = document.querySelector('.ph-suivante')
   var refaire = document.querySelector('.ph-refaire')
   // -------- GLOBALS
   var index = 0
   var monScore = 0
   const nbrPhrases = 4
   var audio
   let phraseInOrder = []
   let sessionPhrases = []
   verifier.addEventListener('click', verifierFunc)

   // Choisir 8 phrases
   data.sort(function (a, b) { return 0.5 - Math.random() })

   loadPhrase()
   function loadPhrase() {
      // Load phrases on DOM
      let unePhrase = data[index].split(" ")
      sessionPhrases.push(data[index])
      phraseInOrder = [...unePhrase]
      unePhrase.sort(function (a, b) { return 0.5 - Math.random() })
      unePhrase.forEach((item) => {
         let span = document.createElement('span');
         span.innerHTML = item;
         emetteur.appendChild(span)

         progress.style.width = (100 / nbrPhrases) * (index + 1) + '%'
         bnRep.innerText = ""
         events.on(span, 'click', (ev) => {
            if (ev.target.parentElement == emetteur) {
               recepteur.appendChild(ev.target)
            } else {
               emetteur.appendChild(ev.target)
            }
         })
      })
   }

   function verifierFunc() {
      if (!recepteur.hasChildNodes()) return
      resultat.style.bottom = "0"
      if (recepteur.innerText == phraseInOrder.join("")) {
         message.style.color = "var(--correct)"
         message.innerText = "C'est correct"
         monScore += 10
         score.innerText = monScore
         //audio = new Audio('../../assets/audios/yay.mp3')
         //audio.play()
         voirRep.style.display = "none"
         confet()
      } else {
         voirRep.style.display = "block"
         message.innerText = "C'est incorrect !"
         bnRep.style.opacity = "0";
         bnRep.innerHTML = `La réponse est : <span> ${phraseInOrder.join(' ')}</span>`
         message.style.color = "var(--incorrect)"
         audio = new Audio('../../assets/audios/wrong.mp3')
         audio.volume = "0.4"
         audio.play()
      }
   }

   // addEventListernner !== onclick IMAGIIIiIIIIINE
   suivant.addEventListener('click', () => {
      if (index < nbrPhrases) {
         index++
         reinitialiser()
      } else {
         resultat.style.bottom = "0"
         resultat.innerHTML = `<h1 style="color: var(--comp)">FIN de session</h1>`

         // Créer tableau où stocker les phrases de la session
         // score = monScore
         // Travailler au click sur suivant et non verifier
         const profileScores = getProfile()?.resultats?.ordrePhrases?.scores || []
         let resultatOrdrePhrases = {
            ordrePhrases: {
               score: monScore / 10,
               scores: [...sliceScores(profileScores), monScore / 10],
               nbrQsts: nbrPhrases + 1,
               date: new Date().toLocaleDateString('fr-FR'),
               lastSession: sessionPhrases
            }
         }
         callBack(true)
         handleResultats(resultatOrdrePhrases)
      }


   })

   refaire.onclick = () => reinitialiser()
   voirRep.onclick = () => {
      bnRep.style.opacity = "1";
      voirRep.style.display = "none"
   }

   function reinitialiser() {
      events.cleanup()
      emetteur.innerHTML = ""
      recepteur.innerHTML = ""
      resultat.style.bottom = "-100vh"
      loadPhrase()

   }


   function htmlCode() {
      let html = `<div class="activity-container">${entete()}
  <div class="q-header">
  <div class="progress-bar">
    <div class="progress"></div>
  </div>  
  
 </div>
    <div class="q-content">
       <div class="recepteur"></div>
       <div class="score">00 </div>
       <div class="emetteur"></div>
    </div>
 <div class="q-foot">
   <div class="valider">Vérifier </div> 
 </div>
 <div class="resultat">
   <div class="res-cont"> 
      <div class="message"> </div>
      <div class="bn-rep"> </div>
      <div class="ph-options">  
        <div class="ph-suivante"> Suivant </div>
        <div class="ph-refaire"> Refaire </div>
        <div class="voir-rep"> Voir la réponse </div>
      </div>  
   </div>
</div>
</div>`
      return html
   }
}