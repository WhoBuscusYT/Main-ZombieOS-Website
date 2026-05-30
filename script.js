/* =========================================
   COPYRIGHT YEAR
========================================= */

const copyright =
document.getElementById(
  "copyright-text"
);

if (copyright) {

  const year =
  new Date().getFullYear();

  copyright.textContent =
  `ZombieOS / ZOS © ${year}`;
}

/* =========================================
   TERMINAL EASTER EGGS
========================================= */

const terminal =
document.getElementById(
  "terminal-text"
);

if (terminal) {

  const terminalSets = [

    [
      "> boot ZombieOS",
      "> load ZSharp",
      "> ecosystem.status()",
      "",
      "SYSTEM ONLINE"
    ],

    [
      "> initialize runtime",
      "> compiling modules",
      "> loading assets",
      "",
      "RUNTIME READY"
    ],

    [
      "> connect services",
      "> establish protocol",
      "> validating shell",
      "",
      "NETWORK STABLE"
    ],

    [
      "> import ZSharp.Core",
      "> launch subsystem",
      "> checking ecosystem",
      "",
      "ALL SYSTEMS ACTIVE"
    ],

    [
      "> boot experimental mode",
      "> checking memory",
      "> loading runtime shell",
      "",
      "PROTOTYPE ACTIVE"
    ],

    [
      "> scanning environment",
      "> loading API bridge",
      "> validating modules",
      "",
      "ALL SERVICES ONLINE"
    ]

  ];

  function loadTerminalSet() {

    terminal.innerHTML = "";

    const lines =
    terminalSets[
      Math.floor(
        Math.random() *
        terminalSets.length
      )
    ];

    let currentLine = 0;
    let currentChar = 0;

    function typeTerminal() {

      if (
        currentLine >=
        lines.length
      ) {
        return;
      }

      const line =
      lines[currentLine];

      if (
        currentChar <
        line.length
      ) {

        terminal.innerHTML +=
        line.charAt(currentChar);

        currentChar++;

        setTimeout(
          typeTerminal,
          35
        );

      } else {

        terminal.innerHTML +=
        "<br>";

        currentLine++;
        currentChar = 0;

        setTimeout(
          typeTerminal,
          180
        );
      }
    }

    typeTerminal();
  }

  loadTerminalSet();

  setInterval(
    loadTerminalSet,
    30000
  );
}

/* =========================================
   STATUS BARS
========================================= */

const fills =
document.querySelectorAll(
  ".status-fill"
);

fills.forEach((fill) => {

  const percent =
  parseInt(
    fill.getAttribute(
      "data-percent"
    )
  );

  let current = 0;

  const interval =
  setInterval(() => {

    if (
      current >= percent
    ) {

      clearInterval(interval);

    } else {

      current++;

      fill.style.width =
      current + "%";
    }

  }, 15);

});

/* =========================================
   FLOATING ORBS
========================================= */

const orbContainer =
document.createElement("div");

orbContainer.className =
"orb-container";

document.body.appendChild(
  orbContainer
);

for (let i = 0; i < 12; i++) {

  const orb =
  document.createElement("div");

  orb.className = "orb";

  orb.style.left =
  Math.random() * 100 + "%";

  orb.style.top =
  Math.random() * 100 + "%";

  orb.style.animationDuration =
  10 + Math.random() * 20 + "s";

  orb.style.animationDelay =
  Math.random() * 5 + "s";

  orb.style.width =
  60 + Math.random() * 120 + "px";

  orb.style.height =
  orb.style.width;

  orbContainer.appendChild(
    orb
  );
}