import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
sendEmailVerification,
GoogleAuthProvider,
signInWithRedirect
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

/* PASSWORD TOGGLE */

window.togglePassword =
function(){

const input =
document.getElementById(
"signup-password"
);

input.type =
input.type === "password"
? "text"
: "password";

};

/* PAGE */

document.addEventListener(
"DOMContentLoaded",
()=>{

/* EMAIL SIGNUP */

const createButton =
document.getElementById(
"create-account-button"
);

createButton.addEventListener(
"click",
async()=>{

const email =
document.getElementById(
"signup-email"
).value;

const password =
document.getElementById(
"signup-password"
).value;

try{

const userCredential =
await createUserWithEmailAndPassword(
auth,
email,
password
);

await sendEmailVerification(
userCredential.user
);

showPopup(
"Account Created",
"Verification email sent successfully."
);

}catch(error){

console.error(error);

showPopup(
"Signup Error",
error.message
);

}

}
);

/* GOOGLE */

const googleSignup =
document.getElementById(
"google-signup"
);

googleSignup.addEventListener(
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
"Google Auth Error",
error.message
);

}

}
);

});