import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
getAuth,
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import {
getFirestore,
doc,
getDoc,
updateDoc
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

/* FIREBASE */

const firebaseConfig = {

apiKey:
"AIzaSyDG0hSabeqYdGgSISOgvSnkOwATXDLiV9g",

authDomain:
"zombieos.firebaseapp.com",

projectId:
"zombieos",

storageBucket:
"zombieos.firebasestorage.app",

messagingSenderId:
"577624378484",

appId:
"1:577624378484:web:3e88e693724bde8e89d521"

};

const app =
initializeApp(firebaseConfig);

const auth =
getAuth(app);

const db =
getFirestore(app);

/* AUTH */

onAuthStateChanged(
auth,
async(user)=>{

if(!user){

window.location.href =
"/login";

return;

}

const userRef =
doc(
db,
"users",
user.uid
);

const userSnap =
await getDoc(userRef);

if(!userSnap.exists()){

return;

}

const data =
userSnap.data();

/* LOAD DATA */

document.getElementById(
"profile-username"
).value =
data.username || "";

document.getElementById(
"profile-handle"
).value =
data.handle || "";

document.getElementById(
"profile-bio"
).value =
data.bio || "";

document.getElementById(
"profile-pronouns"
).value =
data.pronouns || "";

/* SOCIALS */

document.getElementById(
"social-youtube"
).value =
data.socials?.youtube || "";

document.getElementById(
"social-github"
).value =
data.socials?.github || "";

document.getElementById(
"social-discord"
).value =
data.socials?.discord || "";

document.getElementById(
"social-instagram"
).value =
data.socials?.instagram || "";

document.getElementById(
"social-facebook"
).value =
data.socials?.facebook || "";

document.getElementById(
"social-twitter"
).value =
data.socials?.twitter || "";

/* ZOS+ */

if(
data.subscription === "ZOS+"
){

document.getElementById(
"profile-color-section"
).style.display =
"block";

}

/* SAVE */

document.getElementById(
"profile-save-button"
).addEventListener(
"click",
async()=>{

try{

await updateDoc(
userRef,
{

username:
document.getElementById(
"profile-username"
).value.trim(),

bio:
document.getElementById(
"profile-bio"
).value.trim(),

pronouns:
document.getElementById(
"profile-pronouns"
).value.trim(),

socials:{

youtube:
document.getElementById(
"social-youtube"
).value.trim(),

github:
document.getElementById(
"social-github"
).value.trim(),

discord:
document.getElementById(
"social-discord"
).value.trim(),

instagram:
document.getElementById(
"social-instagram"
).value.trim(),

facebook:
document.getElementById(
"social-facebook"
).value.trim(),

twitter:
document.getElementById(
"social-twitter"
).value.trim()

}

}
);

alert(
"Profile saved successfully."
);

}catch(error){

console.error(error);

alert(
"Failed to save profile."
);

}

}
);

}
);

/* MOBILE NAVBAR */

const navbar =
document.getElementById(
"dashboard-navbar"
);

const toggleButton =
document.getElementById(
"mobile-navbar-toggle"
);

if(
navbar &&
toggleButton
){

let navbarVisible =
true;

toggleButton.addEventListener(
"click",
()=>{

navbarVisible =
!navbarVisible;

if(navbarVisible){

navbar.classList.remove(
"hidden-navbar"
);

toggleButton.textContent =
"Hide Menu";

}else{

navbar.classList.add(
"hidden-navbar"
);

toggleButton.textContent =
"Show Menu";

}

}
);

}