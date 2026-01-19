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
      const { _id, nom, prenom, email, tel, freeMins, resultats } = data.eleve
      const objElv = { _id, nom, prenom, email, tel, freeMins, resultats }
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
  const div = document.createElement('div');
  div.className = 'login-container';
  div.innerHTML = `<table>
    <thead>
        <tr>
          <td>Nom</td>
          <td>Prénom</td>
          <td>Email</td>
          <td>Compte</td>
          <!-- <td>Actions</td> -->
        </tr>
    </thead>
    <tbody>

      </tbody>        
  </table>
    <form class="form-login">
      <h1 class="title-login">Admin</h1>
      <input type="email" class="input-email" placeholder="Email" required>
      <input type="password" class="input-pass" placeholder="Password" required>
      <div class="buttons-login">
        <button type="submit" class="btn-login">Login</button>
        <button class="btn-annuler">Annuler</button>
      </div>
      
  <style>
        table {
            display:none;
            border-collapse: collapse;
            margin: 30px auto;
            width: 80%;
            color: rgb(74, 74, 74);
            font-size: 0.8rem;

        }

        thead tr {
            font-weight: bold;
        }
        thead td{
          font-weight: bold;
          padding: 10px;
          background-color: yellow;
        }
        thead td:nth-child(4){
          text-align: center
        }
        tr {
            border-bottom: 1px solid rgb(218, 218, 218);
        }

        tr:hover {
            background-color: rgb(228, 228, 228);
        }
         .recu {
            background-color: rgb(255, 146, 146);
        }

        td {
            padding: 5px;
        }

        table tbody tr>td:nth-child(1) {
            font-weight: bold;
        }

        table tbody tr>td:nth-child(4) {
            display: flex;
            align-items: center;
            justify-content: space-around;
            gap: 10px;
        }

        .type-compte {
            width: 80px;
            padding: 5px;
            color: rgb(55, 117, 83);
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            font-size: 0.6rem;
            font-weight: bold;
            text-align: center;
            border-radius: 10px;
            background-color: rgb(161, 222, 189);

        }

        .more {
            height: 25px;
            width: 25px;
            cursor: pointer;
        }

        .more img {
            width: 100%;
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
  const tableBody = document.querySelector('table tbody')

  btnLogin.onclick = async function (e) {
    e.preventDefault();
    const email = document.querySelector('.input-email').value;
    const password = document.querySelector('.input-pass').value;
    if (email && password) {
      try {
        const reponse = await fetch(API_URL + '/admin/euduka/admin', {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email, password })
        })


        const data = await reponse.json()

        if (data.success) {
          toast(data.message)
          console.log(data.data);

          adminLoginForm.style.display = "none"
          document.querySelector('table').style.display = "table"

          data.data.map((elv) => {
            const tr = document.createElement('tr')
            tr.className = elv.role == 'registred' ? 'registred' : 'recu'
            tr.innerHTML = `<td>${elv.nom}</td><td>${elv.prenom}</td>
            <td>${elv.email}</td>
            <td>
              <div class="type-compte">${elv.role == 'registred' ? 'Basic' : 'En attente'}</div>
              <div class="more"><img src="/client/assets/img/more.png" alt=""></div>
            </td>`
            tableBody.appendChild(tr)
          })
          const moreBtns = document.querySelectorAll('td .more')
          moreBtns.forEach((more, index) => {
            more.addEventListener('click', () => {


              !document.querySelector('.menu-more') && showMoreModal(adminLoginFormContainer, index, data.data)
            })
          })
        } else {
          toast(data.message)
        }
      } catch (error) {
        console.log(error.message)

      }

    }
  }
}

function showMoreModal(bloc, index, data) {
  const div = document.createElement('div')
  div.className = "menu-more"
  div.innerHTML = `<div class="menu-more-container">
    <div class="menu-more-close">
        <img src="/client/assets/img/times.svg" alt="">
    </div>

    <div class="details">
        <div class="nom">${data[index].nom} ${data[index].prenom}</div>
        <div class="email">${data[index].email}</div>
        <hr style="margin:20px 0" />

    </div>
    <div class="recue">
        <div class="num-recu">
            <div class="libel-num">N° du reçu : </div>
            <div class="num">8876765764653</div>
        </div>
        <div class="img-recu">
            <!-- form>
                <input type="file" accept="image/*" style="display: none;" name="upload-img" id="upload-img">
                <label for="upload-img" class="label-upload" >
                    <img class="upload-icon" src="/client/assets/img/upload-image.png" alt="">
                </label>
            </form -->
            <div class="libel-img-recu">L'image du reçu </div>

            <div class="show-img">
              <img src= "/client/assets/img/reçu.jpg" alt="qsd" />
            </div>
            <div class="devenir-premium ${data[index].role === 'attenteR' ? 'hide-devenir-premium' : null}">
              Premium
            </div>

        </div>
    </div>
</div>
<style>
    .hide-devenir-premium{display:none}
    .menu-more-close {
        display: flex;
        justify-content: flex-end;
        padding: 5px;
    }

    .menu-more-close img {
        display: block;
        width: 15px;
        cursor: pointer;
    }

    .menu-more {
      position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
      width: 240px;
      box-shadow: 0 0 5px black;
      border-radius: 15px;
      padding: 10px;
      margin: 30px auto;
      background-color: rgb(253, 248, 248);
    }

    .menu-more .details {
        text-align: center;
        font-weight: bold;
        color: rgb(61, 61, 61);
        margin-top: -10px;
    }

    .menu-more .details .email {
        font-size: 0.7rem;
        font-style: italic;
    }

    .num-recu {
        text-align: center;
    }

    .libel-num,
    .libel-img-recu {
      margin-top: 20px;
      text-align: center;
      font-weight: bold;
    }

    .menu-more .num {
        font-weight: bold;
        font-size: 1.2rem;
    }

    .img-recu .upload-icon {
        display: block;
        box-shadow: 0 0 3px white, 0 0 6px white, 0 0 10px white;
        width: 50px;
        height: 50px;
        margin: 15px auto;
        cursor: pointer;
    }

    .show-img {
        width: 150px;
        hheight: 150px;
        background-color: rgb(218, 218, 218);
        margin: 10px auto;
        border-radius: 15px;
    }
    .show-img img {
        width: 100%;
    }
    .img-uploaded {
        display: block;
        margin: auto;
        width: 50%;
        border-radius: 10px;
    }

    .img-full {
        position: fixed;
        height: 100vh;
        width: auto;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%)
    }
    .devenir-premium{
      width: 90px;
      padding: 10px;
      margin:15px auto;
      text-align: center;
      border-radius: 10px;
      background-color: rgb(161, 222, 189);
      cursor: pointer;
      }
    </style>`
  bloc.appendChild(div)

  const menuMoreClose = document.querySelector('.menu-more-close')
  menuMoreClose.addEventListener('click', () => {
    div.remove()
  })

  // const uploadImgInput = document.querySelector('.label-upload');
  // const showImg = document.querySelector('.show-img');
  // showImg.addEventListener('click', () => {
  //     console.log('qsdfiari');

  // })
  // console.log(typeof(uploadImgInput));

  // uploadImgInput.addEventListener('change', function (event) {
  //   const file = event.target.files[0];
  //   if (file) {
  //       const reader = new FileReader();
  //       reader.onload = function (e) {
  //           // Créer une nouvelle image et l'ajouter au conteneur
  //           const img = document.createElement('img');
  //           img.src = e.target.result;
  //           img.className = 'img-uploaded'; // Vider le conteneur
  //           if (showImg.children.length >= 1) { showImg.innerHTML = '' }
  //           showImg.appendChild(img); // Ajouter l'image
  //           console.log()
  //           img.addEventListener('click', () => {
  //               //show modal image
  //               img.classList.contains('img-full') ?
  //                   img.classList.remove('img-full') :
  //                   img.classList.add('img-full')
  //           })
  //       };
  //       reader.readAsDataURL(file);
  //   }
  // });



}