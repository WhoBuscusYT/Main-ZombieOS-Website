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

/* SOCIALS */

.social-section{

margin-top:90px;

text-align:center;
}

.social-title{

font-size:clamp(2.4rem,8vw,5rem);

margin:
20px 0;
}

.social-description{

max-width:850px;

margin:
0 auto
40px;

line-height:1.8;

color:#d0d0d0;
}

.social-links{

display:flex;
flex-wrap:wrap;
justify-content:center;

gap:18px;
}

.social-links a{

display:flex;
align-items:center;
justify-content:center;
gap:12px;

padding:
18px 28px;

border-radius:18px;

background:
rgba(0,0,0,0.65);

border:
1px solid rgba(0,255,153,0.15);

color:#00ff99;

text-decoration:none;

transition:0.25s;
}

.social-links a img{

width:22px;
height:22px;

filter:
brightness(0)
invert(1);
}

.social-links a:hover{

transform:translateY(-4px);

box-shadow:
0 0 20px rgba(0,255,153,0.2);
}