// script.js

const shellMessages = [

`> boot ZombieOS
> load ZSharp
> connect ecosystem

SYSTEM ONLINE`,

`> connect Z#
> compile runtime
> execute startup

ZSHARP ACTIVE`,

`> load future_ui
> enable plugins
> prepare apps

UI READY`,

`> initialize services
> sync cloud
> verify modules

SERVICES READY`

];

function animateShell(id){

const shell = document.getElementById(id);

if(!shell) return;

function typeMessage(){

const message =
shellMessages[
Math.floor(Math.random() * shellMessages.length)
];

shell.textContent = "";

let i = 0;

const interval = setInterval(() => {

shell.textContent += message.charAt(i);

i++;

if(i >= message.length){

clearInterval(interval);

setTimeout(typeMessage,10000);

}

},35);

}

typeMessage();

}

animateShell("shell-text");
animateShell("shell-text-2");