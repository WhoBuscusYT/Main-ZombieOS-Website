import {
initializeApp
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
getAuth,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

const firebaseConfig = {

apiKey: "AIzaSyDG0hSabeqYdGgSISOgvSnkOwATXDLiV9g",

authDomain: "zombieos.firebaseapp.com",

projectId: "zombieos",

storageBucket: "zombieos.firebasestorage.app",

messagingSenderId: "577624378484",

appId: "1:577624378484:web:3e88e693724bde8e89d521",

measurementId: "G-LV0T97LGWP"

};

const app =
initializeApp(firebaseConfig);

const auth =
getAuth(app);

const accountLink =
document.getElementById("account-link");

onAuthStateChanged(auth, (user) => {

if (!accountLink) return;

if (user) {

accountLink.textContent =
"Dashboard";

accountLink.href =
"dashboard/index.html";

document.title =
"ZombieOS";

} else {

accountLink.textContent =
"Login";

accountLink.href =
"login.html";

document.title =
"ZombieOS";

}

});

const year =
document.getElementById("year");

if (year) {

year.textContent =
new Date().getFullYear();

}

const shellMessages = [

`> boot ZombieOS
> load ZSharp
> initialize runtime

SYSTEM ONLINE`,

`> connect Z#
> compile runtime
> execute startup

ZSHARP ACTIVE`,

`> sync ecosystem
> load future_ui
> enable plugins

UI READY`,

`> verify modules
> mount services
> render interface

ECOSYSTEM READY`

];

const shell =
document.getElementById("shell-text");

let shellIndex = 0;

function typeShell(message) {

if (!shell) return;

shell.textContent = "";

let i = 0;

function typing() {

if (i < message.length) {

shell.textContent +=
message.charAt(i);

i++;

setTimeout(typing, 28);

}

}

typing();

}

function rotateShell() {

typeShell(shellMessages[shellIndex]);

shellIndex++;

if (shellIndex >= shellMessages.length) {

shellIndex = 0;

}

}

rotateShell();

setInterval(rotateShell, 7000);