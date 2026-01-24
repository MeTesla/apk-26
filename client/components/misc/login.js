import { creerCompte, toast } from './utils.js';
import { validateLoginForm, sanitizeInput } from '../../utils/validation.js';
import { safeFetchPost } from '../../utils/api.js';
import { API_URL } from '../../config/env.js';

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

    // 1️⃣ Valider formulaire
    const validation = validateLoginForm({ email, password })
    if (!validation.valid) {
      const errorMsg = Object.values(validation.errors).join('\n')
      toast(errorMsg)
      return
    }

    // 2️⃣ Nettoyer inputs
    const cleanData = {
      email: sanitizeInput(email, 254),
      password: password // Ne pas échapper le mot de passe
    }

    // 3️⃣ Envoyer données validées
    const result = await safeFetchPost(API_URL + '/login', cleanData)

    if (result.success) {
      const data = result.data
      localStorage.setItem('role', data.eleve.role)
      localStorage.setItem('token', data.eleve.token)
      console.log(data.eleve)
      const { _id, nom, prenom, email, tel, freeMins, resultats, role } = data.eleve
      const objElv = { _id, nom, prenom, email, tel, freeMins, resultats, role }
      localStorage.setItem('profile', JSON.stringify(objElv))

      toast("Connecté avec succès")
      setTimeout(() => window.location.reload(), 800)
    } else {
      // Afficher message d'erreur détaillé
      const errorMsg = result.error || 'Erreur de connexion'
      toast(errorMsg)
      console.error('Login failed:', result)
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
      const reponse = await fetch(API_URL + '/mdp-oublie', {
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

export function adminLogin() {
  const targetUrl = '/client/euduka/admin';

  let overlay = document.getElementById('admin-login-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'admin-login-overlay';
    // Style the overlay as a fixed full-screen container
    Object.assign(overlay.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100vh',
      backgroundColor: '#f0f0f0',
      zIndex: '10000',
      overflowY: 'auto',
      display: 'block'
    });
    document.body.appendChild(overlay);
  }

  const render = async (html) => {
    // This replaces the old content (form) with the new one (results)
    overlay.innerHTML = html;

    // 1. Setup Form Logic (Click on Login button)
    const btnLogin = overlay.querySelector('.btn-login');
    if (btnLogin) {
      btnLogin.onclick = async (e) => {
        e.preventDefault();
        const emailInput = overlay.querySelector('input[name="email"]');
        const passwordInput = overlay.querySelector('input[name="password"]');

        if (!emailInput || !passwordInput) return;

        const data = {
          email: emailInput.value,
          password: passwordInput.value
        };

        try {
          const res = await fetch(API_URL + targetUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'text/html'
            },
            body: JSON.stringify(data)
          });
          const nextHtml = await res.text();
          render(nextHtml);
        } catch (err) {
          console.error('[AdminLogin] Submit Error:', err);
          toast('Erreur de connexion');
        }
      };
    }

    // 2. Setup Close/Annuler Logic
    const closeButtons = overlay.querySelectorAll('.btn-annuler, .logout-btn');
    closeButtons.forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        overlay.remove();
      };
    });

    // 3. Execute scripts (for dashboard)
    overlay.querySelectorAll('script').forEach(oldScript => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  };

  // Initial Load
  fetch(API_URL + targetUrl)
    .then(res => res.text())
    .then(render)
    .catch(err => {
      console.error('[AdminLogin] Load Error:', err);
      toast('Erreur de chargement');
    });
}
