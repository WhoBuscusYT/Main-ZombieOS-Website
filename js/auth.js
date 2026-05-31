/* PASSWORD TOGGLE */

function togglePassword(){

const input =
document.getElementById("password-input");

if(input){

input.type =
input.type === "password"
? "text"
: "password";

}

}

function toggleConfirmPassword(){

const input =
document.getElementById("confirm-password-input");

if(input){

input.type =
input.type === "password"
? "text"
: "password";

}

}

/* CAPTCHA + FIREBASE SIGNUP */

async function onSubmit(token){

const email =
document.getElementById("signup-email").value;

const password =
document.getElementById("signup-password").value;

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

alert(
"Verification email sent."
);

}catch(error){

alert(error.message);

}

}

window.onSubmit =
onSubmit;

/* PAGE LOAD */

document.addEventListener(
"DOMContentLoaded",
()=>{

/* HANDLE VALIDATION */

const handleInput =
document.getElementById("handle-input");

const handleStatus =
document.getElementById("handle-status");

if(handleInput){

handleInput.addEventListener(
"input",
()=>{

const value =
handleInput.value;

const valid =
/^[a-zA-Z0-9_.-]+$/.test(value);

/* ROOT */

if(
value.toLowerCase() === "root"
){

handleStatus.textContent =
"ROOT ACCESS DETECTED";

handleStatus.style.color =
"#ff0000";

return;

}

/* ZOMBIEOS */

if(
value.toLowerCase() === "zombieos"
){

handleStatus.textContent =
"WARNING: SYSTEM HANDLE RESERVED";

handleStatus.style.color =
"#ff7070";

return;

}

/* SUDO */

if(
value.toLowerCase() === "sudo"
){

handleStatus.textContent =
"Permission elevation denied.";

handleStatus.style.color =
"#ffaa00";

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

}

/* PASSWORD MATCH */

const passwordInput =
document.getElementById("password-input");

const confirmPasswordInput =
document.getElementById("confirm-password-input");

const passwordStatus =
document.getElementById("password-status");

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
document.getElementById("dob-month");

const dobDay =
document.getElementById("dob-day");

const dobYear =
document.getElementById("dob-year");

const createButton =
document.querySelector(".primary-auth-button");

function checkDOB(){

if(
dobMonth.value === "9" &&
dobDay.value === "11" &&
dobYear.value === "2001"
){

createButton.textContent =
"Rest in peace to all the people that helped.";

createButton.style.background =
"#555555";

createButton.style.color =
"white";

}else{

createButton.textContent =
"Create Account";

createButton.style.background =
"#00ff99";

createButton.style.color =
"black";

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

/* SIGNUP BUTTON */

const createAccountButton =
document.getElementById(
"create-account-button"
);

if(createAccountButton){

createAccountButton.addEventListener(
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

/* CAPTCHA */

const token =
await grecaptcha.enterprise.execute(
"6Ld0DgUtAAAAAJwI_aGUNIqDmeQoOtvfdt-SgfiU",
{
action:"signup"
}
);

/* FIREBASE */

const userCredential =
await window.createUserWithEmailAndPassword(
window.firebaseAuth,
email,
password
);

await window.sendEmailVerification(
userCredential.user
);

alert(
"Verification email sent."
);

}catch(error){

alert(error.message);

console.error(error);

}

}
);

}

});