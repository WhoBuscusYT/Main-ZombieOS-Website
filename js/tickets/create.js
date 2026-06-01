// /js/tickets/create.js

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
setDoc,
collection,
getDocs
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

const userData =
userSnap.data();

/* CREATE BUTTON */

const createButton =
document.getElementById(
"create-ticket-button"
);

createButton.onclick =
async()=>{

try{

const title =
document.getElementById(
"ticket-title"
).value.trim();

const category =
document.getElementById(
"ticket-category"
).value;

const description =
document.getElementById(
"ticket-description"
).value.trim();

/* VALIDATION */

if(
!title ||
!description
){

alert(
"Please complete all required fields."
);

return;

}

/* TICKET ID */

const ticketCollection =
await getDocs(
collection(db,"tickets")
);

const ticketNumber =
ticketCollection.size + 1000;

const ticketId =
`ZOS-${ticketNumber}`;

/* PRIORITY */

let priority =
1;

/* PROGRAMS */

if(
userData.creatorProgram ||
userData.devProgram
){

priority =
2;

}

/* SUBSCRIPTIONS */

if(
userData.subscription === "BASIC"
){

priority =
Math.max(
priority,
2
);

}

if(
userData.subscription === "ZOS+"
){

priority =
3;

}

/* SAVE */

await setDoc(
doc(
db,
"tickets",
ticketId
),
{

ticketId:
ticketId,

uid:
user.uid,

username:
userData.username || user.displayName || "Unknown User",

title:
title,

category:
category,

description:
description,

status:
"OPEN",

claimed:
false,

claimedBy:
null,

priority:
priority,

createdAt:
Date.now(),

participants:[
user.uid
],

messages:[

{
author:
userData.username || user.displayName || "Unknown User",

uid:
user.uid,

message:
description,

timestamp:
Date.now()
}

]

}
);

/* REDIRECT */

window.location.href =
`/tickets/ticket?id=${ticketId}`;

}catch(error){

console.error(
"Ticket Creation Error:",
error
);

alert(
"Failed to create ticket."
);

}

};

}
);