

export function profile(){
    const objElv = JSON.parse(localStorage.getItem('profile'))

    const div=document.createElement('div')
    div.className="user-profile"
    div.innerHTML =`
        <div class= "ligne"> NOM :</div> <h3>${objElv.nom}</h3>
        <div class= "ligne"> Prenom :</div> <h3>${objElv.prenom}</h3>
        <div class= "ligne"> Email :</div> <h3>${objElv.email}</h3>
        <div class= "ligne"> Minutes :</div> <h3>${parseInt(objElv.freeMins)*5}</h3>
        <h2> Résultats</h2>
        <h4>QCM </h4>
        <div> ${JSON.parse(localStorage.getItem('resultatQcm')).score} </div> 
        <style>
            .user-profile{
                position: fixed;
                top: 0; left: 0;
                width:100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-color: white;
            }
            .ligne{
                width: 100%;
                background-color: rgb(220,220,220);
                padding: 10px;
            }
        </style>`
    document.body.style.overflow="hidden"
    document.body.appendChild(div)

    const userProfile = document.querySelector('.user-profile')
    userProfile.addEventListener('click', ()=>{
        document.body.style.overflow="auto"
        div.remove()
    })
}