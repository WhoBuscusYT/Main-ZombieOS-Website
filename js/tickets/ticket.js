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
onSnapshot
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

/* FIREBASE */

const firebaseConfig = {

apiKey:"AIzaSyDG0hSabeqYdGgSISOgvSnkOwATXDLiV9g",
authDomain:"zombieos.firebaseapp.com",
projectId:"zombieos",
storageBucket:"zombieos.firebasestorage.app",
messagingSenderId:"577624378484",
appId:"1:577624378484:web:3e88e693724bde8e89d521"

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

const claimButton =
document.getElementById("claim-ticket");

const tabTitle =
document.getElementById("tab-title");

/* PARAMS */

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

const userData =
userSnap.data();

const username =
userData.username || "Unknown";

/* STAFF */

let isStaff =
false;

const badges =
userData.badges || [];

for(
let i = 0;
i < badges.length;
i++
){

if(
String(badges[i]).toUpperCase()
=== "STAFF"
){

isStaff = true;

}

}

/* TICKET */

const ticketRef =
doc(
db,
"tickets",
ticketId
);

/* REALTIME */

onSnapshot(
ticketRef,
(snapshot)=>{

if(!snapshot.exists()){

return;

}

const ticket =
snapshot.data();

/* ACCESS */

let allowed =
false;

if(
ticket.participants
){

for(
let i = 0;
i < ticket.participants.length;
i++
){

if(
ticket.participants[i]
=== user.uid
){

allowed = true;

}

}

}

if(isStaff){

allowed = true;

}

if(!allowed){

alert(
"You are not part of this ticket."
);

window.location.href =
"/tickets";

return;

}

/* STAFF UI */

if(isStaff){

staffCommands.style.display =
"block";

if(ticket.claimed){

claimButton.textContent =
"Unclaim Ticket";

}else{

claimButton.textContent =
"Claim Ticket";

}

}

/* META */

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

ticketMessages.innerHTML = "";

const messages =
ticket.messages || [];

messages.forEach((msg)=>{

const card =
document.createElement("div");

card.className =
"ticket-message-card";

let badgeHTML = "";

if(msg.role === "BOT"){

badgeHTML =
`<span class="ticket-badge bot-badge">BOT</span>`;

}

if(msg.role === "SUPPORT"){

badgeHTML =
`<span class="ticket-badge support-badge">SUPPORT</span>`;

}

if(msg.role === "SYSTEM"){

badgeHTML =
`<span class="ticket-badge system-badge">SYSTEM</span>`;

}

card.innerHTML =

`
<div class="ticket-message-header">

<span class="ticket-author">

${msg.author || "Unknown"}

</span>

${badgeHTML}

</div>

<div class="ticket-message-content">

${msg.message || ""}

</div>

<div class="ticket-message-time">

${new Date(
msg.timestamp
).toLocaleString()}

</div>
`;

ticketMessages.appendChild(card);

});

ticketMessages.scrollTop =
ticketMessages.scrollHeight;

});

/* SEND */

sendButton.onclick =
async function(){

const reply =
replyBox.value.trim();

if(!reply){

return;

}

const ticketSnap =
await getDoc(ticketRef);

const ticket =
ticketSnap.data();

const messages =
ticket.messages || [];

messages.push({

author:username,
uid:user.uid,
message:reply,
timestamp:Date.now(),
role:isStaff ? "SUPPORT" : "USER"

});

/* AI */

if(
reply.toLowerCase()
.indexOf("!ai") === 0
){

messages.push({

author:"ZOS AI",
uid:"zos-ai",
message:"This is a temporary AI response system for ZombieOS support.",
timestamp:Date.now(),
role:"BOT"

});

}

await setDoc(
ticketRef,
{

messages:messages,
updatedAt:Date.now()

},
{
merge:true
}
);

replyBox.value =
"";

};

/* CLAIM */

claimButton.onclick =
async function(){

const ticketSnap =
await getDoc(ticketRef);

const ticket =
ticketSnap.data();

const messages =
ticket.messages || [];

if(ticket.claimed){

messages.push({

author:"ZOS SYSTEM",
message:
username +
" has unclaimed this ticket.",

timestamp:Date.now(),
role:"SYSTEM"

});

await setDoc(
ticketRef,
{

claimed:false,
claimedBy:"",
messages:messages

},
{
merge:true
}
);

}else{

messages.push({

author:"ZOS SYSTEM",
message:
username +
" has claimed this ticket.",

timestamp:Date.now(),
role:"SYSTEM"

});

await setDoc(
ticketRef,
{

claimed:true,
claimedBy:username,
messages:messages

},
{
merge:true
}
);

}

};

/* CLOSE */

document.getElementById(
"close-ticket"
).onclick =
async function(){

const reason =
prompt(
"Reason for closing?"
);

if(!reason){

return;

}

const ticketSnap =
await getDoc(ticketRef);

const ticket =
ticketSnap.data();

const messages =
ticket.messages || [];

messages.push({

author:"ZOS SYSTEM",
message:
username +
" has closed this ticket for: " +
reason,

timestamp:Date.now(),
role:"SYSTEM"

});

await setDoc(
ticketRef,
{

status:"CLOSED",
messages:messages

},
{
merge:true
}
);

};

/* REOPEN */

document.getElementById(
"reopen-ticket"
).onclick =
async function(){

const ticketSnap =
await getDoc(ticketRef);

const ticket =
ticketSnap.data();

const messages =
ticket.messages || [];

messages.push({

author:"ZOS SYSTEM",
message:
username +
" has reopened this ticket.",

timestamp:Date.now(),
role:"SYSTEM"

});

await setDoc(
ticketRef,
{

status:"OPEN",
messages:messages

},
{
merge:true
}
);

};

}
);

/* MOBILE NAVBAR */

const mobileToggle =
document.getElementById(
"mobile-navbar-toggle"
);

const navbar =
document.getElementById(
"dashboard-navbar"
);

let navbarVisible =
true;

mobileToggle.onclick =
function(){

navbarVisible =
!navbarVisible;

if(navbarVisible){

navbar.classList.remove(
"hidden"
);

mobileToggle.textContent =
"Hide Menu";

}else{

navbar.classList.add(
"hidden"
);

mobileToggle.textContent =
"Show Menu";

}

};

/* Tab name */
const tabName =
document.getElementById(
"title"
);

tabName.textContent = "Ticket - " + ticketId + " - ZombieOS"