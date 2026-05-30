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