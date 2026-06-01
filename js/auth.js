import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
updateProfile,
GoogleAuthProvider,
signInWithPopup
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import {
getFirestore,
doc,
setDoc,
getDoc
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

/* SIGNUP */

const signupForm =
document.getElementById(
"signup-form"
);

if(signupForm){

signupForm.addEventListener(
"submit",
async(event)=>{

event.preventDefault();

/* INPUTS */

const username =
document.getElementById(
"username"
).value.trim();

const email =
document.getElementById(
"email"
).value.trim();

const password =
document.getElementById(
"password"
).value;

/* VALIDATION */

if(
!username ||
!email ||
!password
){

alert(
"Please fill out all fields."
);

return;

}

try{

/* CREATE ACCOUNT */

const credential =
await createUserWithEmailAndPassword(
auth,
email,
password
);

const user =
credential.user;

/* DISPLAY NAME */

await updateProfile(
user,
{
displayName:
username
}
);

/* USER COUNTER */

const counterRef =
doc(
db,
"system",
"counters"
);

const counterSnap =
await getDoc(counterRef);

let currentUserId =
0;

if(counterSnap.exists()){

currentUserId =
counterSnap.data().currentUserId || 0;

}

const nextUserId =
currentUserId + 1;

/* SAVE COUNTER */

await setDoc(
counterRef,
{
currentUserId:
nextUserId
},
{
merge:true
}
);

/* HANDLE */

const defaultHandle =
`zoz-${nextUserId}`;

/* USER DATA */

await setDoc(
doc(
db,
"users",
user.uid
),
{

userId:
nextUserId,

username:
username,

email:
email,

subscription:
"FREE",

badges:[
"prototype"
],

createdAt:
Date.now(),

bio:"",
pronouns:"",

handle:
defaultHandle,

customHandle:
false,

profileColor:
"default",

lastHandleChange:
0,

socials:{

youtube:"",
github:"",
discord:"",
instagram:"",
facebook:"",
twitter:""

},

publicProfile:true,

displayBadges:true,

zosPlusProfile:false,

visibleBadges:{
prototype:true
}

}
);

/* REDIRECT */

window.location.href =
"/dashboard";

}catch(error){

console.error(
"Signup Error:",
error
);

alert(
error.message
);

}

}
);

}

/* GOOGLE SIGNUP */

const googleButton =
document.getElementById(
"google-signup"
);

if(googleButton){

googleButton.addEventListener(
"click",
async()=>{

try{

const provider =
new GoogleAuthProvider();

const result =
await signInWithPopup(
auth,
provider
);

const user =
result.user;

/* USER COUNTER */

const counterRef =
doc(
db,
"system",
"counters"
);

const counterSnap =
await getDoc(counterRef);

let currentUserId =
0;

if(counterSnap.exists()){

currentUserId =
counterSnap.data().currentUserId || 0;

}

const nextUserId =
currentUserId + 1;

/* SAVE COUNTER */

await setDoc(
counterRef,
{
currentUserId:
nextUserId
},
{
merge:true
}
);

/* USERNAME */

const username =

user.displayName ||

user.email.split("@")[0];

/* HANDLE */

const defaultHandle =
`zoz-${nextUserId}`;

/* SAVE USER */

await setDoc(
doc(
db,
"users",
user.uid
),
{

userId:
nextUserId,

username:
username,

email:
user.email,

subscription:
"FREE",

badges:[
"prototype"
],

createdAt:
Date.now(),

bio:"",
pronouns:"",

handle:
defaultHandle,

customHandle:
false,

profileColor:
"default",

lastHandleChange:
0,

socials:{

youtube:"",
github:"",
discord:"",
instagram:"",
facebook:"",
twitter:""

},

publicProfile:true,

displayBadges:true,

zosPlusProfile:false,

visibleBadges:{
prototype:true
}

},
{
merge:true
}
);

window.location.href =
"/dashboard";

}catch(error){

console.error(
"Google Signup Error:",
error
);

alert(
"Google signup failed."
);

}

}
);

}