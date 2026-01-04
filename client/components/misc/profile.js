import { qcm } from "../act/qcm.js"
import { vf } from "../act/vf.js"
import { conic } from "../../utils.js"
import { remplirVide } from "../act/remplirVide.js"
import { ordrePhrases } from "../act/ordrePhrases.js"
import { createLineChart } from "./utils.js"

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
                    <div class="qcm-chart line-chart"> </div>
                </div>
                <div class="v-f-res">
                    <h4>Vrai/Faux</h4>
                    <div class="resultat-score"> ${resultats.vf?.score + '/' + resultats.vf?.nbrQsts || '0'} </div>
                    <div class="resultat-date"> ${resultats.vf?.date || 'Date'} </div>
                    <div class="vf-conic"> </div>
                    <div class="vf-last-session last-session"> <i class="fa-solid fa-rotate-right"></i> </div>
                    <div class="vf-chart line-chart"> </div>
                </div>
                <div class="remplir-res">
                    <h4>Remplir les blancs</h4>
                    <div class="resultat-score"> ${resultats.remplir?.score + '/' + resultats.remplir?.nbrQsts || '0'} </div>
                    <div class="resultat-date"> ${resultats.remplir?.date || 'Date'} </div>
                    <div class="remplir-conic"> </div>
                    <div class="remplir-last-session last-session"> <i class="fa-solid fa-rotate-right"></i> </div>
                    <div class="remplir-chart line-chart"> </div>
                </div>
                <div class="resultat-ordrePh">
                    <h4>Ordre phrases</h4>
                        <div class="resultat-score"> ${resultats.ordrePhrases?.score + '/' + resultats.ordrePhrases?.nbrQsts || '0'} </div>
                        <div class="resultat-date"> ${resultats.ordrePhrases?.date || 'Date'} </div>
                        <div class="ordrePh-conic"> </div>
                        <div class="ordrePh-last-session last-session"> <i class="fa-solid fa-rotate-right"></i> </div>
                        <div class="ordrePh-chart line-chart"> </div>
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
                margin: auto;
                background-color: #fafafaff;
            }
            .ligne{
                width: 100%;
                background-color: #ececefff;
                padding: 10px;
                border-radius: 5px;
                margin-bottom: 10px;
            }
            .ligne + h3{
                margin-top: -10px;
                margin-bottom: 20px;
            }
            
            .res-container{
                width: 100%;
                display:grid;
                grid-template-columns: repeat(4, 6fr);
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
            .line-chart{
                width: 150px;}
            .myLineChart{
                width: 100% !important;}
            
            @media screen and (max-width: 580px) {
                .res-container{
                    grid-template-columns: repeat(1, 6fr);                   
                }
                .profile-info{
                    width: 100%;
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
    const ordrePhConic = document.querySelector('.ordrePh-conic')

    //QCM last session
    const qcmLastSession = document.querySelector('.qcm-last-session')
    qcmLastSession.onclick = () => {
        const qcmData = JSON.parse(localStorage.getItem('profile')).resultats.qcm?.lastSession || []
        if (qcmData.length === 0) return
        qcm(div, qcmData)
        document.body.style.overflow = "hidden"
    }

    //VF last session 
    const vfLastSession = document.querySelector('.vf-last-session')
    vfLastSession.onclick = () => {
        const vfData = JSON.parse(localStorage.getItem('profile')).resultats.vf?.lastSession || []
        if (vfData.length === 0) return
        vf(div, vfData)
        document.body.style.overflow = "hidden"
    }

    //oredrePhrase last session
    const ordrePhLastSession = document.querySelector('.ordrePh-last-session')
    ordrePhLastSession.onclick = () => {
        const ordrePhData = JSON.parse(localStorage.getItem('profile')).resultats.ordrePhrases?.lastSession || []
        if (ordrePhData.length === 0) return
        ordrePhrases(div, ordrePhData)
        document.body.style.overflow = "hidden"
        console.log('mlqksjdoiaer')
    }

    //Remplir last session
    const remplirLastSession = document.querySelector('.remplir-last-session')
    remplirLastSession.onclick = () => {
        const remplirData = JSON.parse(localStorage.getItem('profile')).resultats.remplir?.lastSession || null
        console.log(remplirData)
        if (remplirData[0] === '') return
        remplirVide(div, remplirData)
        document.body.style.overflow = "hidden"
    }

    qcmConic.appendChild(conic(resultats.qcm?.score, resultats.qcm?.nbrQsts))
    vfConic.appendChild(conic(resultats.vf?.score, resultats.vf?.nbrQsts))
    remplirConic.appendChild(
        conic(resultats.remplir?.score,
            resultats.remplir?.nbrQsts)
    )
    ordrePhConic.appendChild(
        conic(resultats.ordrePhrases?.score,
            resultats.ordrePhrases?.nbrQsts)
    )


    userProfile.addEventListener('click', () => {
        document.body.style.overflow = "auto"
        div.remove()
    })

    //------Charts    
    //QCM
    createLineChart(resultats.qcm?.scores, document.querySelector('.qcm-chart'))
    //VF
    createLineChart(resultats.vf?.scores, document.querySelector('.vf-chart'))
    //Ordre phrases
    createLineChart(resultats.ordrePhrases?.scores, document.querySelector('.ordrePh-chart'))
    //Remplir
    createLineChart(resultats.remplir?.scores, document.querySelector('.remplir-chart'))
}