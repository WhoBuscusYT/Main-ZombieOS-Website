const shellText =
document.getElementById(
"shell-text"
);

if(shellText){

const shellMessages = [

[
"> boot ZombieOS",
"> load ZSharp",
"> initialize runtime",
"> connect ecosystem"
],

[
"> loading user interface",
"> preparing dashboard",
"> syncing services",
"> startup complete"
],

[
"> checking integrity",
"> loading modules",
"> establishing runtime_core",
"> ready"
],

[
"> welcome to ZombieOS",
"> prototype online",
"> ecosystem connected",
"> awaiting commands"
]

];

let currentMessage = 0;

async function typeText(text){

shellText.textContent = "";

for(
let i = 0;
i < text.length;
i++
){

shellText.textContent +=
text[i];

await new Promise(
resolve =>
setTimeout(
resolve,
35
)
);

}

}

async function shellLoop(){

while(true){

const message =
shellMessages[
currentMessage
].join("\n\n");

await typeText(
message
);

await new Promise(
resolve =>
setTimeout(
resolve,
10000
)
);

currentMessage++;

if(
currentMessage >=
shellMessages.length
){
currentMessage = 0;
}

}

}

shellLoop();

}

/* EASTER EGG */

document.addEventListener(
"keydown",
event => {

if(
event.key.toLowerCase() ===
"z"
){

console.log(
"ZombieOS Runtime Initialized"
);

}

}
);