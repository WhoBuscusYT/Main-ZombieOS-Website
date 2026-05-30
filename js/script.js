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

ZSHARP ACTIVE`

];

let current = 0;

function updateShell(){

shell.textContent = messages[current];

current++;

if(current >= messages.length){
current = 0;
}

}

updateShell();

setInterval(updateShell,7000);

}