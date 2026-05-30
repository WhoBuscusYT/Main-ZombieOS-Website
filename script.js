/* =========================
   FOOTER YEAR
========================= */

const currentYear =
    new Date().getFullYear();

const yearText =
    document.getElementById("year");

if(yearText){
    yearText.textContent = currentYear;
}

/* =========================
   RUNTIME SHELL MESSAGES
========================= */

const shellMessages = [

`> boot ZombieOS
> load ZSharp
> ecosystem.status()

SYSTEM ONLINE`,

`> initializing runtime
> loading UI modules
> syncing ecosystem

READY`,

`> compile ZSharp
> connect runtime
> verify kernel

NO ERRORS DETECTED`,

`> startup.sequence()
> launch services
> establish network

CONNECTED`,

`> import system.core
> import ui.framework
> import runtime.engine

INITIALIZED`,

`> checking updates
> scanning modules
> validating systems

ALL SYSTEMS STABLE`

];

const shellText =
    document.getElementById("shellText");

function randomShellMessage(){

    const random =
        shellMessages[
            Math.floor(
                Math.random() *
                shellMessages.length
            )
        ];

    if(shellText){

        shellText.style.opacity = "0";

        setTimeout(() => {

            shellText.innerHTML =
                random.replace(/\n/g,"<br>");

            shellText.style.opacity = "1";

        },300);
    }
}

/* Randomize on page load */
randomShellMessage();

/* Change every 30 seconds */
setInterval(
    randomShellMessage,
    30000
);

/* =========================
   STATUS PAGE BARS
========================= */

const uptimeBars =
    document.querySelectorAll(".uptime-fill");

uptimeBars.forEach(bar => {

    const target =
        bar.getAttribute("data-percent");

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

        },12);
});