/* script.js */

/* SHELL */

const shell =
document.getElementById("shell-text");

if(shell){

const messages = [

`> boot ZombieOS
> load ZSharp
> initialize runtime

SYSTEM ONLINE`,

`> connect ecosystem
> prepare future_ui
> verify modules

RUNTIME READY`,

`> execute zsharp
> initialize plugins
> connect services

ZSHARP ACTIVE`,

`> checking dimensional stability...
> WARNING:
> reality.exe unstable

...just kidding :)`

];

let currentMessage = 0;
let currentChar = 0;

function typeMessage(){

const message =
messages[currentMessage];

shell.textContent =
message.substring(0,currentChar);

currentChar++;

if(currentChar <= message.length){

setTimeout(typeMessage,25);

}else{

setTimeout(() => {

currentChar = 0;

currentMessage++;

if(currentMessage >= messages.length){
currentMessage = 0;
}

typeMessage();

},3000);

}

}

typeMessage();

}

/* EASTER EGG */

let typedKeys = "";

document.addEventListener(
"keydown",
(event)=>{

typedKeys +=
event.key.toLowerCase();

if(
typedKeys.includes("zombie")
){

alert(
"ZombieOS Easter Egg Activated."
);

typedKeys = "";

}

if(
typedKeys.length > 30
){

typedKeys =
typedKeys.slice(-30);

}

});

/* PLATFORM DETECTION */

const platformText =
document.getElementById("platform-text");

const autoDownloadButton =
document.getElementById("auto-download-button");

const downloadContainer =
document.getElementById("download-container");

if(platformText){

const platform =
navigator.platform.toLowerCase();

if(platform.includes("win")){

platformText.textContent =
"Windows detected. Your system supports the latest version of ZOS.";

if(autoDownloadButton){

autoDownloadButton.href =
"downloads/zombieos-installer.exe";

}

}

else if(
platform.includes("mac")
){

platformText.innerHTML =
`
<div class="unsupported-warning">
Your OS doesn't support the latest version of ZOS.
</div>
`;

if(downloadContainer){
downloadContainer.innerHTML = "";
}

}

else if(
platform.includes("linux")
){

platformText.innerHTML =
`
<div class="unsupported-warning">
Your OS doesn't support the latest version of ZOS.
</div>
`;

if(downloadContainer){
downloadContainer.innerHTML = "";
}

}

else{

platformText.innerHTML =
`
<div class="unsupported-warning">
Unknown operating system detected.
</div>
`;

if(downloadContainer){
downloadContainer.innerHTML = "";
}

}

}

/* YEAR */

const year =
document.getElementById("year");

if(year){

year.textContent =
new Date().getFullYear();

}