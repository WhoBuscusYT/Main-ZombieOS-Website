// /js/tickets/dashboard.js

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
query,
where,
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

const ticketsContainer =
document.getElementById(
"tickets-container"
);

ticketsContainer.innerHTML =
"";

/* GET TICKETS */

const ticketsQuery =
query(
collection(db,"tickets"),
where(
"participants",
"array-contains",
user.uid
)
);

const ticketSnapshot =
await getDocs(
ticketsQuery
);

/* NO TICKETS */

if(ticketSnapshot.empty){

ticketsContainer.innerHTML =

`
<div class="tickets-loading">

No tickets found.

</div>
`;

return;

}

/* RENDER */

ticketSnapshot.forEach(
(doc)=>{

const ticket =
doc.data();

const status =
(ticket.status || "OPEN")
.toLowerCase();

const claimedBy =
ticket.claimedBy
? ` (${ticket.claimedBy})`
: "";

const createdDate =
new Date(
ticket.createdAt
)
.toLocaleString();

const card =
document.createElement(
"div"
);

card.className =
"ticket-card";

card.innerHTML =

`
<div class="ticket-top">

<div class="ticket-title">

${ticket.title}

</div>

<div class="ticket-status ${status}">

${ticket.status}${claimedBy}

</div>

</div>

<details class="ticket-details">

<summary>

View Details

</summary>

<div class="ticket-description">

${ticket.description}

</div>

</details>

<div class="ticket-info">

<div>

Created:
${createdDate}

</div>

<div>

Ticket ID:
${ticket.ticketId}

</div>

</div>

<div class="ticket-actions">

<a
href="/tickets/ticket?id=${ticket.ticketId}"
class="ticket-open-button"
>

Open Ticket

</a>

</div>
`;

ticketsContainer.appendChild(
card
);

}
);

}
);