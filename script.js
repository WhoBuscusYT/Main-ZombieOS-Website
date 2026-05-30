/* =========================================
   COPYRIGHT
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
   TERMINAL ROTATION
========================================= */

const terminal =
document.getElementById(
  "terminal-text"
);

if (terminal) {

  const terminalSets = [

`> boot ZombieOS
> load ZSharp
> ecosystem.status()

SYSTEM ONLINE`,

`> initialize runtime
> compiling modules
> loading assets

RUNTIME READY`,

`> connect services
> validating shell
> syncing modules

NETWORK STABLE`,

`> import ZSharp.Core
> launch subsystem
> checking ecosystem

ALL SYSTEMS ACTIVE`,

`> loading kernel
> starting runtime
> checking memory

PROTOTYPE ACTIVE`

  ];

  let terminalIndex = 0;

  function updateTerminal() {

    terminal.textContent =
    terminalSets[
      terminalIndex
    ];

    terminalIndex++;

    if (
      terminalIndex >=
      terminalSets.length
    ) {
      terminalIndex = 0;
    }
  }

  updateTerminal();

  setInterval(
    updateTerminal,
    30000
  );
}

/* =========================================
   OS DETECTION
========================================= */

const osText =
document.getElementById(
  "detected-os"
);

const downloadButton =
document.getElementById(
  "recommended-download"
);

if (
  osText &&
  downloadButton
) {

  const userAgent =
  navigator.userAgent;

  let os = "Unknown OS";
  let download = "#";

  if (
    userAgent.includes("Win")
  ) {

    os = "Windows";

    download =
    "downloads/ZOS-Windows.zip";

  } else if (
    userAgent.includes("Mac")
  ) {

    os = "macOS";

    download =
    "downloads/ZOS-Mac.zip";

  } else if (
    userAgent.includes("Linux")
  ) {

    os = "Linux";

    download =
    "downloads/ZOS-Linux.zip";

  } else if (
    /Android/i.test(userAgent)
  ) {

    os = "Android";

  } else if (
    /iPhone|iPad|iPod/i.test(userAgent)
  ) {

    os = "iOS";

  }

  osText.textContent =
  `Detected Platform: ${os}`;

  downloadButton.textContent =
  `Download for ${os}`;

  downloadButton.href =
  download;
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