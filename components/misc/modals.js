export function modalFreeMins(success, message, lottie='failed') {
  const div = document.createElement('div')
  div.className = "modal-creer-compte"
  div.innerHTML = `<div class="modal-card">
            <div class="modal-titre">
                <h3 class=${success ? 'modal-green': 'modal-red'}>Bienvenue chez Euduka</h3>
                <div class="fermer-modal"><i class="fa-solid fa-circle-xmark"></i></div>                
            </div>
        <div class="modal-corps">
            <h4>Cadeau de Bienvenue</h4>
            ${message}
            <lottie-player src="./assets/lotties/${lottie}.json" 
                background="transparent"  speed="0.8"
                                style="width: 200px" 
                loop autoplay>
            </lottie-player>
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

  closeModal.addEventListener('click', ()=>{
    document.body.style.position="static"   
    div.remove() 
  })
  ok.addEventListener('click', ()=>{
    document.body.style.position="static"
    div.remove()
  })
}