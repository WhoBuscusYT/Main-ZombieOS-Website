import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
getAuth,
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import {
getFirestore,
collection,
getDocs,
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

window.location.href =
"/dashboard";

return;

}

const userData =
userSnap.data();

/* STAFF CHECK */

const isBadgeStaff =

userData.badges &&
userData.badges.includes("staff");

const isDevStaff =

DEV_STAFF.includes(
userData.username
);

if(

!isBadgeStaff &&
!isDevStaff

){

window.location.href =
"/errors/403";

return;

}

const username =

userData.username ||

"Staff";

/* LOAD TICKETS */

const ticketContainer =
$("staff-ticket-list");

ticketContainer.innerHTML =
"";

const ticketSnapshot =
await getDocs(
collection(db,"tickets")
);

let tickets =
[];

ticketSnapshot.forEach((docSnap)=>{

tickets.push(
docSnap.data()
);

});

/* SORT */

tickets.sort(
(a,b)=>
(b.priority || 1)
-
(a.priority || 1)
);

/* EMPTY */

if(tickets.length === 0){

ticketContainer.innerHTML =
"No tickets found.";

return;

}

/* RENDER */

tickets.forEach((ticket)=>{

const ticketEl =
document.createElement("div");

ticketEl.className =
"staff-ticket";

let priorityClass =
"priority-1";

if(ticket.priority >= 10){

priorityClass =
"priority-10";

}else if(ticket.priority >= 5){

priorityClass =
"priority-5";

}else if(ticket.priority >= 3){

priorityClass =
"priority-3";

}else if(ticket.priority >= 2){

priorityClass =
"priority-2";

}

ticketEl.innerHTML =

`
<div class="staff-ticket-top">

<div class="staff-ticket-title">

${ticket.title}

</div>

<div class="staff-priority ${priorityClass}">

Priority ${ticket.priority || 1}

</div>

</div>

<div class="staff-ticket-info">

<div>

Creator:
${ticket.username || "Unknown User"}

</div>

<div>

Category:
${ticket.category || "Other"}

</div>

<div>

Status:
${ticket.status || "OPEN"}

</div>

<div>

Claimed By:
${ticket.claimedBy || "Nobody"}

</div>

</div>

<div class="staff-ticket-actions">

<button
class="staff-button staff-open"
onclick="window.location.href='/tickets/ticket?id=${ticket.ticketId}'"
>

Open Ticket

</button>

<button
class="staff-button staff-claim"
data-ticket="${ticket.ticketId}"
>

Claim Ticket

</button>

</div>
`;

ticketContainer.appendChild(
ticketEl
);

});

/* CLAIM BUTTONS */

document
.querySelectorAll(".staff-claim")
.forEach((button)=>{

button.onclick =
async()=>{

const ticketId =
button.dataset.ticket;

const ticketRef =
doc(
db,
"tickets",
ticketId
);

const ticketSnap =
await getDoc(ticketRef);

if(!ticketSnap.exists()){

return;

}

const ticketData =
ticketSnap.data();

await setDoc(
ticketRef,
{

claimed:true,

claimedBy:
username,

status:
"CLAIMED"

},
{
merge:true
}
);

button.textContent =
"Claimed";

button.disabled =
true;

};

});

}
);

/* DEV STAFF */

const DEV_STAFF = [

"whobuscusyt",
"WhoBuscusYT"

];