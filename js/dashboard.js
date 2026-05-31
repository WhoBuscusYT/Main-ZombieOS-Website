import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
getAuth,
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import {
getFirestore,
doc,
getDoc
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

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

const db =
getFirestore(app);

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
async(user)=>{

if(!user){

window.location.href =
"/login";

return;

}

try{

const userRef =
doc(
db,
"users",
user.uid
);

const userSnap =
await getDoc(userRef);

if(!userSnap.exists()){

return;

}

const userData =
userSnap.data();

/* USERNAME */

const username =
userData.username || "User";

/* GREETING */

document.getElementById(
"dashboard-greeting-text"
).textContent =

`${getGreeting()}, ${username}`;

/* SUBSCRIPTION */

const subscription =
userData.subscription || "FREE";

document.getElementById(
"dashboard-subscription"
).textContent =
subscription;

/* UPGRADE BUTTON */

const upgradeButton =
document.getElementById(
"upgrade-button"
);

if(
subscription === "ZOS+"
){

upgradeButton.style.display =
"none";

}

/* CREATED DATE */

const createdAt =
userData.createdAt || Date.now();

const createdDate =
new Date(createdAt);

document.getElementById(
"dashboard-created"
).textContent =

`${createdDate.getMonth()+1}/${createdDate.getDate()}/${createdDate.getFullYear()}`;

/* ACCOUNT AGE */

const ageMs =
Date.now() - createdAt;

const ageDays =
Math.floor(
ageMs / 86400000
);

document.getElementById(
"dashboard-age"
).textContent =

`${ageDays} day${ageDays !== 1 ? "s" : ""}`;

}catch(error){

console.error(
"Dashboard Error:",
error
);

}

}
);