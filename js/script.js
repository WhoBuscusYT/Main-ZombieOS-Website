const shell = document.getElementById("shell-text");

if(shell){

const messages = [

`> boot ZombieOS
> load runtime
> initialize future_ui

SYSTEM ONLINE`,

`> connect ecosystem
> mount services
> load modules

RUNTIME READY`,

`> execute zsharp
> initialize plugins
> verify runtime

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

setInterval(updateShell, 7000);

}