
export function modalFreeMins(success, message, lottie='failed', autoClose) {
  const div = document.createElement('div')
  div.className = "modal-creer-compte"
  div.innerHTML = `<div class="modal-card">
            <div class="modal-titre">
                <h3 class=${success ? 'modal-green': 'modal-red'}>${success ? 'Félicitaion !' : 'Erreur'}</h3>
                <div class="fermer-modal"><i class="fa-solid fa-circle-xmark"></i></div>                
            </div>
        <div class="modal-corps">           
            <h3>${message}</h3>
            <img src='./assets/img/${lottie}.png' alt="Compte déjà utilisé"/>
        </div>
        <div class="modal-footer">
            <div class="ok">Ok</div>
        </div>
        </div>

    <style>
        .modal-creer-compte{
          position: fixed;
          width: 100%; height: 100%;
          top:0; left:0 ;
          background-color: rgba(102, 102, 102, 0.73);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 113;
        }
        .modal-card{
            width: 240px;
            box-shadow: 0 0 3px rgb(214, 214, 214);
            background-color: rgba(255, 255, 255, 1);
            border-radius: 10px;
            overflow: hidden;
            opacity:0;
            transition: 0.5s;
            animation: appear linear  .3s forwards;
        }
        @keyframes appear {
            from{opacity: 0}
            to{ opacity: 1;}
        }
        .modal-titre{
            background-color: rgb(217, 226, 255);
            padding: 25px 10px ;
            margin: 0;
            position: relative;
        }
        .modal-red{color: red}
        .modal-green{color:green}
        .modal-titre h3{
            margin:0
        }
        .modal-titre svg{
            position: absolute;
            right: 5px;
            top: 5px;
            font-size: 25px;
            color: rgb(99, 141, 255);
            cursor: pointer
        }
        .modal-corps{
            position: relative;
            padding: 20px 20px 0 20px;
        }
        .modal-corps img{
            display: block;
            margin: 30px auto;
            height: 120px;
        }
        .modal-footer{
            text-align: center;
            padding: 10px;
            margin: 10px auto;
            text-align: center;
            width: 80px;
            border: 1px solid rgb(235, 235, 235);
            border-radius: 5px;
            cursor: pointer;
        }
        
    </style> `
  document.body.appendChild(div)
  document.body.style.position = 'fixed'

  const closeModal =document.querySelector('.modal-titre .fermer-modal')
  const ok =document.querySelector('.modal-footer div')
  if(autoClose){
    setTimeout(()=>{
        setTimeout(()=>{
            div.style.opacity="0"
        },1400)
        document.body.style.position="static"
        div.remove()
    }, 1500)
  }
  closeModal.addEventListener('click', ()=>{
    document.body.style.position="static"   
    div.remove() 
  })
  ok.addEventListener('click', ()=>{
    document.body.style.position="static"
    div.remove()
  })
}

export function modalLokedContent(){
    const div = document.createElement('div')
    div.className = "lock-container"
    div.innerHTML = `<div class="lock">
        <img src="./assets/img/lock.png"/>        
    </div>
    <style>
        .lock-container{
            z-index: 33;
            height: 100%; width: 100%;
            position: fixed;
            top:0; left:0;
            bbackground-color: red;
            display: flex;
            justify-content: center; align-items: center
        }
        .lock img{
            height: 120px;
        }
    </style>`
    document.body.appendChild(div)
    setTimeout(()=>{div.remove()}, 800)

}

export function modalDevenirPremium(){
    const div = document.createElement('div')
    div.className = "modal-premium-container"
    div.innerHTML = `<div class="modal-premium">
              
    <div class="header">
        <div></div>    
    </div>
    <div></div>
    </div>
        <style>
        .premium{}
        .devenir-premium{
           
        }
        .modoal-premium .header{
            height: 330px; width: 100%;            
            background-image : url('./assets/img/waves-premium2.png');
            background-size: 100%;
            background-repeat: no-repeat;
        }
        .lock img{
            height: 120px;
        }
    </style>`
    document.body.appendChild(div)
}