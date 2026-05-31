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
serverTimestamp
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

try{

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

/* FIRESTORE */

await setDoc(
doc(
db,
"users",
user.uid
),
{

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
username.toLowerCase(),

socials:{},

profileColor:
"default",

lastHandleChange:
Date.now()

}
);

/* REDIRECT */

window.location.href =
"/dashboard";

}catch(error){

console.error(error);

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

await setDoc(
doc(
db,
"users",
user.uid
),
{

username:
user.displayName ||

user.email.split("@")[0],

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
(user.displayName ||
user.email.split("@")[0])
.toLowerCase(),

socials:{},

profileColor:
"default",

lastHandleChange:
Date.now()

},
{
merge:true
}
);

window.location.href =
"/dashboard";

}catch(error){

console.error(error);

alert(
"Google signup failed."
);

}

}
);

}