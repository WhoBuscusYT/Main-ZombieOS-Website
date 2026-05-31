import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
getAuth,
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

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

/* AUTH */

onAuthStateChanged(
auth,
(user)=>{

if(!user){

window.location.href =
"/login";

return;

}

/* LOAD USER */

document.getElementById(
"profile-username"
).value =

user.displayName ||

user.email.split("@")[0];

/* BANNER PREVIEW */

const bannerUpload =
document.getElementById(
"banner-upload"
);

const bannerPreview =
document.getElementById(
"profile-banner-preview"
);

bannerUpload.addEventListener(
"change",
(event)=>{

const file =
event.target.files[0];

if(file){

bannerPreview.src =
URL.createObjectURL(file);

}

}
);

/* AVATAR PREVIEW */

const avatarUpload =
document.getElementById(
"avatar-upload"
);

const avatarPreview =
document.getElementById(
"profile-avatar-preview"
);

avatarUpload.addEventListener(
"change",
(event)=>{

const file =
event.target.files[0];

if(file){

avatarPreview.src =
URL.createObjectURL(file);

}

}
);

/* SAVE */

document.getElementById(
"profile-save-button"
).addEventListener(
"click",
()=>{

alert(
"Profile saving coming soon."
);

}
);

/* ZOS+ */

const subscription =
"FREE";

if(
subscription === "ZOS+"
){

document.getElementById(
"profile-color-section"
).style.display =
"block";

}

}
);