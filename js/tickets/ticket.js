// /js/tickets/ticket.js

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

const $ =
(id)=>document.getElementById(id);

/* MOBILE NAV */

const navbar =
$("dashboard-navbar");

const toggleButton =
$("mobile-navbar-toggle");

if(
navbar &&
toggleButton
){

let navbarVisible =
true;

toggleButton.onclick =
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

};

}

/* TICKET ID */

const params =
new URLSearchParams(
window.location.search
);

const ticketId =
params.get("id");

if(!ticketId){

alert(
"No ticket ID provided."
);

window.location.href =
"/tickets";

}

/* AUTH */

onAuthStateChanged(
auth,
async(user)=>{

try{

if(!user){

window.location.href =
"/login";

return;

}

/* TICKET */

const ticketRef =
doc(
db,
"tickets",
ticketId
);

const ticketSnap =
await getDoc(
ticketRef
);

if(!ticketSnap.exists()){

alert(
"Ticket not found."
);

window.location.href =
"/tickets";

return;

}

let ticket =
ticketSnap.data();

/* USER */

const userRef =
doc(
db,
"users",
user.uid
);

const userSnap =
await getDoc(
userRef
);

if(!userSnap.exists()){

alert(
"User profile not found."
);

window.location.href =
"/dashboard";

return;

}

const userData =
userSnap.data();

const username =

userData.username ||

user.displayName ||

"Unknown User";

/* STAFF CHECK */

const badges =
userData.badges || [];

const normalizedBadges =

badges.map(
badge =>
String(badge).toUpperCase()
);

const isStaff =

normalizedBadges.includes(
"STAFF"
);

/* PARTICIPANT CHECK */

const isParticipant =

ticket.participants &&
ticket.participants.includes(
user.uid
);

if(

!isParticipant &&
!isStaff

){

alert(
"You are not part of this ticket."
);

window.location.href =
"/tickets";

return;

}

/* RENDER */

function renderTicket(){

$("ticket-title").textContent =
ticket.title || "Untitled Ticket";

$("ticket-meta").textContent =

`Ticket ${ticket.ticketId} • ${ticket.category || "Other"} • Created ${new Date(ticket.createdAt).toLocaleString()}`;

$("ticket-status").textContent =
ticket.status || "OPEN";

const messagesBox =
$("ticket-messages");

messagesBox.innerHTML =
"";

const messages =
ticket.messages || [];

if(messages.length === 0){

messagesBox.innerHTML =
"No messages yet.";

return;

}

messages.forEach((msg)=>{

const msgEl =
document.createElement("div");

msgEl.className =
"ticket-message";

let badge =
"";

if(msg.role === "BOT"){

badge =
`<span class="ticket-role-badge bot-badge">BOT</span>`;

}

if(msg.role === "SUPPORT"){

badge =
`<span class="ticket-role-badge support-badge">SUPPORT</span>`;

}

if(msg.role === "SYSTEM"){

badge =
`<span class="ticket-role-badge system-badge">SYSTEM</span>`;

}

msgEl.innerHTML =

`
<div class="ticket-message-author">

${msg.author || "Unknown User"}

${badge}

</div>

<div class="ticket-message-text">

${msg.message || ""}

</div>

<div class="ticket-message-time">

${new Date(msg.timestamp).toLocaleString()}

</div>
`;

messagesBox.appendChild(
msgEl
);

});

}

/* INITIAL RENDER */

renderTicket();

/* SEND REPLY */

$("send-reply-button").onclick =
async()=>{

const replyBox =
$("ticket-reply");

const reply =
replyBox.value.trim();

if(!reply){

alert(
"Reply cannot be empty."
);

return;

}

/* ROLE */

let role =
"USER";

if(isStaff){

role =
"SUPPORT";

}

/* USER MESSAGE */

const newMessage = {

author:
username,

uid:
user.uid,

message:
reply,

timestamp:
Date.now(),

role:role

};

const updatedMessages = [
...(ticket.messages || []),
newMessage
];

/* AI */

if(
reply.toLowerCase().startsWith("!ai")
){

const aiPrompt =

reply
.toLowerCase()
.replace("!ai","")
.trim();

const normalized =

aiPrompt
.replace(/[^\w\s]/g,"")
.trim();

let aiResponse =

"I'm sorry, I could not find an answer for that question yet.";

/* PASSWORD */

if(

normalized.includes("password")

||

normalized.includes("forgot")

||

normalized.includes("reset")

||

normalized.includes("login")

||

normalized.includes("signin")

||

normalized.includes("sign in")

||

normalized.includes("cant login")

||

normalized.includes("cannot login")

){

aiResponse =

`You can reset your password from the login page using the "Forgot Password" option or from Dashboard Settings if you are already signed in.`;

}

/* ZOS+ */

else if(

normalized.includes("buy")

||

normalized.includes("purchase")

||

normalized.includes("payment")

||

normalized.includes("stripe")

||

normalized.includes("card")

||

normalized.includes("checkout")

||

normalized.includes("money")

||

normalized.includes("zos+")

||

normalized.includes("zos plus")

){

aiResponse =

`If you cannot purchase ZOS+, your card vendor may not currently support Stripe or there may not be enough funds available on the payment method.`;

}

/* CHILD ACCOUNT */

else if(

normalized.includes("child")

||

normalized.includes("kid")

||

normalized.includes("parent")

||

normalized.includes("family")

||

normalized.includes("setup child")

||

normalized.includes("child account")

){

aiResponse =

`There are tutorials for almost everything on the official ZombieOS YouTube channel, including child account setup tutorials.`;

}

/* AI MESSAGE */

updatedMessages.push({

author:
"ZOS AI",

uid:
"zos-ai",

message:
aiResponse,

timestamp:
Date.now(),

role:"BOT"

});

}

/* SAVE */

await setDoc(
ticketRef,
{

messages:
updatedMessages,

status:
"OPEN",

updatedAt:
Date.now()

},
{
merge:true
}
);

/* UPDATE */

ticket.messages =
updatedMessages;

ticket.status =
"OPEN";

replyBox.value =
"";

renderTicket();

};

}catch(error){

console.error(error);

document.body.innerHTML =

`
<div style="
padding:40px;
background:black;
color:white;
font-family:sans-serif;
min-height:100vh;
">

<h1>ZOS-E500</h1>

<p>

Ticket system crashed.

</p>

<hr>

<pre style="
white-space:pre-wrap;
word-break:break-word;
">

${error}

</pre>

</div>
`;

}

}
);