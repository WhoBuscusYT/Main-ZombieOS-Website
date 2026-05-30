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

`> easter_egg.scan()
> anomaly detected
> zombie protocol awake

BRAINS... JUST KIDDING`

];

let currentMessage = 0;
let currentChar = 0;

function typeMessage(){

const message = messages[currentMessage];

shell.textContent = message.substring(0,currentChar);

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

const year = document.getElementById("year");

if(year){
year.textContent = new Date().getFullYear();
}