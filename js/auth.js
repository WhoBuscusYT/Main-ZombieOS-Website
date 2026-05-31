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
.getElementById("popup-close")
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

/* HANDLE */

const handleInput =
document.getElementById(
"handle-input"
);

const handleStatus =
document.getElementById(
"handle-status"
);

handleInput.addEventListener(
"input",
()=>{

const value =
handleInput.value;

const valid =
/^[a-zA-Z0-9_.-]+$/.test(value);

if(
value.toLowerCase() === "root"
){

handleStatus.textContent =
"ROOT ACCESS DETECTED";

handleStatus.style.color =
"#ff0000";

return;

}

if(
value.toLowerCase() === "zombieos"
){

handleStatus.textContent =
"WARNING: SYSTEM HANDLE RESERVED";

handleStatus.style.color =
"#ff7070";

return;

}

if(valid){

handleStatus.textContent =
"Valid handle format.";

handleStatus.style.color =
"#00ff99";

}else{

handleStatus.textContent =
"Only letters, numbers, _, ., and - allowed.";

handleStatus.style.color =
"#ff7070";

}

}
);

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

/* DOB EASTER EGG */

const dobMonth =
document.getElementById(
"dob-month"
);

const dobDay =
document.getElementById(
"dob-day"
);

const dobYear =
document.getElementById(
"dob-year"
);

const createButton =
document.getElementById(
"create-account-button"
);

function checkDOB(){

if(
dobMonth.value === "9" &&
dobDay.value === "11" &&
dobYear.value === "2001"
){

createButton.textContent =
"Rest in peace to all the people that helped.";

}else{

createButton.textContent =
"Create Account";

}

}

dobMonth.addEventListener(
"change",
checkDOB
);

dobDay.addEventListener(
"change",
checkDOB
);

dobYear.addEventListener(
"change",
checkDOB
);

/* FIREBASE SIGNUP */

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

});