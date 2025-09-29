export function inscrire(){
 const html=` <section class="header">
  <div class="logo">EUDUKA</div>
  <div class="titre">Créer un compte</div>
 </section>
 <div class="wave">
  <img src="./assets/img/wave.svg" alt="">
 </div>
 <section class="forumlaire">
  <div class="form-container">
   <div class="grp-nom">
    <label for="text">Nom</label>
    <input type="text" id="nom"/>
   </div>
   <div class="grp-pw">
    <label for="pw">Mot de passe</label>
    <input type="password" id="pw">
   </div>
   <div class="grp-av">
    <span class="avatar">Avatar</span>
    <div class="avatars"> </div>
   </div>
  </div> 
   <div class="creer">Créer un compte </div>
   <div class="ou">
    Ou bien
   </div>
   <div class="connecter">Se connecter </div>
   
  <style>
   *{margin: 0; padding:0; box-sizing: border-box;}
   :root{
    --blue: #7E57C2;
    --vert: #086972;
   }
   .header{
    height: 30vh;
    background-color: var(--blue);
    color: white;
    display: flex; flex-direction: column;
    align-items:center;justify-content:center
   }
   .header .logo{
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
   }
   .header .titre{
    font-size: 1.7rem;
    margin-top: 30px;
   }
   .wave{
    width: 100%;
    margin-top: -30px;
    height: 100px;
   }
   .wave img{
    width: 100%;
   }
   .form-container{
    width: 100%;
    display: flex; flex-direction: column;
    justify-content: center; align-items: center; gap: 20px;
   }
   .grp-nom, .grp-pw, .grp-av{
    position: relative;
   }
   .grp-nom label, .grp-pw label, .grp-av span{
    position: absolute;
    top:-10px; left: 20px;
    width: 70px;
    background-color: white;
    text-align: center;
    color: gray;
   }
   .grp-pw label{width: 120px;  }
   .grp-nom input, .grp-pw input{
    width: 250px;
    height: 40px;
    padding: 0 15px;
   }
   .grp-av .avatars{
    height: 90px;
    width: 250px;
    border: 1px solid gray;
   }
   .creer, .connecter{
    width: 70%;
    height:40px;
    font-size: 1rem;
    border: 1px solid gray;
    border-radius: 10px;
    line-height: 40px;
    text-align: center;
    margin: 10px auto;
    background-color: var(--blue);
    color: white;
   }
   .connecter{
    background-color: var(--vert) ;
   }
   .ou{
    text-align: center;
    color: gray;
   }
  </style>
 </section>`

const insc=document.createElement('div')
insc.innerHTML=html
insc.classList.add('inscrire')
document.body.appendChild(insc)

}