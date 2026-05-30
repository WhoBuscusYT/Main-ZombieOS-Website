const shellText = document.getElementById("shell-text");

const shellMessages = [

`> boot ZombieOS
> load ZSharp
> ecosystem.status()

SYSTEM ONLINE`,

`> initialize runtime
> loading modules
> checking kernel

RUNTIME READY`,

`> connect ecosystem
> sync packages
> verify systems

CONNECTION STABLE`,

`> launch prototype
> enable holographic ui
> initialize shell

PROTOTYPE ACTIVE`,

`> load runtime api
> initialize events
> verify permissions

EVENT SYSTEM READY`,

`> scanning future systems
> checking app support
> loading extensions

ECOSYSTEM EXPANDING`,

`> connect Z#
> compile runtime
> execute startup

ZSHARP ACTIVE`,

`> verifying systems
> monitoring uptime
> securing runtime

ALL SYSTEMS NOMINAL`

];

let currentMessage = 0;

function typeMessage(message) {

    shellText.textContent = "";

    let index = 0;

    const typing = setInterval(() => {

        shellText.textContent += message.charAt(index);

        index++;

        if (index >= message.length) {
            clearInterval(typing);
        }

    }, 25);
}

function randomShellMessage() {

    const randomIndex = Math.floor(Math.random() * shellMessages.length);

    currentMessage = randomIndex;

    typeMessage(shellMessages[randomIndex]);
}

randomShellMessage();

setInterval(() => {
    randomShellMessage();
}, 10000);



/* STATUS PAGE ANIMATION */

const uptimeFill = document.querySelector(".uptime-fill");
const uptimePercent = document.querySelector(".uptime-percent");

if (uptimeFill && uptimePercent) {

    const target = 98;

    let current = 0;

    const uptimeAnimation = setInterval(() => {

        current++;

        uptimeFill.style.width = current + "%";

        uptimePercent.textContent = current + "% Uptime";

        if (current >= target) {
            clearInterval(uptimeAnimation);
        }

    }, 20);

}



/* COPYRIGHT YEAR */

const yearText = document.getElementById("copyright-year");

if (yearText) {
    yearText.textContent = new Date().getFullYear();
}