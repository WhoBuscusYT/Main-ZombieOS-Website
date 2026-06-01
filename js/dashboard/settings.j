import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
getAuth,
onAuthStateChanged,
updatePassword,
reauthenticateWithCredential,
EmailAuthProvider,
signOut
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

/* NAVBAR */

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

/* LOAD */

document.getElementById(
"settings-email"
).value =
data.email || "";

document.getElementById(
"settings-phone"
).value =
data.phone || "";

document.getElementById(
"toggle-friends"
).checked =
data.acceptFriends ?? true;

document.getElementById(
"toggle-dms"
).checked =
data.acceptDMs ?? true;

/* SAVE */

document.getElementById(
"save-settings-button"
).onclick =
async()=>{

await setDoc(
userRef,
{

phone:
document.getElementById(
"settings-phone"
).value.trim(),

acceptFriends:
document.getElementById(
"toggle-friends"
).checked,

acceptDMs:
document.getElementById(
"toggle-dms"
).checked

},
{
merge:true
}
);

alert(
"Settings saved."
);

};

/* PASSWORD */

document.getElementById(
"change-password-button"
).onclick =
async()=>{

try{

const currentPassword =
document.getElementById(
"current-password"
).value;

const newPassword =
document.getElementById(
"new-password"
).value;

const confirmPassword =
document.getElementById(
"confirm-password"
).value;

if(
newPassword !== confirmPassword
){

alert(
"Passwords do not match."
);

return;

}

const credential =
EmailAuthProvider.credential(
user.email,
currentPassword
);

await reauthenticateWithCredential(
user,
credential
);

await updatePassword(
user,
newPassword
);

alert(
"Password updated successfully."
);

}catch(error){

console.error(error);

alert(
"Failed to update password."
);

}

};

/* DISABLE */

document.getElementById(
"disable-account-button"
).onclick =
async()=>{

const confirmed =
confirm(
"Disable your account?"
);

if(!confirmed){

return;

}

await setDoc(
userRef,
{
disabled:true
},
{
merge:true
}
);

await signOut(auth);

window.location.href =
"/";

};

/* DELETE */

document.getElementById(
"delete-account-button"
).onclick =
()=>{

const confirmed =
confirm(
"Deleting your account is permanent. Continue?"
);

if(!confirmed){

return;

}

alert(
"Delete account system coming soon."
);

};

}
);