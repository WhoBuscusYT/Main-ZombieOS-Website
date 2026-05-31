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

/* PASSWORD MATCHING */

const passwordInput =
document.getElementById("password-input");

const confirmPasswordInput =
document.getElementById("confirm-password-input");

const passwordStatus =
document.getElementById("password-status");

function checkPasswords(){

if(
!passwordInput ||
!confirmPasswordInput
)return;

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

if(passwordInput){

passwordInput.addEventListener(
"input",
checkPasswords
);

}

if(confirmPasswordInput){

confirmPasswordInput.addEventListener(
"input",
checkPasswords
);

}

/* DOB VALIDATION */

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

function validateDOB(){

if(
!dobMonth ||
!dobDay ||
!dobYear
){
return;
}

if(
!dobMonth.value ||
!dobDay.value ||
!dobYear.value
){

if(ageDisplay){

ageDisplay.textContent =
"Select your date of birth.";

ageDisplay.style.color =
"#8f8f8f";

}

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

if(ageDisplay){

ageDisplay.textContent =
`You are ${age} years old.`;

}

/* STATUS */

if(age >= 13){

if(dobStatus){

dobStatus.textContent =
"Standard account available.";

dobStatus.style.color =
"#00ff99";

}

if(ageDisplay){

ageDisplay.style.color =
"#00ff99";

}

}else{

if(dobStatus){

dobStatus.textContent =
"Child account setup required.";

dobStatus.style.color =
"#ff7070";

}

if(ageDisplay){

ageDisplay.style.color =
"#ff7070";

}

}

}

/* DOB EVENTS */

if(dobMonth){

dobMonth.addEventListener(
"input",
validateDOB
);

dobMonth.addEventListener(
"change",
validateDOB
);

}

if(dobDay){

dobDay.addEventListener(
"input",
validateDOB
);

dobDay.addEventListener(
"change",
validateDOB
);

}

if(dobYear){

dobYear.addEventListener(
"input",
validateDOB
);

dobYear.addEventListener(
"change",
validateDOB
);

}

});