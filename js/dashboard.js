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

/* GREETING */

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

window.location.href =
"/login";

return;

}

const username =

user.displayName ||

user.email
.split("@")[0] ||

"User";

/* GREETING */

greeting.textContent =
`${getGreeting()}, ${username}`;

/* PLAYTIME */

document.getElementById(
"dashboard-playtime"
).textContent =
"No Data Available";

/* ACHIEVEMENTS */

document.getElementById(
"dashboard-achievements"
).textContent =
"No Data Available";

/* SUBSCRIPTION */

const subscription =
"FREE";

document.getElementById(
"dashboard-subscription"
).textContent =
subscription;

/* UPGRADE BUTTON */

if(
subscription === "ZOS+"
){

document.getElementById(
"upgrade-button"
).style.display =
"none";

}

}
);