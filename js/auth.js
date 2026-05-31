/* PASSWORD TOGGLE */

function togglePassword(){

const input =
document.getElementById(
"signup-password"
);

input.type =
input.type === "password"
? "text"
: "password";

}

function toggleConfirmPassword(){

const input =
document.getElementById(
"confirm-password-input"
);

input.type =
input.type === "password"
? "text"
: "password";

}

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

/* PASSWORD MATCH */

const passwordInput =
document.getElementById(
"signup-password"
);

const confirmPasswordInput =
document.getElementById(
"confirm-password-input"
);

const passwordStatus =
document.getElementById(
"password-status"
);

function checkPasswords(){

if(
confirmPasswordInput.value.length === 0
){

passwordStatus.textContent =
"Passwords must match.";

passwordStatus.style.color =
"#8f8f8f";

return;

}

if(
passwordInput.value ===
confirmPasswordInput.value
){

passwordStatus.textContent =
"Passwords match.";

passwordStatus.style.color =
"#00ff99";

}else{

passwordStatus.textContent =
"Passwords do not match.";

passwordStatus.style.color =
"#ff7070";

}

}

passwordInput.addEventListener(
"input",
checkPasswords
);

confirmPasswordInput.addEventListener(
"input",
checkPasswords
);

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
await window.createUserWithEmailAndPassword(
window.firebaseAuth,
email,
password
);

await window.sendEmailVerification(
userCredential.user
);

showPopup(
"Account Created",
"Verification email sent successfully."
);

}catch(error){

console.error(error);

showPopup(
"Error",
error.message
);

}

}
);

/* GOOGLE AUTH */

const googleSignup =
document.getElementById(
"google-signup"
);

googleSignup.addEventListener(
"click",
async()=>{

try{

const provider =
new window.GoogleAuthProvider();

await window.signInWithRedirect(
window.firebaseAuth,
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