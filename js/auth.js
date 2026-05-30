/* PASSWORD TOGGLES */

function togglePassword(){

const input =
document.getElementById("password-input");

if(input.type === "password"){

input.type = "text";

}else{

input.type = "password";

}

}

function toggleConfirmPassword(){

const input =
document.getElementById("confirm-password-input");

if(input.type === "password"){

input.type = "text";

}else{

input.type = "password";

}

}

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

confirmPasswordInput.addEventListener(
"input",
checkPasswords
);

}

/* DATE OF BIRTH */

document.addEventListener("DOMContentLoaded", () => {

const dobMonth = document.getElementById("dob-month");
const dobDay = document.getElementById("dob-day");
const dobYear = document.getElementById("dob-year");
const dobStatus = document.getElementById("dob-status");

if(!dobMonth || !dobDay || !dobYear) return;

const months = [
"January",
"February",
"March",
"April",
"May",
"June",
"July",
"August",
"September",
"October",
"November",
"December"
];

months.forEach((month,index)=>{
const option = document.createElement("option");
option.value = index + 1;
option.textContent = month;
dobMonth.appendChild(option);
});

for(let day = 1; day <= 31; day++){
const option = document.createElement("option");
option.value = day;
option.textContent = day;
dobDay.appendChild(option);
}

const currentYear = new Date().getFullYear();

for(let year = currentYear - 13; year >= 1900; year--){
const option = document.createElement("option");
option.value = year;
option.textContent = year;
dobYear.appendChild(option);
}

function validateDOB(){

if(!dobMonth.value || !dobDay.value || !dobYear.value) return;

const birthDate = new Date(
dobYear.value,
dobMonth.value - 1,
dobDay.value
);

const today = new Date();

let age = today.getFullYear() - birthDate.getFullYear();

const monthDifference = today.getMonth() - birthDate.getMonth();

if(
monthDifference < 0 ||
(monthDifference === 0 && today.getDate() < birthDate.getDate())
){
age--;
}

if(age >= 13){
dobStatus.textContent = "Standard account available.";
dobStatus.style.color = "#00ff99";
}else{
dobStatus.textContent = "Child account setup required.";
dobStatus.style.color = "#ff7070";
}

}

dobMonth.addEventListener("change", validateDOB);
dobDay.addEventListener("change", validateDOB);
dobYear.addEventListener("change", validateDOB);

});