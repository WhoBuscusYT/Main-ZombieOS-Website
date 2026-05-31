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
"1:577624378484:web:3e88e693724bde8e89d521",

measurementId:
"G-LV0T97LGWP"

};

const app =
initializeApp(firebaseConfig);

const auth =
getAuth(app);

/* TIME GREETING */

function getGreeting(){

const hour =
new Date().getHours();

if(
hour >= 6 &&
hour < 12
){

return "Morning";

}

if(
hour >= 12 &&
hour < 17
){

return "Afternoon";

}

return "Evening";

}

/* AUTH */

onAuthStateChanged(
auth,
(user)=>{

const greeting =
document.getElementById(
"dashboard-greeting-text"
);

if(!user){

greeting.textContent =
`${getGreeting()}, Guest`;

return;

}

const username =
user.displayName ||
user.email ||
"User";

greeting.textContent =
`${getGreeting()}, ${username}`;

}
);