import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
getAuth,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import {
getFirestore,
doc,
getDoc,
setDoc
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyDG0hSabeqYdGgSISOgvSnkOwATXDLiV9g",
authDomain: "zombieos.firebaseapp.com",
projectId: "zombieos",
storageBucket: "zombieos.firebasestorage.app",
messagingSenderId: "577624378484",
appId: "1:577624378484:web:3e88e693724bde8e89d521"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const $ = (id) => document.getElementById(id);

/* MOBILE NAV */

const navbar = $("dashboard-navbar");
const toggleButton = $("mobile-navbar-toggle");

if(navbar && toggleButton){

let navbarVisible = true;

toggleButton.onclick = () => {
navbarVisible = !navbarVisible;

if(navbarVisible){
navbar.classList.remove("hidden-navbar");
toggleButton.textContent = "Hide Menu";
}else{
navbar.classList.add("hidden-navbar");
toggleButton.textContent = "Show Menu";
}
};

}

/* GET TICKET ID */

const params = new URLSearchParams(window.location.search);
const ticketId = params.get("id");

if(!ticketId){
alert("No ticket ID provided.");
window.location.href = "/tickets";
}

/* AUTH */

onAuthStateChanged(auth, async(user) => {

if(!user){
window.location.href = "/login";
return;
}

const ticketRef = doc(db, "tickets", ticketId);
const ticketSnap = await getDoc(ticketRef);

if(!ticketSnap.exists()){
alert("Ticket not found.");
window.location.href = "/tickets";
return;
}

let ticket = ticketSnap.data();

if(!ticket.participants || !ticket.participants.includes(user.uid)){
alert("You are not part of this ticket.");
window.location.href = "/tickets";
return;
}

/* LOAD USER */

const userRef = doc(db, "users", user.uid);
const userSnap = await getDoc(userRef);

const userData = userSnap.exists()
? userSnap.data()
: {};

const username =
userData.username ||
user.displayName ||
"Unknown User";

/* RENDER */

function renderTicket(){

$("ticket-title").textContent = ticket.title || "Untitled Ticket";

$("ticket-meta").textContent =
`Ticket ${ticket.ticketId} • ${ticket.category || "Other"} • Created ${new Date(ticket.createdAt).toLocaleString()}`;

$("ticket-status").textContent = ticket.status || "OPEN";

const messagesBox = $("ticket-messages");

messagesBox.innerHTML = "";

const messages = ticket.messages || [];

if(messages.length === 0){
messagesBox.innerHTML = "No messages yet.";
return;
}

messages.forEach((msg) => {

const msgEl = document.createElement("div");
msgEl.className = "ticket-message";

msgEl.innerHTML = `
<div class="ticket-message-author">${msg.author || "Unknown User"}</div>
<div class="ticket-message-text">${msg.message || ""}</div>
<div class="ticket-message-time">${new Date(msg.timestamp).toLocaleString()}</div>
`;

messagesBox.appendChild(msgEl);

});

}

renderTicket();

/* SEND REPLY */

$("send-reply-button").onclick = async() => {

const replyBox = $("ticket-reply");
const reply = replyBox.value.trim();

if(!reply){
alert("Reply cannot be empty.");
return;
}

const newMessage = {
author: username,
uid: user.uid,
message: reply,
timestamp: Date.now()
};

const updatedMessages = [
...(ticket.messages || []),
newMessage
];

await setDoc(
ticketRef,
{
messages: updatedMessages,
status: "OPEN",
updatedAt: Date.now()
},
{
merge: true
}
);

ticket.messages = updatedMessages;
ticket.status = "OPEN";

replyBox.value = "";

renderTicket();

};

});