const shellText = document.getElementById("shell-text");

const shellLines = [
"> boot ZombieOS",
"> load ZSharp",
"> initialize runtime",
"> connect ecosystem",
"> prepare future_ui",
"> enable plugins",
"",
"ZSHARP ACTIVE",
"UI READY"
];

let currentLine = 0;
let currentChar = 0;

function typeShell(){

if(currentLine >= shellLines.length){
return;
}

const line = shellLines[currentLine];

if(currentChar < line.length){

shellText.textContent += line.charAt(currentChar);

currentChar++;

setTimeout(typeShell, 30);

}else{

shellText.textContent += "\n";

currentLine++;
currentChar = 0;

setTimeout(typeShell, 220);

}

}

typeShell();

const accountLink =
document.getElementById("account-link");

const savedUser =
localStorage.getItem("zosUsername");

if(savedUser){

accountLink.textContent = "Dashboard";
accountLink.href = "dashboard/index.html";

}