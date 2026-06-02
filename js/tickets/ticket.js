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

/* ELEMENTS */

const ticketTitle =
document.getElementById("ticket-title");

const ticketMeta =
document.getElementById("ticket-meta");

const ticketStatus =
document.getElementById("ticket-status");

const ticketMessages =
document.getElementById("ticket-messages");

const replyBox =
document.getElementById("ticket-reply");

const sendButton =
document.getElementById("send-reply-button");

const staffCommands =
document.getElementById("staff-commands");

/* MOBILE NAV */

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

var navbarVisible =
true;

toggleButton.onclick =
function(){

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

};

}

/* TICKET ID */

const params =
new URLSearchParams(
window.location.search
);

const ticketId =
params.get("id");

/* AUTH */

onAuthStateChanged(
auth,
async function(user){

try{

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

alert(
"User profile missing."
);

return;

}

const userData =
userSnap.data();

/* BADGES */

var badges =
userData.badges || [];

var isStaff =
false;

for(
var i = 0;
i < badges.length;
i++
){

if(
String(badges[i])
.toUpperCase()
=== "STAFF"
){

isStaff =
true;

}

}

/* SHOW STAFF COMMANDS */

if(isStaff){

staffCommands.style.display =
"block";

}

/* TICKET */

const ticketRef =
doc(
db,
"tickets",
ticketId
);

const ticketSnap =
await getDoc(ticketRef);

if(!ticketSnap.exists()){

alert(
"Ticket not found."
);

return;

}

var ticket =
ticketSnap.data();

/* ACCESS */

var allowed =
false;

if(
ticket.participants
){

for(
var p = 0;
p < ticket.participants.length;
p++
){

if(
ticket.participants[p]
=== user.uid
){

allowed =
true;

}

}

}

if(isStaff){

allowed =
true;

}

if(!allowed){

alert(
"You are not part of this ticket."
);

window.location.href =
"/tickets";

return;

}

/* RENDER */

function renderTicket(){

ticketTitle.textContent =
ticket.title || "Untitled";

ticketMeta.textContent =

"Created " +

new Date(
ticket.createdAt
).toLocaleString();

ticketStatus.textContent =
ticket.status || "OPEN";

/* MESSAGES */

ticketMessages.innerHTML =
"";

var messages =
ticket.messages || [];

for(
var m = 0;
m < messages.length;
m++
){

var msg =
messages[m];

var div =
document.createElement("div");

div.className =
"ticket-message";

var badge =
"";

if(msg.role === "BOT"){

badge =
'<span class="ticket-role-badge bot-badge">BOT</span>';

}

if(msg.role === "SUPPORT"){

badge =
'<span class="ticket-role-badge support-badge">SUPPORT</span>';

}

div.innerHTML =

'<div class="ticket-message-author">' +

(msg.author || "Unknown") +

" " +

badge +

'</div>' +

'<div class="ticket-message-text">' +

(msg.message || "") +

'</div>' +

'<div class="ticket-message-time">' +

new Date(
msg.timestamp
).toLocaleString() +

'</div>';

ticketMessages.appendChild(div);

}

}

/* INITIAL */

renderTicket();

/* SEND */

sendButton.onclick =
async function(){

var reply =
replyBox.value.trim();

if(!reply){

return;

}

var role =
"USER";

if(isStaff){

role =
"SUPPORT";

}

var newMessage = {

author:
userData.username ||

"Unknown",

uid:
user.uid,

message:
reply,

timestamp:
Date.now(),

role:
role

};

var updatedMessages =
ticket.messages || [];

updatedMessages.push(
newMessage
);

/* AI */

if(
reply
.toLowerCase()
.indexOf("!ai") === 0
){

updatedMessages.push({

author:
"ZOS AI",

uid:
"zos-ai",

message:
"This is a temporary AI response system for ZombieOS support.",

timestamp:
Date.now(),

role:
"BOT"

});

}

/* SAVE */

await setDoc(
ticketRef,
{

messages:
updatedMessages,

updatedAt:
Date.now()

},
{
merge:true
}
);

ticket.messages =
updatedMessages;

replyBox.value =
"";

renderTicket();

};

/* STAFF BUTTONS */

if(isStaff){

document.getElementById(
"claim-ticket"
).onclick =
async function(){

await setDoc(
ticketRef,
{

claimed:true,

claimedBy:
userData.username,

status:
"CLAIMED"

},
{
merge:true
}
);

location.reload();

};

document.getElementById(
"close-ticket"
).onclick =
async function(){

await setDoc(
ticketRef,
{

status:
"CLOSED"

},
{
merge:true
}
);

location.reload();

};

document.getElementById(
"reopen-ticket"
).onclick =
async function(){

await setDoc(
ticketRef,
{

status:
"OPEN"

},
{
merge:true
}
);

location.reload();

};

document.getElementById(
"priority-10"
).onclick =
async function(){

await setDoc(
ticketRef,
{

priority:10

},
{
merge:true
}
);

location.reload();

};

}

}catch(error){

console.error(error);

alert(
error.message
);

}

}
);