const shellMessages = [

[
"> boot ZombieOS",
"> load ZSharp",
"> initialize runtime",

"ZSHARP ACTIVE"
],

[
"> connect Z#",
"> compile runtime",
"> execute startup",

"UI READY"
],

[
"> sync ecosystem",
"> load future_ui",
"> enable plugins",

"RUNTIME ONLINE"
]

];

const shellText =
document.getElementById("shell-text");

function typeShellMessage(messageArray){

if(!shellText) return;

const finalText =
messageArray.join("\n\n");

shellText.textContent = "";

let index = 0;

function type(){

if(index < finalText.length){

shellText.textContent +=
finalText.charAt(index);

index++;

setTimeout(type, 35);

}

}

type();

}

function randomShell(){

const randomMessage =
shellMessages[
Math.floor(Math.random() * shellMessages.length)
];

typeShellMessage(randomMessage);

}

randomShell();

setInterval(randomShell, 10000);