

export function profile(){

    const div=document.createElement('div')
    div.className="user-profile"
    div.innerHTML =`<div">
        Profile
        <style>
            .user-profile{
                position: fixed;
                top: 0; left: 0;
                width:100%;
                height: 100%;
                background-color: lime;
            }
        </style>
    </div>`
    document.body.style.overflow="hidden"
    document.body.appendChild(div)

    const userProfile = document.querySelector('.user-profile')
    userProfile.addEventListener('click', ()=>{
        div.remove()
    })
}