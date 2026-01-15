import { creerCompte, toast } from './utils.js';
//import { generateMenu } from './misc/utils.js';
export function login() {
  const div = document.createElement('div');
  div.className = 'login-container';
  div.innerHTML = `<form class="form-login">
      <h1 class="title-login">Login</h1>
      <input type="email" class="input-email" placeholder="Email" required>
      <input type="password" class="input-pass" placeholder="Password" required>
      <div class="buttons-login">
        <button type="submit" class="btn-login">Login</button>
        <button class="annuler">Annuler</button>
      </div>
      <div class="redirect">Vous n'avez pas de compte <span class="creer-compte-link">Créer un compte</span></div>
      <div class="redirect"><span class="mdp-oublie-link">Mot de passe oublié ?</span></div>
  <style>
    .login-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;      
      background-color: #f0f0f0;
    }
    .form-login {
      display: flex;
      flex-direction: column;
      gap: 15px;      
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 15px;
      background-color: #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    }
    .form-login .title-login {
      text-align: center;
      margin-bottom: 10px;
    }
    .input-pass, .input-email, .btn-login {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 3px;
      font-size: 16px;
    }
    .buttons-login {
      display: flex;
      justify-content: center;
      gap: 10px;
    }
    .buttons-login button{
      padding: 10px 20px;
    }
    .btn-login{
      cursor: pointer;
    }
    .redirect {
      text-align: center;
      font-size: 14px;
    }
    .redirect span {
      display: inline-block;
      padding: 5px;
      color: white;
      font-weight: bold;
      cursor: pointer; 
      background-color: blue;
      border-radius: 3px;     
    }
    .redirect span:hover{
    text-decoration: underline;
    }
  </style>
  </form>`

  document.body.appendChild(div);
  const btnLogin = document.querySelector('.btn-login');
  btnLogin.onclick = function (e) {
    submitLogin(e, div);
  };
  const btnAnnuler = document.querySelector('.buttons-login .annuler')
  btnAnnuler.onclick = function () {
    // Supprimer l'élève de la base de données
    // fetch('http://localhost:3000/delete-eleve', {})
    div.remove()
  }

  const creerCompteLink = document.querySelector('.creer-compte-link');
  creerCompteLink.onclick = function () {
    div.remove();
    creerCompte();
  };

  const mdpOublieLink = document.querySelector('.mdp-oublie-link');
  mdpOublieLink.onclick = function () {
    mpdOublie(document.body);
  };

  async function submitLogin(e, div) {
    e.preventDefault();
    const email = document.querySelector('.input-email').value;
    const password = document.querySelector('.input-pass').value;
    // const url = 'https://euduka.vercel.app'      
    const url = 'http://localhost:3000'
    const reponse = await fetch(url + '/login', {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password })
    })
    const data = await reponse.json()
    if (data.success) {
      localStorage.setItem('role', data.eleve.role)
      localStorage.setItem('token', data.eleve.token)
      console.log(data.eleve)
      const { _id, nom, prenom, email, tel, freeMins, resultats } = data.eleve
      const objElv = { _id, nom, prenom, email, tel, freeMins, resultats }
      localStorage.setItem('profile', JSON.stringify(objElv))

      toast("Connecté avec succès")
      setTimeout(() => window.location.reload(), 800)
    } else {
      toast(data.message)
    }
  }
}

export function mpdOublie(parent) {
  // modal
  const modalMdp = document.createElement('div');
  modalMdp.className = 'modal-mdp-oublie';
  modalMdp.innerHTML = `<div class="modal-mdp-container">
            <div class="mdp-close-btn">X</div>
            <h2 class="mdp-titre">Mot de passe oublié</h2>
            <p class="mdp-instruction">Un email sera envoyé à votre adresse pour réinitialiser votre mot de passe.</p>
            <input type="email" class="mdp-email" placeholder="Entrez votre email" required>
            <button class="mdp-confirmer">Confirmer</button>
        </div>
        <style>
            .modal-mdp-oublie {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-color: rgb(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .modal-mdp-container {
                background-color: white;
                border-radius: 10px;
                overflow: hidden;
            }

            .mdp-close-btn {
                padding: 10px;
                text-align: right;
                cursor: pointer;
                background-color: aqua;
            }

            .mdp-titre {
                text-align: center;
                margin: 0;
                padding: 10px;
            }

            .mdp-instruction {
                padding: 5px 20px;
            }
            .mdp-email {
                display: block;
                width: 80%;
                margin: 10px auto;
                padding: 10px;
                border: 1px solid gray;
                border-radius: 5px;
                outline: none;
            }
            .mdp-confirmer {
                display: block;
                padding: 10px 20px;
                margin: 10px auto;

            }
        </style>`
  parent.appendChild(modalMdp)

  const modalMdpOublie = document.querySelector('.modal-mdp-oublie')
  const mdpCloseBtn = document.querySelector('.mdp-close-btn')
  const mdpConfirmer = document.querySelector('.mdp-confirmer')
  mdpCloseBtn.addEventListener('click', () => {
    modalMdpOublie.remove()
  })

  // fetch mdp-oublie + verifer email + response
  mdpConfirmer.addEventListener('click', async () => {
    const mdpOublieEmail = document.querySelector('.mdp-email').value
    try {
      const reponse = await fetch('http://localhost:3000/mdp-oublie', {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: mdpOublieEmail })
      })
      const data = await reponse.json()
      if (data.success) {
        toast(data.message)
        setTimeout(() => { modalMdpOublie.remove() }, 1000);
      } else {
        toast(data.message)
      }
    } catch (error) {
      toast(error.message)
    }
  })
  // Titre + message(Un email serai envoyé à votre adresse) + email + bouton confirmer (fetch './verifier-email)
  // BE : fetch API + verifier émail, si oui, envoi émail+token (15min), si non : toast()
  //gérer clique apèrs changement de mdp.

  // clique émail = newMDP.html + form : saisir nouveau mot de passe + clique bouton
  //+ fetch '/updateMdp'
  // BE : update mdp + maj token in BD

}

function renderData(data) {
  const container = document.createElement('div')

  // data.map(eleve => {
  //   container.innerHTML += `<div><span>${eleve.nom} </span><span>${eleve.email}</span></div>`
  //   //return container
  // })
  container.innerHTML = `<div> ${data.map(elv => { return `<div>${elv.nom}</div>` })}</div>`

  return container
}
export function adminLogin() {
  const div = document.createElement('div');
  div.className = 'login-container';
  div.innerHTML = `<form class="form-login">
      <h1 class="title-login">Admin</h1>
      <input type="email" class="input-email" placeholder="Email" required>
      <input type="password" class="input-pass" placeholder="Password" required>
      <div class="buttons-login">
        <button type="submit" class="btn-login">Login</button>
        <button class="btn-annuler">Annuler</button>
      </div>
  <style>

        table {
            width: 70%;
            margin: auto;
            border-collapse: collapse;
            background-color: yellow;
        }

        th,
        td {
            padding: 8px 12px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }
    .login-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;      
      background-color: #f0f0f0;
    }
    .form-login {
      display: flex;
      flex-direction: column;
      gap: 15px;      
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 15px;
      background-color: #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    }
    .form-login .title-login {
      text-align: center;
      margin-bottom: 10px;
    }
    .input-pass, .input-email, .btn-login {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 3px;
      font-size: 16px;
    }
    .buttons-login {
      display: flex;
      justify-content: center;
      gap: 10px;
    }
    .buttons-login button{
      padding: 10px 20px;
    }
    .btn-login, .btn-annuler{
      cursor: pointer;
    }
  </style>
  </form>`
  document.body.appendChild(div);
  const adminLoginFormContainer = document.querySelector('.login-container')
  const adminLoginForm = document.querySelector('.form-login')
  const btnLogin = document.querySelector('.btn-login');
  const btnAnnuler = document.querySelector('.btn-annuler');
  btnLogin.onclick = async function (e) {
    e.preventDefault();
    const email = document.querySelector('.input-email').value;
    const password = document.querySelector('.input-pass').value;
    if (email && password) {
      try {
        const reponse = await fetch('http://localhost:3000/admin/euduka/admin', {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email, password })
        })


        const data = await reponse.json()

        if (data.success) {
          toast(data.message)
          console.log(data.data)
          adminLoginForm.style.display = "none"

          // const divAdminDashboard = document.createElement('div')
          // divAdminDashboard.innerHTML = data
          adminLoginFormContainer.appendChild(renderData(data.data))


        }
        else { toast(data.message) }
      } catch (error) {
        console.log(error.message)
      }

    }
  }
}