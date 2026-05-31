import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
getAuth,
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

/* FIREBASE */

const firebaseConfig = {

apiKey:
"AIzaSyDG0hSabeqYdGgSISOgvSnkOwATXDLiV9g",

authDomain:
"zombieos.firebaseapp.com",

projectId:
"zombieos",

storageBucket:
"zombieos.firebasestorage.app",

messagingSenderId:
"577624378484",

appId:
"1:577624378484:web:3e88e693724bde8e89d521"

};

const app =
initializeApp(firebaseConfig);

const auth =
getAuth(app);

/* NAVBAR LOGIN BUTTON */

const loginButton =
document.getElementById(
"navbar-login-button"
);

if(loginButton){

onAuthStateChanged(
auth,
(user)=>{

if(user){

loginButton.textContent =
"Dashboard";

loginButton.href =
"/dashboard";

}else{

loginButton.textContent =
"Login";

loginButton.href =
"/login";

}

}
);

}