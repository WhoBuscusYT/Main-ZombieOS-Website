const shellText = document.getElementById("shell-text");

const shellMessages = [

`> boot ZombieOS
> initialize runtime
> load ecosystem

SYSTEM ONLINE`,

`> connect Z#
> compile runtime
> execute startup

ZSHARP ACTIVE`,

`> mount system_core
> validate packages
> start interface

CORE READY`,

`> authenticate runtime
> sync cloud nodes
> launch services

NETWORK STABLE`,

`> load future_ui
> enable plugins
> prepare apps

UI READY`
];

function typeMessage(message) {

    if (!shellText) return;

    shellText.textContent = "";

    let i = 0;

    const typing = setInterval(() => {

        shellText.textContent += message.charAt(i);

        i++;

        if (i >= message.length) {

            clearInterval(typing);
        }

    }, 22);
}

function randomShellMessage() {

    const random =
        shellMessages[
            Math.floor(Math.random() * shellMessages.length)
        ];

    typeMessage(random);
}

randomShellMessage();

setInterval(randomShellMessage, 10000);

/* STATUS BAR */

const statusFill =
    document.querySelector(".status-fill");

const statusText =
    document.querySelector(".status-text");

if (statusFill && statusText) {

    const target = 98;

    let current = 0;

    const animation = setInterval(() => {

        current++;

        statusFill.style.width = current + "%";

        statusText.textContent =
            current + "% Uptime";

        if (current >= target) {

            clearInterval(animation);
        }

    }, 15);
}