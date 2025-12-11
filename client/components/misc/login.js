import { creerCompte, toast } from './utils.js';
//import { generateMenu } from './misc/utils.js';
export function login() {
    const div = document.createElement('div');
    div.className = 'login-container';
    div.innerHTML = `<div class="login-container">
    <form class="form-login">
      <h1 class="title-login">Login</h1>
      <input type="email" class="input-email" placeholder="Email" required>
      <input type="password" class="input-pass" placeholder="Password" required>
      <div class="buttons-login">
        <button type="submit" class="btn-login">Login</button>
        <button class="annuler">Annuler</button>
      </div>
      <div class="redirect">Vous n'avez pas de compte <span class="creer-compte-link">inscrivez-vous</span></div>
    </form>
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
      color: blue;
      cursor: pointer;      
    }
    .redirect span:hover{
    text-decoration: underline;
    }
  </style>
  </div>`
    
  document.body.appendChild(div);
  const btnLogin = document.querySelector('.btn-login');
  btnLogin.onclick = function (e) {
      submitLogin(e,div);
    };
  const btnAnnuler= document.querySelector('.buttons-login .annuler')
  btnAnnuler.onclick=function(){div.remove()}

  const creerCompteLink = document.querySelector('.creer-compte-link');
  creerCompteLink.onclick = function () {
      div.remove();
      creerCompte();
  };

  async function submitLogin(e,div){
      e.preventDefault();
      const email = document.querySelector('.input-email').value;
      const password = document.querySelector('.input-pass').value;
      // const url = 'https://euduka.vercel.app'      
      const url ='http://localhost:3000'
      const reponse = await fetch(url + '/login',{
        method: "POST",
        headers:{"content-type": "application/json"},
        body: JSON.stringify({email, password})
      })
      const data = await reponse.json()
      if(data.success){      
        localStorage.setItem('role', 'registred')
        localStorage.setItem('token', data.eleve.token)
        const {nom, prenom, email, tel, freeMins} = data.eleve
        const objElv={nom, prenom, email, tel, freeMins}
        localStorage.setItem('profile', JSON.stringify(objElv))
        toast("Connecté avec succès")
        setTimeout(()=> window.location.reload(), 1200)        
      } else{      
        toast(data.message)
      } 
  }
}