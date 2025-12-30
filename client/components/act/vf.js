// Modifications: 10 fév
// limiter une session de question en 10
// modifier la logique de chargement de 10 qst
// Afficher un écran de fin de session : refaire l'exercices / quitter / autre session
// Red Green feedback
/*
shuffle data
variable globale INDEX
charger 10 questions dans un nouveau tableau
load question
qst 10 => aficher modal: résultat
*/
const l = console.log
import { closeAct, homeAct } from '../misc/closeAct.js'
import { entete } from '../misc/entete.js';
import { modalFinSession } from '../../utils.js'
import { handleResultats, sliceScores } from '../misc/utils.js';

export function vf(bloc, data) {
  const div = document.createElement('div')
  div.setAttribute('class', 'vrai-faux')
  div.innerHTML = codeHTML();
  bloc.appendChild(div);

  // Home & Close buttons 
  const home = document.querySelector('.home')
  home.onclick = () => { homeAct(div) }
  const close = document.querySelector('.close')
  close.onclick = () => { closeAct(div); }

  //DOM variables
  const question = document.querySelector('.question')
  const vraiBtn = document.querySelector('.vrai')
  const fauxBtn = document.querySelector('.faux')
  const valider = document.querySelector('.valider')
  const suivant = document.querySelector('.suivant')
  const precedent = document.querySelector('.precedent')
  const score = document.querySelector('.score')
  const numQst = document.querySelector('.num-qst')
  const rep = document.querySelectorAll('.rep')
  const progress = document.querySelector('.vrai-faux .progress')

  let index = 0, nbrQst = 4, nbrSession = 1
  let currentQst = 0, monScore = 0, choosenRep = false,
    repondu = [], answered, questions = []

  // repenser cette logique : alea tout le tableau, puis choix 10 qst. 
  //en cas de session suiv. passer le pointeur à 10 ...
  //en cas de refaire: repasser pointeur à 0

  //Shuffle les 15 questions
  data.sort(function (a, b) { return 0.5 - Math.random() })

  //charger n questions dans un tableau
  for (let i = index; i < index + nbrQst; i++) {
    questions.push(data[i])
  }
  // LOAD QUESTIONS on DOM
  loadQst()
  function loadQst() {
    selection()
    answered = false
    choosenRep = ""
    // Changer 300 par une valeur dynamique pour le responsif
    progress.style.width = (300 / questions.length) * (currentQst + 1) + 'px'
    question.innerHTML = questions[currentQst].question

    // TEST des réponses faites
    if (repondu.includes(currentQst + 1)) {
      valider.style.opacity = "0.6"
      valider.removeEventListener('click', valid)
    } else {
      valider.style.opacity = "1"
      valider.addEventListener('click', valid)
    }
  }

  //Selection VRAI - FAUX
  rep.forEach((item) => {
    item.addEventListener('click', () => {
      if (answered == true) return
      choosenRep = item
      selection()
      item.classList.add('selected')
      // audio.src='../assets/audios/click.mp3'
      // audio.play()
    })
  })

  valider.addEventListener('click', valid)

  function valid() {
    let audioFeed = new Audio()
    if (choosenRep) {
      answered = true
      repondu.push(currentQst + 1)
      valider.style.opacity = "0.6"
      valider.removeEventListener('click', valid)
      selection()
      if (choosenRep.innerText === questions[currentQst].rep) {
        monScore += 10
        score.innerText = monScore
        // audio.src='../assets/audios/yay.mp3'
        // audio.play()
        choosenRep.classList.add('reponseCorrect')
      } else {
        choosenRep.classList.add('reponseIncorrect')
        /* Array.from(rep).filter((item) => {
           return item.innerText == questions[currentQst].rep.trim()
         [0].classList.add('reponseCorrect')
        })
        */
        // audio.src='../assets/audios/wrong.mp3'
        // audio.play()

      }

      // Feed réponse correcte
      //let choix=Array.from(document.querySelectorAll('.rep'))
      /*const reponseCorrect = choix.filter((item) => {
        return item.innerText == questions[currentQst].rep.trim()
      })
      reponseCorrect[0].classList.add('reponseCorrect')
      */
    }
    let resultat = {
      score: monScore / 10,
      nbrQst: nbrQst,
      end: nbrSession
    }
    if (repondu.length == nbrQst) {

      let resultatVF = {
        vf: {
          score: monScore / 10,
          scores: [...sliceScores(JSON.parse(localStorage.getItem('profile')).resultats.vf.scores), monScore / 10],
          nbrQsts: nbrQst,
          date: new Date().toLocaleDateString('fr-FR'),
          lastSession: questions
        }
      }
      handleResultats(resultatVF)
      modalFinSession(div, reinitialiser, resultat)
    }
  }

  suivant.addEventListener('click', () => {
    if (currentQst < questions.length - 1) {
      currentQst++
      loadQst()
    } else {
      suivant.querySelector('span').style.display = "block"
      setTimeout(() => {
        suivant.querySelector('span').style.display = "none"
      }, 700);
    }
  })

  precedent.addEventListener('click', () => {
    if (currentQst > 0) {
      currentQst--
      loadQst()
    } else {
      precedent.querySelector('span').style.display = "block"
      setTimeout(() => {
        precedent.querySelector('span').style.display = "none"
      }, 700);
    }
  })

  // Réinitialisation
  function reinitialiser(re) {
    monScore = 0; repondu = []; currentQst = 0;
    progress.style.width = (300 / questions.length) * (currentQst + 1) + 'px'
    score.innerText = "00"
    if (re) {
      index += nbrQst;
      nbrSession += 1
    }
    questions = []
    for (let i = index; i < index + nbrQst; i++) questions.push(data[i])
    loadQst()
  }

  function selection() {
    for (let x = 0; x < 2; x++) {
      rep[x].classList.remove('selected')
      rep[x].classList.remove('reponseCorrect')
      rep[x].classList.remove('reponseIncorrect')

    }
  }

  function codeHTML() {
    const html = `${entete()}
    <div class="progress-bar">
      <div class="progress"></div>
    </div>

    <div class="vf-qst-container">
      <div class="question">Sidi Mohammed était un enfant solitaire. </div>
        <div class="choix">
          <div class="vrai rep">Vrai</div>
          <div class="faux rep">Faux</div>
        </div>
      </div>    
    </div>

    <div class="score"> 00 </div> 
    <div class = "vf-foot">
      <div class="precedent">
        <span> Début de questions </span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
      </div> 
      <div class = "valider"> Vérifier </div> 
      <div class = "suivant">
        <span> Fin de questions </span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path d="M342.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L274.7 256 105.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
        </svg>
      </div>
   

    <style>
  .vrai-faux .progress-bar{
      width:300px;
      height: 10px;
      border: 1px solid var(--secc);
      position: relative;
      border-radius: 10px;
      overflow: hidden;
      margin: 15px auto;
    }

    .vrai-faux .progress{
      position: absolute;
      top: 0; left: 0;
      height: 100%;
      transition: .5s ease-out;
      background-color: var(--comp);
      width: 30%;
    }

  .vf-qst-container{
    width: 90%;
    height: 300px;
    margin:  auto;
    border-radius: 20px;
  }

  .question{
    font-size: 1.2rem;
    width: 100%;
    height: 100px;
    overflow: auto;
    border: 1px solid var(--secc);
    border-radius: 10px;
    padding: 10px;
    margin: 30px auto;
    color: #333;
  }

  .choix{
    display: flex;
    justify-content: center;
    gap: 30px;
    font-size: 1.3rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: bolder;
    margin-top: 60px;
    
  }
  .vrai, .faux{
    width: 40%;
    height: 70px;
    background-color: var(--secc);
    color: var(--secf);
    bborder: 2px solid var(--sec);
    font-size: 1rem;
    line-height: 70px;
    text-align: center;
    border-radius: 30px;
  } 
  .vrai:active,.faux:active{
    ftransform : scale(0.98);
    transition :.3s;
  }

  .selected{
    background-color: var(--sec);
    color: var(--pr);
  }

  .score{
    font-size: 2rem;
    margin:20px auto;
    width: 10vh;
    height: 10vh;
    line-height: 10vh;
    text-align: center;
    border-radius: 50%;
    border: 2px solid var(--comp);
    color: var(--secf);
  }

  .vf-foot{
    display: flex;
    justify-content: center ;
    align-items: center;
    width: 100%;
    height: 10vh;
  }

  .vf-foot .precedent, .vf-foot .suivant{
    border-radius: 20px;
    width: 20px;
    height: 20px;
    line-height: 40px;
    text-align: center;
    color:rgb(255, 255, 255);
    margin: 0 20px;
  }
  .suivant, .precedent{
    position: relative;
  }
  .suivant span, .precedent span{
    display:none;
    font-size: 9px;
    position: absolute; bottom: 20px; right: 0;
    border-radius: 10px;
    height: 30px;
    line-height: 30px;
    width: 90px;
    background-color: var(--secf);
    color: var(--pr);
    z-index: 10;
  }
 
  .precedent span{
    left: 0;  
  }
  .precedent svg, .suivant svg{
    fill: var(--comp);
  }
 .reponseCorrect{
  background-color: var(--correct);
 }
 .reponseIncorrect{
  background-color: var(--incorrect);
 }
  </style>
</div>`
    return html
  }
}