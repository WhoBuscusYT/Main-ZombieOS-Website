const shellText = document.getElementById("shell-text");

const shellMessages = [

`> boot ZombieOS
> load ZSharp
> ecosystem.status()

SYSTEM ONLINE`,

`> connect Z#
> compile runtime
> execute startup

ZSHARP ACTIVE`,

`> initialize shell
> check modules
> launch prototype

RUNTIME READY`,

`> sync ecosystem
> verify runtime
> load packages

ALL SYSTEMS ONLINE`,

`> compile application
> mount runtime
> execute environment

EXECUTION SUCCESSFUL`

];

function typeText(text, i = 0) {

    if (!shellText) return;

    shellText.textContent = text.substring(0, i);

    if (i < text.length) {

        setTimeout(() => {

            typeText(text, i + 1);

        }, 22);
    }
}

function loadRandomShell() {

    const randomText =
        shellMessages[Math.floor(Math.random() * shellMessages.length)];

    typeText(randomText);
}

window.addEventListener("load", () => {

    loadRandomShell();

    setInterval(() => {

        loadRandomShell();

    }, 10000);

    // STATUS BAR

    const progressFill =
        document.querySelector(".progress-fill");

    if (progressFill) {

        setTimeout(() => {

            progressFill.style.width = "98%";

        }, 300);
    }
});