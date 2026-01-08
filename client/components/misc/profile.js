import { qcm } from "../act/qcm.js"
import { vf } from "../act/vf.js"
import { conic } from "../../utils.js"
import { remplirVide } from "../act/remplirVide.js"
import { ordrePhrases } from "../act/ordrePhrases.js"
import { createLineChart } from "./utils.js"

export function profile() {
    const { nom, prenom, email } = JSON.parse(localStorage.getItem('profile'))
    const { role } = JSON.parse(localStorage.getItem('profile'))
    const resultats = JSON.parse(localStorage.getItem('profile')).resultats || {}
    const div = document.createElement('div')
    div.className = "profile-infos"
    div.innerHTML = `<div class="profile-container">
       <div class="profile-header">
            <div class="profile-logo">
                <img src="./assets/img/euduka.png" alt="">
            </div>
            <div class="profile-date"></div>
        </div>
        <div class="profile-data">
            <div class="user-info">
                <img class="user-img" src="./assets/img/user-img.png" alt="">
                <div class="user-name">${nom + ' ' + prenom}</div>
                <div class="user-account">${role === 'registred' ? 'Premium' : 'Basic'}</div>
                <div class="user-email">${email}</div>
            </div>
            <div class="user-resultats">
               
                <div class="qcm-res">
                    <h4>QCM</h4>
                    <div class="last-session-container">
                        <h5 class="last-session-title">Dernière session</h5>                
                        <div class="last-session-data">                    
                            <div class="qcm-conic"> </div>
                            <div class="qcm-last-session last-session"> 
                                <i class="fa-solid fa-rotate-right"></i> 
                            </div>
                        </div>
                        <div class="last-session-date"> </div>
                    </div>
                    
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
        .profile-infos{
            position: absolute;
            height: 100vh;
            width: 100%;
            padding: 20px 40px;
            top: 0; left: 0;
            background-color: white;
            overflow: auto;
        }
        .profile-header{
            display: flex;
            justify-content: space-between;
            padding: 10px;
        }
        .profile-logo{
            width: 60px;
        }
        .profile-logo img{
            width: 100%;
        }
        .profile-data{
            display: flex;
            gap: 10px;
            align-self: flex-start;
            
        }
        .user-info{
            flex:1;
            align-self: flex-start;
            background-color: rgb(236, 236, 236);
            border-radius: 20px;               
            padding: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

        }
            .user-info .user-img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                box-shadow: 0 0 5px gray;
                padding: 5px;
            }
            .user-info .user-name {
                font-weight: bold;
                margin-top: 10px;
            }

            .user-info .user-account {
                font-size: 0.8rem;
                color: gray;
                font-style: italic
            }

            .user-info .user-email {
                font-size: 0.8rem;
                color: rgb(50, 50, 50);
                text-decoration: underline;
            }
    /*---------------------*/          
        .user-resultats{
            flex:3;
            background-color: rgb(236, 236, 236);
            border-radius: 20px;
            min-height: 70vh;
            padding: 20px;
            margin: 0 10px;
            display: grid;           
            grid-template-columns: repeat(3, 6fr);
            gap: 20px;

        }
        .user-resultats > div{
            padding: 10px;
            box-shadow: 0 0 4px rgba(153, 153, 153, 1);
            border-radius: 15px;
            text-align: center;
        }
        
        .user-resultats h4{               
            text-align: center;
            font-size: 1.2rem;
            font-weight: bold;
        }
        .last-session-container{
            width: 90%;        
            margin: 15px auto;         
            padding: 10px;
            border-radius: 5px 10px;
            background-color: #d1d1d16e;
            box-shadow: 0 0 5px white;
        }

        .last-session-data{
            width: 90%;        
            margin: auto;        
            display: flex;
            justify-content: space-between;
            align-items: center;
            ppadding: 10px;
            border-radius: 10px;

        }


            .qcm-conic, .last-session {
                width: 60px;
                height: 60px;
                display:flex; align-items: center;                
            }
            .qcm-conic .conic{
                width: 90%;
                height: 90%;
            }
            .last-session .fa-rotate-right{
                width: 70%;
                height: 70%;
                cursor: pointer
            }

            .line-chart{
                width: 90%;
                margin: auto;
                background-color: #d1d1d16e;
                box-shadow: 0 0 5px white;
                border-radius: 15px;
                padding: 10px;
            }
            .myLineChart{
                width: 100% !important;
            }
            
            @media screen and (min-width: 340px) {
                .profile-data{
                    fflex-direction: column;                    
                }
                .user-info{
                    aalign-self: flex-end;
                    margin: 10px;
                }
                .user-resultats{
                    grid-template-columns: repeat(1, 6fr);                   
                }
                .profile-info{
                    width: 100%;
                }
            }
            @media screen and (min-width: 769px){
            .user-resultats{
                    grid-template-columns: repeat(2, 6fr);                   
                }
            }

            @media screen and (min-width: 1200px){
            .user-resultats{
                    grid-template-columns: repeat(3, 6fr);                   
                }
            }
        </style>            
    </div>`
    document.body.style.overflow = "hidden"
    document.body.appendChild(div)

    const profileDate = document.querySelector('.profile-date')
    const userProfile = document.querySelector('.profile-logo')
    const qcmConic = document.querySelector('.qcm-conic')
    const vfConic = document.querySelector('.vf-conic')
    const remplirConic = document.querySelector('.remplir-conic')
    const ordrePhConic = document.querySelector('.ordrePh-conic')

    // Date
    const date = new Date()
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }
    profileDate.innerHTML = date.toLocaleDateString('fr-FR', options)


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