const shellMessages = [

`> boot ZombieOS
> load ZSharp
> connect ecosystem

SYSTEM ONLINE`,

`> connect Z#
> compile runtime
> execute startup

ZSHARP ACTIVE`,

`> load future_ui
> enable plugins
> prepare apps

UI READY`,

`> initialize services
> sync cloud
> verify modules

SERVICES READY`

];

function animateShell(id){

const shell = document.getElementById(id);

if(!shell) return;

function typeMessage(){

const message =
shellMessages[
Math.floor(Math.random() * shellMessages.length)
];

shell.textContent = "";

let i = 0;

const interval = setInterval(() => {

shell.textContent += message.charAt(i);

i++;

if(i >= message.length){

clearInterval(interval);

setTimeout(typeMessage,10000);

}

},35);

}

typeMessage();

}

animateShell("shell-text");
animateShell("shell-text-2");

/* =========================
   FIREBASE LOGIN DETECTION
========================= */

import("https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js")
.then(async ({ initializeApp }) => {

const { getAuth, onAuthStateChanged } =
await import("https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js");

const firebaseConfig = {
apiKey: "AIzaSyDG0hSabeqYdGgSISOgvSnkOwATXDLiV9g",
authDomain: "zombieos.firebaseapp.com",
projectId: "zombieos",
storageBucket: "zombieos.firebasestorage.app",
messagingSenderId: "577624378484",
appId: "1:577624378484:web:3e88e693724bde8e89d521",
measurementId: "G-LV0T97LGWP"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {

const loginLinks =
document.querySelectorAll('a[href="login.html"]');

if(user){

loginLinks.forEach(link => {

link.textContent = "Dashboard";
link.href = "dashboard/index.html";

});

}

});

});