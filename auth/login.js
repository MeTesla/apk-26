const l=console.log
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyB7ZEZqKD_tc6sKHkYs7DXnoLNn62RiZBs",
    authDomain: "eudukabam.firebaseapp.com",
    databaseURL: "https://eudukabam-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "eudukabam",
    storageBucket: "eudukabam.appspot.com",
    messagingSenderId: "583629574211",
    appId: "1:583629574211:web:376ee3afcc3777a1ba44f6"
  };

  const app = initializeApp(firebaseConfig);
  import {getDatabase, ref, set, child, get} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js"
  const db = getDatabase()
  // -------------------- Authentication ----------------
   export function authenticateUser(){
    const dbref = ref(getDatabase())
    
    get(child(dbref, "userList/Hakim")).then((snapshot)=>{   
      let dbName = snapshot.val().username
      if(dbName!=="Hakim"){location.assign("https://www.google.com") }
        else{ 
          document.body.style.opacity="1"
          console.log('connected')  }
      })
      .catch((error)=>{
        location.assign("./figures.html")
      })
   }

export function userSuggests(nom, suggest){
    const dbRef= ref(db)
    get(child(dbRef, "suggestions/" + nom.value))
    .then(()=>{
            set(ref(db, "suggestions/" + nom.value),{
                nom: nom.value,
                suggestion: suggest.value,
            })
    .then(()=>{
                alert("Merci, votre suggestion a été bien envoyé")
            })
    .then(()=>{
            viderchamps()
            })
    .catch((error)=>{
                alert("error" + error)
            })
        
    })// fin first then
}
     //-----------------Register user in Firebase --------------------

   
const viderchamps=()=>{
    nom.value=""
    suggest.value=""
}

