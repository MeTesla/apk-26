

export function profile(){
    const objElv = JSON.parse(localStorage.getItem('profile'))

    const div=document.createElement('div')
    div.className="user-profile"
    div.innerHTML =`<div class="profile-container">
        <div class= "ligne"> NOM :</div> <h3>${objElv.nom}</h3>
        <div class= "ligne"> Prenom :</div> <h3>${objElv.prenom}</h3>
        <div class= "ligne"> Email :</div> <h3>${objElv.email}</h3>
        <div class= "ligne"> Minutes :</div> <h3>${parseInt(objElv.freeMins)*5}</h3>
        <div>
            <h4> Mes résultats </h4>
            <div class="res-container">
                <div class="qcm-res">
                    <h4>QCM</h4>
                    <div> ${JSON.parse(localStorage.getItem('resultatQcm'))?.score|| '0'} </div>
                </div>
                <div class="v-f-res">
                    <h4>Vrai/Faux</h4>
                    <div> ${JSON.parse(localStorage.getItem('resultatVf'))?.score|| '0'} </div>
                </div>
                <div class="remplir-res">
                    <h4>Remplir les blancs</h4>
                    <div> ${JSON.parse(localStorage.getItem('resultatRemplir'))?.score|| '0'} </div>
                </div>
                <div class="associer-res">
                    <h4>Associer</h4>
                    <div> ${JSON.parse(localStorage.getItem('resultatAssocier'))?.score|| '0'} </div>
                </div>
            </div>
        </div>
       
        <style>
            .user-profile{
                position: fixed;
                top: 0; left: 0;
                width:100%;
                height: 100%;                
                background-color: white;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .profile-container{
                width: 50%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            .ligne{
                width: 100%;
                background-color: rgb(220,220,220);
                padding: 10px;
                border-radius: 5px;
            }
            .user-profile h4{
                margin-top: 20px;
            }
            .res-container{
                display: flex;
                gap: 20px;
            }
            .res-container > div{
                border: 1px solid gray;
            }
        </style>
        </div>`
    document.body.style.overflow="hidden"
    document.body.appendChild(div)

    const userProfile = document.querySelector('.user-profile')
    userProfile.addEventListener('click', ()=>{
        document.body.style.overflow="auto"
        div.remove()
    })

}