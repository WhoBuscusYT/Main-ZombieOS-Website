import {
auth,
db
}
from "/js/firebase.js";

import {
onAuthStateChanged,
signOut
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import {
doc,
getDoc
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

/* =========================
   NAVBAR
========================= */

function buildNavbar(user,userData){

const navbar =
document.getElementById(
"navbar"
);

if(!navbar){
return;
}

let accountHTML = `
<a
href="/login"
class="nav-button"
>
Login
</a>
`;

if(user){

const avatar =
userData?.avatarBase64 ||
userData?.avatar ||
userData?.profilePicture ||
user.photoURL ||
"/images/default-avatar.png";

const badges =
userData?.badges || [];

const isDev =
badges.includes("DEV");

const isStaff =
badges.includes("STAFF");

accountHTML = `

<div class="profile-menu">

<img
id="navbar-pfp"
class="navbar-pfp"
src="${avatar}"
>

<div
id="profile-dropdown"
class="profile-dropdown"
>

<a href="/dashboard">
Dashboard
</a>

<a href="/social">
Social
</a>

<a href="/dashboard/settings">
Settings
</a>

${isDev ? `
<a href="/analytics">
Analytics
</a>
` : ""}

${isStaff ? `
<a href="/staff">
Staff
</a>
` : ""}

<button id="logout-button">
Logout
</button>

</div>

</div>

`;

}

navbar.innerHTML = `

<header class="navbar">

<div class="navbar-top">

<a
href="/"
class="logo"
>

ZombieOS

</a>

<div class="navbar-account">

${accountHTML}

</div>

<button id="navbar-toggle">
☰ Menu
</button>

</div>

<nav class="nav-links">

<a href="/">
Home
</a>

<a href="/zsharp">
Z#
</a>

<a href="/downloads">
Downloads
</a>

<a href="/versions">
Versions
</a>

<a href="/status">
Status
</a>

<a href="/devlog">
Devlog
</a>

<a href="/docs">
Docs
</a>

<a href="/community">
Community
</a>

<a href="/tickets">
Support
</a>

</nav>
</header>

`;

if(user){

const pfp =
document.getElementById(
"navbar-pfp"
);

const dropdown =
document.getElementById(
"profile-dropdown"
);

pfp.onclick = function(){

dropdown.classList.toggle(
"show"
);

};

const logout =
document.getElementById(
"logout-button"
);

logout.onclick =
async function(){

await signOut(auth);

window.location.href =
"/";

};

}

}

/* =========================
   FOOTER
========================= */

function buildFooter(){

const footer =
document.getElementById(
"footer"
);

if(!footer){
return;
}

footer.innerHTML = `

<footer>

<h2>

ZombieOS

</h2>

<div class="footer-links">

<a href="/">
Home
</a>

<a href="/downloads">
Downloads
</a>

<a href="/versions">
Versions
</a>

<a href="/status">
Status
</a>

</div>

<p>

ZombieOS / ZOS ©
<span id="year">
${new Date().getFullYear()}
</span>

</p>

</footer>

`;

}

/* =========================
   POPUPS
========================= */

window.showPopup =
function(
title,
message
){

alert(
title +
"\n\n" +
message
);

};

/* =========================
   INIT
========================= */

onAuthStateChanged(
auth,
async function(user){

let userData = null;

if(user){

try{

const userDoc =
await getDoc(
doc(
db,
"users",
user.uid
)
);

if(userDoc.exists()){

userData =
userDoc.data();

}

}catch(error){

console.error(
error
);

}

}

buildNavbar(
user,
userData
);

buildFooter();

}
);

const toggle =
document.getElementById(
"navbar-toggle"
);

const links =
document.getElementById(
"navbar-links"
);

toggle.onclick = function(){

links.classList.toggle(
"open"
);

if(
links.classList.contains(
"open"
)
){
toggle.textContent =
"✕ Close";
}else{
toggle.textContent =
"☰ Menu";
}

};