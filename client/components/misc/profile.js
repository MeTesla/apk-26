import { qcm } from "../act/qcm.js"
import { conic } from "../../utils.js"

export function profile() {
    const objElv = JSON.parse(localStorage.getItem('profile'))
    const resultats = JSON.parse(localStorage.getItem('profile')).resultats || {}
    const div = document.createElement('div')
    div.className = "user-profile"
    div.innerHTML = `<div class="profile-container">
        <img class="profile-previous" src="./assets/img/previous.svg" alt="Previous"/>
        <div class="profile-info">
            <div class= "ligne"> NOM :</div> <h3>${objElv?.nom || 'Visiteur'}</h3>
            <div class= "ligne"> Prenom :</div> <h3>${objElv?.prenom || 'Visiteur'}</h3>
            <div class= "ligne"> Email :</div> <h3>${objElv?.email || 'Visiteur'}</h3>
            <div class= "ligne"> Minutes :</div> <h3>${parseInt(objElv?.freeMins) * 5 || 'Visiteur'}</h3>
        
        </div>
        <div>
            <h4 class="mes-resultats"> Mes résultats </h4>
            
            <div class="res-container">
                <div class="qcm-res">
                    <h4>QCM</h4>                    
                    <div class="resultat-score"> ${resultats.qcm?.score + '/' + resultats.qcm?.nbrQsts || '0'} </div>
                    <div class="resultat-date"> ${resultats.qcm?.date || 'Date'} </div>
                    <div class="qcm-conic"> </div>
                    <div class="qcm-last-session last-session" > <i class="fa-solid fa-rotate-right"></i> </div>
                    
                </div>
                <div class="v-f-res">
                    <h4>Vrai/Faux</h4>
                    <div class="resultat-score"> ${resultats.vf?.score + '/' + resultats.vf?.nbrQsts || '0'} </div>
                    <div class="resultat-date"> ${resultats.vf?.date || 'Date'} </div>
                    <div class="vf-conic"> </div>
                    <div class="vf-last-session last-session"> <i class="fa-solid fa-rotate-right"></i> </div>
                </div>
                <div class="remplir-res">
                    <h4>Remplir les blancs</h4>
                    <div class="resultat-score"> ${resultats.remplir?.score + '/' + resultats.remplir?.nbrQsts || '0'} </div>
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
                top: 0; left: 0;
                width:100%;
                padding: 0 40px;
                background-color: #eee;
                display: flex;
                align-items: flex-start;
                justify-content: center;
            }
            .profile-container{

                width: 100%;
                height: 100vh;          
                overflow-y: auto;
            }
            .profile-container::-webkit-scrollbar {
                display: none;
            }
            .profile-previous{
                position: relative;
                top: 10px; left: 0px;
                width: 30px; height: 30px;
                margin-top: 10px;
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
            
            .profile-info{
                border: 1px solid gray;
                border-radius: 20px;
                padding: 20px;
                width: 50%;
                background-color: #fddbfbff;
            }
            .ligne{
                width: 100%;
                background-color: #c0bfff;
                padding: 10px;
                border-radius: 5px;
            }
            
            .res-container{
                width: 100%;
                display:grid;
                grid-template-columns: repeat(2, 6fr);
                gap: 20px;
                margin-bottom: 30px;
            }
            .res-container > div{
                padding: 10px;
                border: 1px solid gray;
                border-radius: 5px;
                text-align: center;

            }
            
            .user-profile h4{
               
               text-align: center;
               font-size: 1.4rem;
            }
            .mes-resultats{
                margin: 40px auto;
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
            
            @media screen and (min-width: 780px) {
                .res-container{
                    grid-template-columns: repeat(5, 6fr);                   
            }
            }
        </style>
        </div>`
    document.body.style.overflow = "hidden"
    document.body.appendChild(div)

    const userProfile = document.querySelector('.profile-previous')
    const qcmConic = document.querySelector('.qcm-conic')
    const vfConic = document.querySelector('.vf-conic')
    const remplirConic = document.querySelector('.remplir-conic')

    //QCM last session
    const qcmLastSession = document.querySelector('.qcm-last-session')
    qcmLastSession.onclick = () => {
        const qcmData = JSON.parse(localStorage.getItem('profile')).resultats.qcm?.lastSession || []
        if (qcmData.length === 0) return
        qcm(div, qcmData)
        document.body.style.overflow = "hidden"
    }

    qcmConic.appendChild(conic(resultats.qcm?.score, resultats.qcm?.nbrQsts))
    vfConic.appendChild(conic(resultats.vf?.score, resultats.vf?.nbrQsts))
    remplirConic.appendChild(
        conic(resultats.remplir?.score,
            resultats.remplir?.nbrQsts)
    )


    userProfile.addEventListener('click', () => {
        document.body.style.overflow = "auto"
        div.remove()
    })

}