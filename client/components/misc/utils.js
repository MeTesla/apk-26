// Afficher une notification simple
import { profile } from './profile.js'
import { modalDevenirPremium, modalFreeMins } from './modals.js'
import { login } from './login.js'


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
  // e.preventDefault()
  //  const url = 'https://euduka.vercel.app'      
  const url = 'http://localhost:3000'
  const reponse = await fetch(url + '/creer-compte', {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ nom, prenom, email, tel })
  })
  const data = await reponse.json()
  if (data.success) {
    localStorage.setItem('role', data.role)
    document.querySelector('.user-menu').remove()
    generateMenu(data.role, document.querySelector('.menu'), document.querySelector('.menu'))
    modalFreeMins(true, data.message, 'verifyEmail')
    document.querySelector('.creer-compte-page').remove()
  } else {
    modalFreeMins(false, data.message, 'failed')
  }
}

// ------------  Get free MINs -----------
async function freeMins() {
  const url = 'http://localhost:3000'
  // const url ='https://euduka.vercel.app'
  const reponse = await fetch(url + '/freeMins', {
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

    const { nom, prenom, email, tel, freeMins, resultats } = data.eleveUpdated
    const objElv = { nom, prenom, email, tel, freeMins, resultats }
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
          <img src="./assets/img/verifyEmail.png" />
          <span>En attente</span>
        </div>
        <div class="annuler">
          <img src="./assets/img/annuler.png" />
          <span>Annuler</span>
        </div>
        </div>`
      break;
    case 'registred':
      div.innerHTML = `<div class="registred">
            <div class="premium">
              <img src="./assets/img/diamond.png" />
              <span>Premium</span>
            </div>           
            <div class="free-mins">
              <img src="./assets/img/freeMins.png" />
              <span>+10 minutes</span>
            </div>  
            <div class="menu-profile">
              <img src="./assets/img/profile.png" />
              <span>Profile</span>
            </div>
            <div class="menu-logout">
              <img src="./assets/img/logout.png" />
              <span class="logout">Se déconnecter</span>
            </div>
          </div>`
      break;
    case 'premium':
      div.innerHTML = `
          <div class="premium">
            <div>Le code</div> 
            <div>Profile</div>
          </div>`
      break;
    default: 'guest'
      div.innerHTML = `
        <div class="menu-compte">
          <div class="creer-compte">
            <img src="./assets/img/creerCompte.png" />
            <span>Créer un compte</span>
          </div>
          <div class="login">
            <img src="./assets/img/login.png" />
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
    disconnect()
  })

  const annuler = document.querySelector('.annuler')
  annuler && annuler.addEventListener('click', () => {
    disconnect()
  })

  function disconnect() {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('profile')
    localStorage.removeItem('resultats')
    document.location.reload()
  }
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
  let profile = JSON.parse(localStorage.getItem('profile'))
  let resultatLS = profile.resultats
  resultatLS = { ...resultatLS, ...resultat }
  // let updatedProfile = 
  localStorage.setItem('profile', JSON.stringify({ ...profile, resultats: resultatLS }))
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
    const res = JSON.parse(localStorage.getItem('profile')).resultats
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

