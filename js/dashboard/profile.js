import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
getAuth,
onAuthStateChanged,
updateProfile
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import {
getFirestore,
doc,
getDoc,
setDoc
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

/* AUTH */

onAuthStateChanged(
auth,
async(user)=>{

if(!user){

window.location.href =
"/login";

return;

}

/* USER */

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

/* IMAGE STORAGE */

let avatarBase64 =
data.avatarBase64 || "";

let bannerBase64 =
data.bannerBase64 || "";

/* ELEMENTS */

const bannerUpload =
document.getElementById(
"banner-upload"
);

const bannerPreview =
document.getElementById(
"profile-banner-preview"
);

const avatarUpload =
document.getElementById(
"avatar-upload"
);

const avatarPreview =
document.getElementById(
"profile-avatar-preview"
);

/* LOAD SAVED IMAGES */

if(
avatarBase64 &&
avatarPreview
){

avatarPreview.src =
avatarBase64;

}

if(
bannerBase64 &&
bannerPreview
){

bannerPreview.src =
bannerBase64;

}

/* MAX SIZE */

const MAX_FILE_SIZE =
5 * 1024 * 1024;

/* BANNER PREVIEW */

if(
bannerUpload &&
bannerPreview
){

bannerUpload.onchange =
(event)=>{

const file =
event.target.files[0];

if(!file){

return;

}

/* SIZE CHECK */

if(
file.size > MAX_FILE_SIZE
){

alert(
"Banner exceeds 5MB limit."
);

return;

}

/* READ IMAGE */

const reader =
new FileReader();

reader.onload =
(e)=>{

bannerBase64 =
e.target.result;

bannerPreview.src =
bannerBase64;

};

reader.readAsDataURL(
file
);

};

}

/* AVATAR PREVIEW */

if(
avatarUpload &&
avatarPreview
){

avatarUpload.onchange =
(event)=>{

const file =
event.target.files[0];

if(!file){

return;

}

/* SIZE CHECK */

if(
file.size > MAX_FILE_SIZE
){

alert(
"Profile picture exceeds 5MB limit."
);

return;

}

/* READ IMAGE */

const reader =
new FileReader();

reader.onload =
(e)=>{

avatarBase64 =
e.target.result;

avatarPreview.src =
avatarBase64;

};

reader.readAsDataURL(
file
);

};

}

/* PROFILE */

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

/* TOGGLES */

document.getElementById(
"toggle-public-profile"
).checked =
data.publicProfile ?? true;

document.getElementById(
"toggle-display-badges"
).checked =
data.displayBadges ?? true;

document.getElementById(
"toggle-zosplus-profile"
).checked =
data.zosPlusProfile ?? false;

/* BADGE DROPDOWN */

const badgeOptions =
document.getElementById(
"badge-display-options"
);

const displayBadgesToggle =
document.getElementById(
"toggle-display-badges"
);

if(displayBadgesToggle.checked){

badgeOptions.style.display =
"block";

}

displayBadgesToggle.addEventListener(
"change",
()=>{

badgeOptions.style.display =

displayBadgesToggle.checked
? "block"
: "none";

}
);

/* BADGES */

const badgeList =
document.getElementById(
"badge-toggle-list"
);

badgeList.innerHTML = "";

if(data.badges){

data.badges.forEach(
(badge)=>{

const badgeId =
`badge-${badge}`;

const badgeEnabled =

data.visibleBadges?.[badge]
?? true;

const badgeElement =
document.createElement(
"div"
);

badgeElement.className =
"extra-setting-header";

badgeElement.innerHTML =

`
<span>${badge}</span>

<label class="switch">

<input
type="checkbox"
id="${badgeId}"
${badgeEnabled ? "checked" : ""}

>

<span class="slider"></span>

</label>
`;

badgeList.appendChild(
badgeElement
);

}
);

}

/* ZOS+ */

if(
data.subscription === "ZOS+"
){

document.getElementById(
"profile-color-section"
).style.display =
"block";

}

/* SAVE BUTTON */

const saveButton =
document.getElementById(
"profile-save-button"
);

saveButton.onclick =
async()=>{

try{

const username =
document.getElementById(
"profile-username"
).value.trim();

const handle =
document.getElementById(
"profile-handle"
).value
.trim()
.toLowerCase();

const bio =
document.getElementById(
"profile-bio"
).value.trim();

const pronouns =
document.getElementById(
"profile-pronouns"
).value.trim();

/* FILTERS */

const blockedWords = [

"fuck",
"shit",
"bitch",
"sex",
"porn",
"nazi",
"hitler",
"admin",
"moderator",
"official",
"zombieos",
"zos"

];

/* HANDLE FILTER */

if(
!data.bypassUsernameFilter
){

for(
const word of blockedWords
){

if(
handle.includes(word)
){

alert(
"That handle is not allowed."
);

return;

}

}

}

/* HANDLE VALIDATION */

if(handle.includes(" ")){

alert(
"Handles cannot contain spaces."
);

return;

}

/* HANDLE COOLDOWN */

const lastHandleChange =
data.lastHandleChange || 0;

const daysSinceChange =
(Date.now() - lastHandleChange)
/
86400000;

if(
handle !== data.handle &&
daysSinceChange < 30
){

alert(
"You can only change your handle once every 30 days."
);

return;

}

/* BADGE VISIBILITY */

const visibleBadges = {};

if(data.badges){

data.badges.forEach(
(badge)=>{

const toggle =
document.getElementById(
`badge-${badge}`
);

visibleBadges[badge] =
toggle
? toggle.checked
: true;

}
);

}

/* UPDATE AUTH */

await updateProfile(
user,
{
displayName:
username
}
);

/* SAVE FIRESTORE */

await setDoc(
userRef,
{

userId:
data.userId || 0,

username:
username,

email:
data.email || user.email,

subscription:
data.subscription || "FREE",

badges:
data.badges || [],

createdAt:
data.createdAt || Date.now(),

bio:
bio,

pronouns:
pronouns,

handle:
handle,

customHandle:
handle !== data.handle
? true
: data.customHandle || false,

profileColor:
data.profileColor || "default",

lastHandleChange:
handle !== data.handle
? Date.now()
: lastHandleChange,

/* IMAGES */

avatarBase64:
avatarBase64,

bannerBase64:
bannerBase64,

/* SOCIALS */

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

},

/* EXTRAS */

publicProfile:
document.getElementById(
"toggle-public-profile"
).checked,

displayBadges:
document.getElementById(
"toggle-display-badges"
).checked,

zosPlusProfile:
document.getElementById(
"toggle-zosplus-profile"
).checked,

visibleBadges:
visibleBadges

},
{
merge:true
}
);

alert(
"Profile saved successfully."
);

}catch(error){

console.error(
"Profile Save Error:",
error
);

alert(
"Failed to save profile."
);

}

};

}
);