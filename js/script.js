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

} else {

accountLink.textContent =
"Login";

accountLink.href =
"login.html";

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

ECOSYSTEM READY`,

`> start prototype
> scan status
> link shell

ZOS ONLINE`

];

const shell =
document.getElementById("shell-text");

function typeShell(message) {

if (!shell) return;

shell.textContent = "";

let i = 0;

function type() {

if (i < message.length) {

shell.textContent +=
message.charAt(i);

i++;

setTimeout(type, 25);

}

}

type();

}

function randomShell() {

const message =
shellMessages[
Math.floor(Math.random() * shellMessages.length)
];

typeShell(message);

}

randomShell();

setInterval(randomShell, 10000);