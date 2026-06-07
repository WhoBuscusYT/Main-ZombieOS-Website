console.log("GLOBAL JS LOADED");

import { auth, db } from "/js/firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

/* Footer year */

const year = document.getElementById("year");

if(year){
  year.textContent = new Date().getFullYear();
}

/* Mobile navbar */

const toggle = document.getElementById("navbar-toggle");
const links = document.getElementById("nav-links");

if(toggle && links){

toggle.onclick = function(){

links.classList.toggle("open");

toggle.textContent =
links.classList.contains("open")
? "✕ Close"
: "☰ Menu";

};

}

/* Account button / PFP */

function setNavbarAccount(user,userData){

  const account = document.querySelector(".navbar-account");

  if(!account){
    return;
  }

  if(!user){

    account.innerHTML = `
      <a id="navbar-login-button" href="/login" class="nav-button">
        Login
      </a>
    `;

    return;
  }

  const avatar =
    userData?.avatarBase64 ||
    userData?.avatar ||
    userData?.profilePicture ||
    user.photoURL ||
    "/images/favicon.png";

  const badges = userData?.badges || [];

  const isDev = badges.includes("DEV");
  const isStaff = badges.includes("STAFF");

  account.innerHTML = `
    <div class="profile-menu">

      <img
        id="navbar-pfp"
        class="navbar-pfp"
        src="${avatar}"
        alt="Profile"
      >

      <div id="profile-dropdown" class="profile-dropdown">

        <a href="/dashboard">Dashboard</a>
        <a href="/social">Social</a>
        <a href="/dashboard/settings">Settings</a>

        ${isDev ? `<a href="/analytics">Analytics</a>` : ""}
        ${isStaff ? `<a href="/tickets/staff">Staff</a>` : ""}

        <button id="logout-button">Logout</button>

      </div>

    </div>
  `;

  const pfp = document.getElementById("navbar-pfp");
  const dropdown = document.getElementById("profile-dropdown");
  const logout = document.getElementById("logout-button");

  if(pfp && dropdown){

    pfp.addEventListener("click",function(event){

      event.stopPropagation();
      dropdown.classList.toggle("show");

    });

    document.addEventListener("click",function(){

      dropdown.classList.remove("show");

    });

  }

  if(logout){

    logout.addEventListener("click",async function(){

      await signOut(auth);
      window.location.href = "/";

    });

  }

}

/* Auth */

onAuthStateChanged(auth, async function(user){

let userData = null;

if(user){

const userSnap = await getDoc(doc(db,"users",user.uid));

if(userSnap.exists()){
userData = userSnap.data();
}

}

setNavbarAccount(user,userData);

});

/* Popup fallback */

window.showPopup = function(title,message){
  alert(title + "\n\n" + message);
};