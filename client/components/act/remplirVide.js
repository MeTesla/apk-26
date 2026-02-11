
import { closeAct, homeAct } from '../misc/closeAct.js'
import { entete } from '../misc/entete.js'
import { handleResultats, sliceScores } from '../misc/utils.js'
import { getProfile } from '../../utils/storage.js'
import { EventManager } from '../../utils/eventManager.js'
const l = console.log

export function remplirVide(bloc, data, callBack) {
  // Gestionnaire d'événements avec cleanup automatique
  const events = new EventManager()

  let texteTmp = {}
  const div = document.createElement('div');
  div.classList.add('vide')
  div.innerHTML = htmlCode()
  bloc.appendChild(div)

  // Close and Home
  let home = document.querySelector('.home')
  home.onclick = () => { homeAct(div) }
  let close = document.querySelector('.close')
  close.onclick = () => { closeAct(div); }

  // DOM variables
  var paragraphe = document.querySelector('.paragraphe')
  var liste = document.querySelector('.liste')

  var resultat = document.querySelector('.resultat')
  var voirRep = document.querySelector('.voir-rep')
  var suivant = document.querySelector('.ph-suivante')
  var refaire = document.querySelector('.refaire')

  let verified = false, index = 0, nbrTextes = 2, listeMotsTmp = []

  data.sort(function (a, b) { return 0.5 - Math.random() })
  loadQuestion()

  // Charger une question
  function loadQuestion() {
    //copier le Texte = texteTmp
    texteTmp = data[index].texte

    // copier la liste des mots
    listeMotsTmp = [...data[index].listeMots]

    // shuffle liste de mots
    listeMotsTmp.sort(function (a, b) { return 0.5 - Math.random() })

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
    let mot, vide, motsChoisis = []
    let vides = document.querySelectorAll('.gap')
    let mots = document.querySelectorAll('.liste .mot')

    // Gestion des cliques : liste - paragraphe
    for (let i = 0; i < mots.length; i++) {
      // clique sur les mots de la liste
      events.on(mots[i], 'click', (ev) => {
        if (verified || motsChoisis.includes(ev.target.innerText)) return
        mots.forEach((item) => {
          item.style.backgroundColor = "var(--secc)"
          item.style.color = "var(--secf)" 
        })
        //color selected list word
        // mot selectionné de la liste
        ev.target.style.backgroundColor= "var(--comp)"        
        ev.target.style.color= "var(--pr)"        
        mot = ev.target
      })
      // clique sur les mots du paragraphe
      events.on(vides[i], 'click', (e) => {
        if (e.target.innerText != "") {
          const m = Array.from(mots).filter(mot => {
            return mot.innerText == e.target.innerText
          })[0]
          m.style.opacity = "1"
          motsChoisis.pop(m.innerText)
          e.target.innerText = ""
        }
        if (mot) {
          e.target.innerText = mot.innerText
          motsChoisis.push(mot.innerText)
          e.target.style.transition = "1s all ease"
          e.target.style.color = "var(--secf)"
          mot.style.opacity = "0.5"
          mot.style.backgroundColor = "var(--secc)"
          mot = undefined
        } // fin if (typeof)
      }) //fin vides[i]
    }// fin for gestion réponses
  }

  // Boutton Vérifier
  let verifier = document.querySelector('.valider')
  events.on(verifier, 'click', (ev) => {
    verified = true;
    let correct = 0, incorrect = 0

    resultat.style.bottom = "40px"
    let gaps = document.querySelectorAll('.gap')
    gaps.forEach((item, i) => {
      let theFeed = document.createElement('span')

      if (item.innerText === data[index].listeMots[i]) {
        item.style.transition = "0.8s all ease"
        item.style.backgroundColor = "var(--correct)"
        item.appendChild(theFeed)
        theFeed.classList.add('correct')
        correct += 1

      } else {
        item.appendChild(theFeed)
        theFeed.classList.add('incorrect')
        item.style.backgroundColor = "var(--incorrect)"
        incorrect -= 1
      }
    })

    const profileScores = getProfile()?.resultats?.remplir?.scores || []
    let resultatVide = {
      remplir: {
        score: correct,
        scores: [...sliceScores(profileScores), correct],
        nbrQsts: listeMotsTmp.length,
        date: new Date().toLocaleDateString('fr-FR'),
        lastSession: Array(1).fill(data[index])
      }
    }
    callBack && callBack(true)
    handleResultats(resultatVide)
    verifier.style.display = "none";
  })

  // Boutton Suivant 
  suivant.addEventListener('click', () => {
    if (data.length === 1) return
    if (index < nbrTextes) {
      events.cleanup()
      reinitialiser()
    } else {
      document.querySelector('.fin-session').style.display = "flex"
      // resultat.style.bottom = "0"
      // resultat.innerHTML=`<h1 style="color: var(--comp)">FIN de session</h1>`  
    }
  })

  // Refaire
  refaire.addEventListener('click', () => { reinitialiser('re') })

  // Voir réponse
  voirRep.addEventListener('click', () => { voirReponse() })

  function reinitialiser(re) {
    verified = false
    //listeMotsTmp=[]
    paragraphe.innerHTML = ""
    liste.innerHTML = ""

    if (!re) index += 1
    verifier.style.display = "block"
    resultat.style.bottom = "-100vh"
    loadQuestion()
  }

  function voirReponse() {
    let gaps = document.querySelectorAll('.paragraphe .gap')
    for (let i = 0; i < gaps.length; i++) {
      gaps[i].innerHTML = `<div>${data[index].listeMots[i]}</div>`
      gaps[i].className = "gap"
      gaps[i].style.backgroundColor = "var(--correct)"
    }
  }

  function htmlCode() {
    const html = `<div class="activity-container">${entete()} 
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
  </div>`
    return html
  }

} // fin fonction

//remplirVide pass paramètre à handleResultats(nbrCorrect, nbrTotal)
//