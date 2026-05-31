import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
getAuth,
signInWithEmailAndPassword,
GoogleAuthProvider,
signInWithRedirect,
getRedirectResult
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import {
getFirestore,
doc,
getDoc,
setDoc
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

/* GOOGLE REDIRECT */

getRedirectResult(auth)

.then(async(result)=>{

if(result){

const user =
result.user;

const userRef =
doc(
db,
"users",
user.uid
);

const userSnap =
await getDoc(userRef);

if(!userSnap.exists()){

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

await setDoc(
counterRef,
{
lastUserId:newUserId
}
);

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

}

showPopup(
"Google Login Success",
`Welcome ${user.email}`
);

setTimeout(()=>{

window.location.href =
"/dashboard";

},1500);

}

})

.catch((error)=>{

console.error(error);

});

/* PAGE */

document.addEventListener(
"DOMContentLoaded",
()=>{

/* PASSWORD TOGGLE */

const passwordToggle =
document.getElementById(
"password-toggle"
);

const passwordInput =
document.getElementById(
"login-password"
);

passwordToggle.addEventListener(
"click",
()=>{

passwordInput.type =
passwordInput.type === "password"
? "text"
: "password";

}
);

/* EMAIL LOGIN */

const loginButton =
document.getElementById(
"login-button"
);

loginButton.addEventListener(
"click",
async()=>{

const email =
document.getElementById(
"login-email"
).value.trim();

const password =
document.getElementById(
"login-password"
).value;

try{

const userCredential =
await signInWithEmailAndPassword(
auth,
email,
password
);

if(
!userCredential.user.emailVerified
){

showPopup(
"Verify Email",
"Please verify your email before logging in."
);

return;

}

showPopup(
"Login Success",
`Welcome back ${email}`
);

setTimeout(()=>{

window.location.href =
"/dashboard";

},1500);

}catch(error){

console.error(error);

let errorMessage =
"Something went wrong.";

if(
error.code ===
"auth/user-not-found"
){

errorMessage =
"No account exists with that email.";

}

else if(
error.code ===
"auth/wrong-password"
){

errorMessage =
"Incorrect password.";

}

else if(
error.code ===
"auth/invalid-credential"
){

errorMessage =
"Incorrect email or password.";

}

else if(
error.code ===
"auth/user-disabled"
){

errorMessage =
"This account has been disabled.";

}

else if(
error.code ===
"auth/too-many-requests"
){

errorMessage =
"Too many login attempts. Try again later.";

}

showPopup(
"Login Error",
errorMessage
);
}

}
);

/* GOOGLE LOGIN */

const googleLogin =
document.getElementById(
"google-login"
);

googleLogin.addEventListener(
"click",
async()=>{

try{

const provider =
new GoogleAuthProvider();

await signInWithRedirect(
auth,
provider
);

}catch(error){

console.error(error);

showPopup(
"Google Error",
error.message
);

}

}
);

});