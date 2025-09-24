// Afficher une notification simple
import {generateMenu} from '../../main.js'
import { modalFreeMins } from './modals.js'


export function toast(msg){
    Toastify({
        gravity: 'bottom',
        text: msg,
        className: "toast-id",
        position:  "center",
        close: true
    }).showToast();
}

export function creerCompte(){
    //if(localStorage.getItem('token')) return
    const modal = document.createElement('div')
    modal.className="creer-compte-page"
    modal.innerHTML=`<div class="form-container" style="display:nnone">
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
    annuler.onclick=function(){modal.remove()   }

    const envoyer = document.querySelector('.envoyer')
    envoyer.onclick= function(){submitCreerCompte()}
  }

  async function submitCreerCompte(){
      const nom = document.querySelector('.nom').value        
      const prenom = document.querySelector('.prenom').value        
      const email = document.querySelector('.email').value        
      const tel = document.querySelector('.tel').value        
      // e.preventDefault()
      const reponse = await fetch('http://localhost:3000/creer-compte',{
            method: "POST",
            headers:{"content-type": "application/json"},
            body: JSON.stringify({nom, prenom, email, tel})
          })    
      const data = await reponse.json()
      console.log(data);
      if(data.success){
        localStorage.setItem('token',data.token)
        localStorage.setItem('role', 'registred')

        document.querySelector('.user-menu').remove()
        generateMenu(localStorage.getItem('role'), document.querySelector('.menu'))
        
        
        modalFreeMins(true, data.message, 'winner')
        document.querySelector('.creer-compte-page').remove()
      } else{
        modalFreeMins(false, data.message, 'failed')
      
      }
      
      //location.reload()
    }
  