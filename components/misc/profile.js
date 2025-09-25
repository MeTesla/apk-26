

export function profile(){
    const objElv = JSON.parse(localStorage.getItem('profile'))

    const div=document.createElement('div')
    div.className="user-profile"
    div.innerHTML =`<div">
        <div> NOM :</div> <h3>${objElv.nom}</h3>
        <div> Prenom :</div> <h3>${objElv.prenom}</h3>
        <div> Email :</div> <h3>${objElv.email}</h3>
        <div> Minutes :</div> <h3>${objElv.freeMins}</h3>
        <style>
            .user-profile{
                position: fixed;
                top: 0; left: 0;
                width:100%;
                height: 100%;
                background-color: white;
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