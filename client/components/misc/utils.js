// Afficher une notification simple
import { profile } from './profile.js'
import { modalDevenirPremium, modalFreeMins } from './modals.js'
import { login } from './login.js'
import { API_URL } from '../../config/env.js'
import { getProfile, setProfile, getResults } from '../../utils/storage.js'
import { safeFetchPost, safeFetchGet } from '../../utils/api.js'
import { validateSignupForm, sanitizeInput } from '../../utils/validation.js'

export function creerCompte() {
  //if(localStorage.getItem('token')) return
  const modal = document.createElement('div')
  modal.className = "creer-compte-page"
  modal.innerHTML = `<div class="form-container" style="display:nnone">
      <form class="form">
          <h2>Créer un compte</h2>
          <input  type="text" class="nom" required placeholder="Votre nom" name="nom" id="">
          <input  type="text" class="prenom" required placeholder="Votre prénom" name="prenom" id="">
          <input  type="email" class="email" required placeholder="Email ..." name="email" id="em">
          <input  type="tel" class="tel" required placeholder="Numéro de téléphone..." name="tel" id="">
          <div class="buttons">
              <button class="envoyer" type="submit">Envoyer</button>
              <button class="annuler">Annuler</button>
          </div>
          <div style="text-align:center;font-size: 0.7rem">
          Vous avez un compte ? 
          <span class="login-link" style="color: blue;cursor: pointer">
          Connectez-vous ! </span></div>
      </form>
      <style>
      .form-container{
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
      }
      form.form{
          width: 250px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          justify-content: center;
          align-items: center;
          box-shadow: 0 0 3px rgb(179, 180, 255);
          padding: 20px;
          border-radius: 15px;
      }
      form.form input{
          width: 80%;
          padding: 10px;
          border: 1px solid rgb(155, 144, 255);
          border-radius: 5px;
          outline: none
      }
      form.form button{
          padding: 10px;
          border: 1px solid rgb(155, 144, 255);
          border-radius: 5px;
          outline: none
      }
      </style>
        </div>`
  document.body.appendChild(modal)

  const annuler = document.querySelector('.annuler')
  annuler.onclick = function () { modal.remove() }

  const envoyer = document.querySelector('.envoyer')
  envoyer.onclick = function () { submitCreerCompte() }

  const loginLink = document.querySelector('.login-link')
  loginLink.onclick = function () {
    modal.remove()
    login()
  }
}

async function submitCreerCompte() {
  const nom = document.querySelector('.nom').value
  const prenom = document.querySelector('.prenom').value
  const email = document.querySelector('.email').value
  const tel = document.querySelector('.tel').value

  // 1️⃣ Valider formulaire
  const validation = validateSignupForm({ nom, prenom, email, tel })
  if (!validation.valid) {
    const errorMsg = Object.values(validation.errors).join('\n')
    modalFreeMins(false, errorMsg, 'failed')
    return
  }

  // 2️⃣ Nettoyer inputs
  const cleanData = {
    nom: sanitizeInput(nom, 50),
    prenom: sanitizeInput(prenom, 50),
    email: sanitizeInput(email, 254),
    tel: sanitizeInput(tel, 20)
  }

  // 3️⃣ Envoyer données validées
  const result = await safeFetchPost(API_URL + '/creer-compte', cleanData)

  if (result.success) {
    const data = result.data
    localStorage.setItem('role', data.role)
    localStorage.setItem('token', data.token)
    document.querySelector('.user-menu').remove()
    generateMenu(data.role, document.querySelector('.menu'), document.querySelector('.menu'))
    document.querySelector('.creer-compte-page').remove()
    modalFreeMins(true, data.message, 'verifyEmail')
  } else {
    modalFreeMins(false, result.error || 'Erreur lors de la création du compte', 'failed')
  }
}

export async function annulerCompte() {
  console.log('Heloi');

  const token = localStorage.getItem('token')
  if (!token) {
    localStorage.clear()
    toast('Aucun compte trouvé !')
    setTimeout(() => location.reload(), 1000)
  }
  const reponse = await fetch(API_URL + '/annuler-compte', {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ token })
  })
  const data = await reponse.json()
  if (data.success) {
    localStorage.clear()
    toast(data.message)
    setTimeout(() => { document.location.reload() }, 1000)
  }
  else {
    toast(data.message)
  }
}

// ------------  Get free MINs -----------
async function freeMins() {
  const reponse = await fetch(API_URL + '/freeMins', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem('token') || ""
    }
  })
  const data = await reponse.json()
  if (data.token) {
    localStorage.setItem('token', data.token)
    console.log(data);

    const { nom, prenom, email, tel, freeMins, resultats, role } = data.eleveUpdated
    const objElv = { nom, prenom, email, tel, freeMins, resultats, role }
    localStorage.setItem('profile', JSON.stringify(objElv))

    modalFreeMins(data.success, data.message, 'winner')
  } else {
    modalFreeMins(data.success, data.message)
  }
}

// ------------- Générer le menu utilisateur --------------
export function generateMenu(typeAccount, pere, menu) {
  const div = document.createElement('div')
  div.className = "user-menu"
  switch (typeAccount) {
    case 'attenteR':
      div.innerHTML = `<div>
        <div>
          <img src="/client/assets/img/verifyEmail.png" />
          <span>En attente</span>
        </div>
        <div class="annuler">
          <img src="/client/assets/img/annuler.png" />
          <span>Annuler</span>
        </div>
        </div>`
      break;
    case 'basic':
      div.innerHTML = `<div class="registred">
            <div class="premium">
              <img src="/client/assets/img/diamond.png" />
              <span>Premium</span>
            </div>           
            <div class="free-mins">
              <img src="/client/assets/img/freeMins.png" />
              <span>+10 minutes</span>
            </div>  
            <div class="menu-profile">
              <img src="/client/assets/img/profile.png" />
              <span>Profile</span>
            </div>
            <div class="menu-logout">
              <img src="/client/assets/img/logout.png" />
              <span class="logout">Se déconnecter</span>
            </div>
          </div>`
      break;
    case 'premium':
      div.innerHTML = `
          <div class="premium-active">
            <div class="premium-badge">
              <img src="/client/assets/img/diamond.png" />
              <span>COMPTE PREMIUM 👑</span>
            </div> 
            <div class="menu-profile">
              <img src="/client/assets/img/profile.png" />
              <span>Profile</span>
            </div>
            <div class="menu-logout">
              <img src="/client/assets/img/logout.png" />
              <span class="logout">Se déconnecter</span>
            </div>
          </div>
          <style>
            .premium-active {
              background: linear-gradient(135deg, #fff9e6 0%, #ffffff 100%);
              border: 1px solid #ffd700;
              border-radius: 10px;
            }
            .premium-badge {
              display: flex;
              align-items: center;
              gap: 10px;
              padding: 12px;
              background: #ffd700;
              color: #333;
              font-weight: bold;
              font-size: 0.75rem;
              letter-spacing: 0.5px;
            }
            .premium-badge img {
              width: 20px !important;
              filter: drop-shadow(0 0 2px rgba(0,0,0,0.2));
            }
          </style>`
      break;
    default: 'guest'
      div.innerHTML = `
        <div class="menu-compte">
          <div class="creer-compte">
            <img src="/client/assets/img/creerCompte.png" />
            <span>Créer un compte</span>
          </div>
          <div class="login">
            <img src="/client/assets/img/login.png" />
            <span>Login</span>          
          </div>
        </div>`
      break;
  }

  pere.appendChild(div)
  const userMenu = document.querySelector('.nav .menu .user-menu')

  const compte = document.querySelector('.menu .creer-compte')
  const loginBtn = document.querySelector('.menu .login')
  const menuProfile = document.querySelector('.menu-profile')
  const freeM = document.querySelector('.free-mins')
  const premium = document.querySelector('.premium')
  const logout = document.querySelector('.logout')

  freeM && freeM.addEventListener('click', () => {
    freeMins()
  })

  menuProfile?.addEventListener('click', () => {
    profile()

  })
  compte && compte.addEventListener('click', () => {
    creerCompte()
  })
  loginBtn && loginBtn.addEventListener('click', () => {
    login()
  })
  premium && premium.addEventListener('click', () => {
    // modalDevenirPremium()
    location.assign('./premium2.html')
  })

  logout && logout.addEventListener('click', () => {
    localStorage.clear()
    location.reload()
  })

  const annuler = document.querySelector('.annuler')
  annuler && annuler.addEventListener('click', async () => {
    await annulerCompte()
  })

  // show hide menu + Type menus
  menu.addEventListener('click', (e) => {
    e.stopPropagation()
    userMenu.classList.toggle('show')
  })
  document.body.onclick = () => userMenu.classList.contains('show') && userMenu.classList.remove('show')
  document.body.onscroll = () => (userMenu.classList.contains('show')) && userMenu.classList.remove('show')

  return div
}

// ---- LocalStorage resultats
export function handleResultats(resultat) {
  let profile = getProfile()
  if (!profile) {
    console.error('❌ Profile not found when updating results')
    return
  }
  let resultatLS = profile.resultats
  resultatLS = { ...resultatLS, ...resultat }
  setProfile({ ...profile, resultats: resultatLS })
}

// Slice scores to keep only last 6 items
export function sliceScores(scores) {
  if (scores.length >= 6) {
    return scores.slice(-6)
  } else {
    return scores
  }
}

//---Fetch save résultats to DB
export async function fetchResultats(listBlc, isModified) {
  if (isModified) {
    const res = getResults()
    if (!res) {
      console.error('❌ No results found to sync')
      return
    }
    try {
      const reponse = await fetch(API_URL + '/update-resultats', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem('token')
        },
        body: JSON.stringify({ res })
      })

      const data = await reponse.json()
      if (data.success && isModified == true) {
        console.log(data.success, isModified)
        toast('Résultats synchronisés')
        setTimeout(() => {
          listBlc.remove()
        }, 500)
      } else {
        console.log(data.success, isModified)
        listBlc.remove()
        toast('Fetch : erreur. data not success')
      }
    } catch (error) {
      console.error('Erreur lors de la synchronisation des résultats :', error);
      toast('Erreur de synchronisation des résultats')
    }
  } else {
    listBlc.remove()
  }

}

// ----Confetti
export function confet() {
  confetti({
    particleCount: 100,
    spread: 100,
    origin: { y: 0.6 },
  });
}

// ---- Toast
export function toast(msg) {
  Toastify({
    gravity: 'bottom',
    text: msg,
    className: "toast-id",
    position: "center",
    close: true
  }).showToast();
}

// Chart.js
export function createLineChart(dataArray, div) {
  // Vérification du tableau
  if (!Array.isArray(dataArray)) {
    console.error('Erreur d\'affichage du graphique');
    return null;
  }

  // Création du canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'myLineChart';
  //canvas.width = 300
  div.appendChild(canvas);

  // Configuration du graphique
  const ctx = canvas.getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['N 1', 'N 2', 'N 3', 'N 4', 'N 5', 'N 6', 'N 7', 'N 8'],
      datasets: [{
        label: 'Mes notes',
        data: dataArray,
        borderColor: 'rgba(109, 109, 109, 1)',
        tension: 0.3,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
        pointBackgroundColor: 'lightblue',
        pointRadius: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: false,
          text: 'Graphique de mes résultats'
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Notes'
          }
        },
        x: {
          display: false,
        }
      }
    }
  });

  return chart;
}

