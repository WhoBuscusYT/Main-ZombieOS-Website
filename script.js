/* =========================
   FOOTER YEAR
========================= */

const year = document.getElementById("year");

if(year){
    year.textContent =
        new Date().getFullYear();
}

/* =========================
   TERMINAL SYSTEM
========================= */

const terminal =
    document.getElementById("shell-text");

const shellMessages = [

`> boot ZombieOS
> load ZSharp
> ecosystem.status()

SYSTEM ONLINE`,

`> initializing runtime
> syncing UI systems
> loading modules

READY`,

`> startup.sequence()
> verify ecosystem
> connect runtime

CONNECTED`,

`> compile ZSharp
> verify kernel
> initialize engine

NO ERRORS DETECTED`,

`> import system.core
> import ui.framework
> import runtime.engine

INITIALIZED`,

`> checking updates
> validating systems
> scanning modules

ALL SYSTEMS STABLE`

];

let typingSpeed = 22;

function typeMessage(text){

    if(!terminal) return;

    terminal.textContent = "";

    let index = 0;

    function type(){

        if(index < text.length){

            terminal.textContent +=
                text.charAt(index);

            index++;

            setTimeout(
                type,
                typingSpeed
            );
        }
    }

    type();
}

function randomShellMessage(){

    const randomMessage =
        shellMessages[
            Math.floor(
                Math.random() *
                shellMessages.length
            )
        ];

    terminal.style.opacity = "0";

    setTimeout(() => {

        terminal.style.opacity = "1";

        typeMessage(randomMessage);

    },250);
}

/* Random message on page load */
randomShellMessage();

/* Rotate every 30 seconds */
setInterval(
    randomShellMessage,
    30000
);

/* =========================
   STATUS BARS
========================= */

const uptimeBars =
    document.querySelectorAll(".uptime-fill");

uptimeBars.forEach(bar => {

    const target =
        parseInt(
            bar.getAttribute("data-percent")
        );

    let width = 0;

    const interval =
        setInterval(() => {

            if(width >= target){

                clearInterval(interval);

            }else{

                width++;

                bar.style.width =
                    width + "%";
            }

        },10);
});