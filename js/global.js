/* FOOTER YEAR */

const year =
document.getElementById("year");

if(year){

year.textContent =
new Date().getFullYear();

}

/* GLOBAL EASTER EGG */

let typedKeys = "";

document.addEventListener(
"keydown",
(event)=>{

typedKeys +=
event.key.toLowerCase();

if(
typedKeys.includes("zombie")
){

console.log(
"ZombieOS Runtime Initialized"
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

/* GLOBAL FLOAT EFFECT */

const floatingCards =
document.querySelectorAll(".floating-card");

floatingCards.forEach((card)=>{

card.addEventListener(
"mousemove",
(event)=>{

const rect =
card.getBoundingClientRect();

const x =
event.clientX - rect.left;

const y =
event.clientY - rect.top;

const centerX =
rect.width / 2;

const centerY =
rect.height / 2;

const rotateX =
((y - centerY) / 25) * -1;

const rotateY =
(x - centerX) / 25;

card.style.transform =
`
perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-8px)
`;

});

card.addEventListener(
"mouseleave",
()=>{

card.style.transform =
"translateY(0px)";

});

});