import { conic } from "../../utils.js"

export function profile() {
    const objElv = JSON.parse(localStorage.getItem('profile'))
    const resultats = JSON.parse(localStorage.getItem('resultats')) || {}
    const div = document.createElement('div')
    div.className = "user-profile" 
    div.innerHTML = `<div class="profile-container">
        <img class="profile-previous" src="./assets/img/previous.svg" alt="Previous"/>
        <div class= "ligne"> NOM :</div> <h3>${objElv.nom}</h3>
        <div class= "ligne"> Prenom :</div> <h3>${objElv.prenom}</h3>
        <div class= "ligne"> Email :</div> <h3>${objElv.email}</h3>
        <div class= "ligne"> Minutes :</div> <h3>${parseInt(objElv.freeMins) * 5}</h3>
        <div>
            <h4> Mes résultats </h4>
            
            <div class="res-container">
                <div class="qcm-res">
                    <h4>QCM</h4>                    
                    <div class="resultat-score"> ${resultats.qcm?.score + '/10' || '0'} </div>
                    <div class="resultat-date"> ${resultats.qcm?.date || 'Date'} </div>
                    <div class="qcm-conic"> </div>
                    <div class="qcm-last-session last-session" > <i class="fa-solid fa-rotate-right"></i> </div>
                    
                </div>
                <div class="v-f-res">
                    <h4>Vrai/Faux</h4>
                    <div class="resultat-score"> ${resultats.vf?.score + '/10' || '0'} </div>
                    <div class="resultat-date"> ${resultats.vf?.date || 'Date'} </div>
                    <div class="vf-conic"> </div>
                    <div class="vf-last-session last-session"> <i class="fa-solid fa-rotate-right"></i> </div>
                </div>
                <div class="remplir-res">
                    <h4>Remplir les blancs</h4>
                    <div class="resultat-score"> ${resultats.remplir?.score || '0'} </div>
                    <div class="resultat-date"> ${resultats.remplir?.date || 'Date'} </div>
                    <div class="remplir-conic"> </div>
                    <div class="remplir-last-session last-session"> <i class="fa-solid fa-rotate-right"></i> </div>
                </div>
                <div class="resultat-ordreEv">
                    <h4>Evénement</h4>
                        <div class="resultat-score"> ${resultats.ordreEv?.score || '0'} </div>
                        <div class="resultat-date"> ${resultats.ordreEv?.date || 'Date'} </div>

                        <div class="ordreevlast-session last-session"> <i class="fa-solid fa-rotate-right"></i> </div>
                </div>
                <div class="resultat-ordrePh">
                    <h4>Evénement</h4>
                        <div class="resultat-score"> ${resultats.ordrePh?.score || '0'} </div>
                        <div class="resultat-date"> ${resultats.ordrePh?.date || 'Date'} </div>

                        <div class="oredreph-last-session last-session"> <i class="fa-solid fa-rotate-right"></i> </div>
                </div>
            </div>
        </div>
       
        <style>

            .user-profile{
                position: fixed;
                top: 54px; left: 0;
                width:100%;
                hheight: 100%;                
                background-color: #eee;
                display: flex;
                align-items: flex-start;
                justify-content: center;
                z-index: 1000;
            }
            .profile-container{
                position: relative;
                width: 50%;
                height: 90vh;
                ddisplay: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                overflow-y: auto;
            }
            .profile-container::-webkit-scrollbar {
                display: none;
            }
            .profile-previous{
                position: fixed;
                top: 10px; left: 10px;
                width: 30px; height: 30px;
                padding: 5px;
                border: 1px solid gray;
                border-radius: 50%;
                cursor: pointer;
                align-self: flex-start;
                margin-bottom: 20px;
                transition: background-color 0.3s ease;
            }
            
            .profile-previous:hover{
                background-color: rgb(240,240,240);
            }
                
            .ligne{
                width: 100%;
                background-color: rgb(220,220,220);
                padding: 10px;
                border-radius: 5px;
            }
            
            .res-container{
                width: 100%;
                display:grid;
                grid-template-columns: repeat(2, 6fr);
                gap: 20px;
            }
            .res-container > div{
                padding: 10px;
                border: 1px solid gray;
                border-radius: 5px;
                text-align: center;

            }
            
            .user-profile h4{
               margin-bottom: 10px;
            }
            .resultat-date{
                font-size: 10px;
                text-align: right;
                color: gray;
            }
            .qcm-conic{
                width: 40px;
                height: 40px;
            }
            .last-session{
                cursor: pointer
            }
        </style>
        </div>`
    document.body.style.overflow = "hidden"
    document.body.appendChild(div)

    const userProfile = document.querySelector('.profile-previous')
    const qcmConic = document.querySelector('.qcm-conic')
    const vfConic = document.querySelector('.vf-conic')
    const remplirConic = document.querySelector('.remplir-conic')

    qcmConic.appendChild(conic(resultats.qcm?.score, 10))
    vfConic.appendChild(conic(resultats.vf?.score, 10))
    remplirConic.appendChild(
        conic(resultats.remplir?.score.split('/')[0],
        resultats.remplir?.score.split('/')[1])
    )


    userProfile.addEventListener('click', () => {
        document.body.style.overflow = "auto"
        div.remove()
    })

}