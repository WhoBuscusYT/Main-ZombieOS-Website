import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
sendEmailVerification,
GoogleAuthProvider,
signInWithRedirect,
getRedirectResult
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import {
getFirestore,
doc,
setDoc,
getDoc
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

/* FIREBASE CONFIG */

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

/* INIT */

const app =
initializeApp(firebaseConfig);

const auth =
getAuth(app);

const db =
getFirestore(app);

/* GOOGLE REDIRECT RESULT */

getRedirectResult(auth)

.then(async(result)=>{

if(result){

console.log(
"GOOGLE LOGIN SUCCESS"
);

const user =
result.user;

/* USER DOC */

const userRef =
doc(
db,
"users",
user.uid
);

const userSnap =
await getDoc(userRef);

/* CREATE PROFILE IF NEW */

if(!userSnap.exists()){

/* COUNTER */

const counterRef =
doc(
db,
"metadata",
"counters"
);

const counterSnap =
await getDoc(counterRef);

let newUserId = 1;

if(counterSnap.exists()){

newUserId =
counterSnap.data().lastUserId + 1;

}

/* UPDATE COUNTER */

await setDoc(
counterRef,
{
lastUserId:newUserId
}
);

/* CREATE USER */

await setDoc(
userRef,
{

userId:newUserId,

username:
user.displayName || "Google User",

email:
user.email,

subscription:"FREE",

badges:[
{

id:"PROTOTYPE",

earnedAt:Date.now()

}
],

createdAt:Date.now()

}

);

console.log(
"GOOGLE USER PROFILE CREATED"
);

}

showPopup(
"Google Auth Success",
`Signed in as ${user.email}`
);

}

})

.catch((error)=>{

console.error(
"REDIRECT ERROR:",
error
);

console.log(
"ZombieOS Auth Initialized"
);

/* POPUP */

function showPopup(
title,
message
){

const popup =
document.createElement("div");

popup.className =
"zos-popup";

popup.innerHTML = `

<div class="zos-popup-card">

<h2>${title}</h2>

<p>${message}</p>

<button id="popup-close">

Continue

</button>

</div>

`;

document.body.appendChild(
popup
);

document
.getElementById(
"popup-close"
)
.addEventListener(
"click",
()=>{

popup.remove();

}
);

}

/* PAGE */

document.addEventListener(
"DOMContentLoaded",
()=>{

console.log(
"DOM LOADED"
);

/* PASSWORD TOGGLE */

const passwordToggle =
document.getElementById(
"password-toggle"
);

const passwordInput =
document.getElementById(
"signup-password"
);

if(passwordToggle){

passwordToggle.addEventListener(
"click",
()=>{

passwordInput.type =
passwordInput.type === "password"
? "text"
: "password";

}
);

}

/* EMAIL SIGNUP */

const createButton =
document.getElementById(
"create-account-button"
);

if(createButton){

createButton.addEventListener(
"click",
async()=>{

console.log(
"CREATE ACCOUNT CLICKED"
);

const username =
document.getElementById(
"signup-username"
).value.trim();

const email =
document.getElementById(
"signup-email"
).value.trim();

const password =
document.getElementById(
"signup-password"
).value;

if(
!username ||
!email ||
!password
){

showPopup(
"Missing Fields",
"Please fill out all fields."
);

return;

}

try{

console.log(
"ATTEMPTING SIGNUP"
);

/* CREATE AUTH ACCOUNT */

const userCredential =
await createUserWithEmailAndPassword(
auth,
email,
password
);

console.log(
"AUTH ACCOUNT CREATED"
);

/* VERIFY EMAIL */

await sendEmailVerification(
userCredential.user
);

console.log(
"EMAIL VERIFICATION SENT"
);

/* FIRESTORE PROFILE */

const uid =
userCredential.user.uid;

/* COUNTER */

const counterRef =
doc(
db,
"metadata",
"counters"
);

const counterSnap =
await getDoc(counterRef);

let newUserId = 1;

if(counterSnap.exists()){

newUserId =
counterSnap.data().lastUserId + 1;

}

/* UPDATE COUNTER */

await setDoc(
counterRef,
{
lastUserId:newUserId
}
);

/* USER PROFILE */

await setDoc(
doc(db,"users",uid),
{

userId:newUserId,

username:username,

email:email,

subscription:"FREE",

badges:[],

createdAt:Date.now()

}

);

console.log(
"USER PROFILE CREATED"
);

/* SUCCESS */

showPopup(
"Account Created",
"Check your email for the verification link."
);

}catch(error){

console.error(
"SIGNUP ERROR:",
error
);

showPopup(
"Signup Error",
error.message
);

}

}
);

}

/* GOOGLE AUTH */

const googleSignup =
document.getElementById(
"google-signup"
);

if(googleSignup){

googleSignup.addEventListener(
"click",
async()=>{

try{

console.log(
"GOOGLE AUTH START"
);

const provider =
new GoogleAuthProvider();

await signInWithRedirect(
auth,
provider
);

}catch(error){

console.error(
"GOOGLE AUTH ERROR:",
error
);

showPopup(
"Google Auth Error",
error.message
);

}

}
);

}

});