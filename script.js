/* script.js */

const shell = document.getElementById("shell-text");

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

/* YEAR */

const year =
document.getElementById("year");

if(year){

year.textContent =
new Date().getFullYear();

}