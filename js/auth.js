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

/* DOB VALIDATION */

function validateDOB(){

const dobMonth =
document.getElementById("dob-month");

const dobDay =
document.getElementById("dob-day");

const dobYear =
document.getElementById("dob-year");

const dobStatus =
document.getElementById("dob-status");

const ageDisplay =
document.getElementById("age-display");

if(
!dobMonth.value ||
!dobDay.value ||
!dobYear.value
){

ageDisplay.textContent =
"Select your date of birth.";

ageDisplay.style.color =
"#8f8f8f";

return;

}

const birthDate =
new Date(
parseInt(dobYear.value),
parseInt(dobMonth.value) - 1,
parseInt(dobDay.value)
);

const today =
new Date();

let age =
today.getFullYear() -
birthDate.getFullYear();

const monthDifference =
today.getMonth() -
birthDate.getMonth();

if(
monthDifference < 0 ||
(
monthDifference === 0 &&
today.getDate() <
birthDate.getDate()
)
){

age--;

}

ageDisplay.textContent =
`You are ${age} years old.`;

if(age >= 13){

dobStatus.textContent =
"Standard account available.";

dobStatus.style.color =
"#00ff99";

ageDisplay.style.color =
"#00ff99";

}else{

dobStatus.textContent =
"Child account setup required.";

dobStatus.style.color =
"#ff7070";

ageDisplay.style.color =
"#ff7070";

}

}

/* WAIT FOR PAGE */

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

});