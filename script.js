const copyright = document.getElementById("copyright-text");

if (copyright) {
  const year = new Date().getFullYear();
  copyright.textContent = `ZombieOS / ZOS © ${year}`;
}

const terminal = document.getElementById("terminal-text");

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

    `> loading prototype
> checking memory
> waking shell

PROTOTYPE ACTIVE`
  ];

  let terminalIndex = 0;

  function updateTerminal() {
    terminal.textContent = terminalSets[terminalIndex];
    terminalIndex = (terminalIndex + 1) % terminalSets.length;
  }

  updateTerminal();
  setInterval(updateTerminal, 30000);
}

const osText = document.getElementById("detected-os");
const downloadButton = document.getElementById("recommended-download");

if (osText && downloadButton) {
  const userAgent = navigator.userAgent.toLowerCase();

  let os = "Unknown OS";
  let download = "#";

  if (userAgent.includes("android")) {
    os = "Android";
    download = "#";
  } else if (userAgent.includes("iphone") || userAgent.includes("ipad") || userAgent.includes("ipod")) {
    os = "iOS";
    download = "#";
  } else if (userAgent.includes("windows")) {
    os = "Windows";
    download = "downloads/ZOS-Windows.zip";
  } else if (userAgent.includes("mac")) {
    os = "macOS";
    download = "downloads/ZOS-Mac.zip";
  } else if (userAgent.includes("linux") || userAgent.includes("x11")) {
    os = "Linux";
    download = "downloads/ZOS-Linux.zip";
  }

  osText.textContent = `Detected Platform: ${os}`;

  if (download === "#") {
    downloadButton.textContent = `${os} Download Not Available Yet`;
    downloadButton.href = "#";
  } else {
    downloadButton.textContent = `Download for ${os}`;
    downloadButton.href = download;
  }
}

const fills = document.querySelectorAll(".status-fill");

fills.forEach((fill) => {
  const percent = parseInt(fill.getAttribute("data-percent"), 10) || 0;
  let current = 0;

  const interval = setInterval(() => {
    if (current >= percent) {
      clearInterval(interval);
      return;
    }

    current++;
    fill.style.width = current + "%";
  }, 15);
});