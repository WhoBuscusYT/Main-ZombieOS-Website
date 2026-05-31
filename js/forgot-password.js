import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
getAuth,
sendPasswordResetEmail
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

/* PAGE */

document.addEventListener(
"DOMContentLoaded",
()=>{

const resetButton =
document.getElementById(
"reset-password-button"
);

resetButton.addEventListener(
"click",
async()=>{

const email =
document.getElementById(
"reset-email"
).value.trim();

if(!email){

showPopup(
"Missing Email",
"Please enter your email address."
);

return;

}

try{

await sendPasswordResetEmail(
auth,
email
);

showPopup(
"Reset Email Sent",
`A password reset link was sent to ${email}`
);

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
"auth/invalid-email"
){

errorMessage =
"Invalid email address.";

}

showPopup(
"Reset Error",
errorMessage
);

}

}
);

});