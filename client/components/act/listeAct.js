//--------- ACTIVITIES 
import { lecteur } from './lecteur.js'
import { resume } from './resume.js'
import { qcm } from './qcm.js'
import { remplirVide } from './remplirVide.js'
import { vf } from './vf.js'
import { ordreEvenements } from './ordreEvenements.js'
import { ordrePhrases } from './ordrePhrases.js'

/* DYNAMIC IMPORT
t.addEventListener('click', async ()=>{
  let {d} = await import('./data.js')
  console.log(d)
})
*/
// import { modalFreeMins } from '../misc/modals.js'
import { modalLokedContent } from '../misc/modals.js'


function toast(msg) {
  Toastify({
    text: msg,
    className: "toast-id",
    position: "center",
    close: true
  }).showToast();
}
// const url ='https://euduka.vercel.app/'
const url = 'http://localhost:3000/'

const vffData = async (exo) => {
  const reponse = await fetch(url + `?exo=${exo}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem('token') || ''
    }
  })
  const data = await reponse.json()
  if ((!reponse.ok) || (data == "accès interdit")) return modalLokedContent()

  return data
}

const wrapper = document.querySelector('.wrapper')

export function listeAct(bloc) {
  const html = `<img class="index" src ="./assets/img/previous.svg"></svg>
  <div class="list">
  <li class="list-elements lst-lire">Lire le roman</li>
  <li class="list-elements lst-resume">Résumé</li>
  <li class="list-elements lst-vf" >Vrai-Faux</li>
  <li class="list-elements lst-qcm">QCM</li>
  <li class="list-elements lst-ordre-ph">Mettre en ordre des phrases</li>
  <li class="list-elements lst-ordre-ev">Mettre en ordre des évènements</li>
  <li class="list-elements lst-vide">Remplir le vide</li>
  </div>`

  const activites = document.createElement('ul')
  activites.innerHTML = html
  activites.classList.add('liste-act')
  bloc.appendChild(activites)

  // Afficher la page d'accueil
  const accueil = document.querySelector('.index')
  const listBlc = document.querySelector('.liste-act')
  let isDataFetched = false
  accueil.onclick = () => {
    // fetch resultats to DB
    fetchResultats()
  }

  //---Fetch save résultats to DB
  // Le preblème est du front end.
  async function fetchResultats() {
    const res = JSON.parse(localStorage.getItem('profile')).resultats
    console.log(res);

    try {
      const reponse = await fetch('http://localhost:3000/update-resultats', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem('token')
        },
        body: JSON.stringify({ res })
      })
      const data = await reponse.json()
      if (data.success) {
        const result = data
        // isDataFetched = true
        console.log(result)
        toast('Résultats synchronisés')
        setTimeout(() => {
          listBlc.remove()
        }, 500)
      } else {
        listBlc.remove()
        toast('Erreur de synchronisation des résultats')
      }
    } catch (error) {
      console.error('Erreur lors de la synchronisation des résultats :', error);
      toast('Erreur de synchronisation des résultats')
    }

  }

  //-------Lire
  const lire = document.querySelector('.lst-lire')
  lire.onclick = async () => {
    const { oeuvre } = await vffData('bamoeuvre') || ''
    if (!oeuvre) return console.log('lkqdflmj')
    lecteur(wrapper, oeuvre)
  }
  //-------Résumé  
  const res = document.querySelector('.lst-resume')
  res.onclick = async () => {
    const { resumee } = await vffData('bamresume') || ''
    if (!resumee) return //console.log('Vou n\êtes pas autorisé')}
    resume(wrapper, resumee)
  }

  const q = document.querySelector('.lst-qcm')
  q.onclick = async () => {
    const { qcmData } = await vffData('bamqcm') || ''
    if (!qcmData) return
    qcm(wrapper, qcmData)
  }

  const vide = document.querySelector('.lst-vide')
  vide.onclick = async () => {
    const { textesVide } = await vffData('bamvide') || ''
    if (!textesVide) return
    remplirVide(wrapper, textesVide)
  }

  const vF = document.querySelector('.lst-vf')
  vF.onclick = async () => {
    const { bamvf } = await vffData('bamvf') || ''
    if (!bamvf) return
    vf(wrapper, bamvf)
  }

  const ordreEvents = document.querySelector('.lst-ordre-ev')
  ordreEvents.onclick = async () => {
    const { ordreEventsData } = await vffData('bamordreev') || ''
    if (!ordreEventsData) return
    ordreEvenements(wrapper, ordreEventsData)
  }

  const ordrePh = document.querySelector('.lst-ordre-ph')
  ordrePh.onclick = async () => {
    const { phrases } = await vffData('bamordreph') || ''
    if (!phrases) return
    ordrePhrases(wrapper, phrases)
  }
}
