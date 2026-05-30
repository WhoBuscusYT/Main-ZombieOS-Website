const shellText =
document.getElementById("shell-text");

if(shellText){

const shellLines = [

"> boot ZombieOS",
"> load ZSharp",
"> initialize runtime",
"> connect ecosystem",
"> prepare future_ui",
"> establish runtime_core"

];

let currentLine = 0;

function rotateShell(){

shellText.textContent =
shellLines
.slice(currentLine)
.concat(shellLines.slice(0,currentLine))
.join("\n\n");

currentLine++;

if(currentLine >= shellLines.length){
currentLine = 0;
}

}

rotateShell();

setInterval(
rotateShell,
3000
);

}

/* EASTER EGG */

document.addEventListener(
"keydown",
(event)=>{

if(event.key.toLowerCase() === "z"){

console.log(
"ZombieOS Runtime Initialized"
);

}

}
);