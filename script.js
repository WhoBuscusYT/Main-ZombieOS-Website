const osText =
document.getElementById("detected-os");

const downloadBtn =
document.getElementById("recommended-download");

function detectOS() {

  const platform =
  navigator.userAgent.toLowerCase();

  if (platform.includes("windows")) {

    return {
      name: "Windows",
      file: "downloads/ZOS-Windows.zip"
    };
  }

  if (platform.includes("mac")) {

    return {
      name: "macOS",
      file: "downloads/ZOS-Mac.zip"
    };
  }

  if (
    platform.includes("linux") ||
    platform.includes("x11")
  ) {

    return {
      name: "Linux",
      file: "downloads/ZOS-Linux.zip"
    };
  }

  if (platform.includes("android")) {

    return {
      name: "Android",
      file: "downloads/ZOS-Android.zip"
    };
  }

  return {
    name: "Unknown System",
    file: "downloads.html"
  };
}

if (osText && downloadBtn) {

  const os = detectOS();

  osText.textContent =
  `Detected System: ${os.name}`;

  downloadBtn.textContent =
  `Download Latest for ${os.name}`;

  downloadBtn.href = os.file;
}

/* Terminal Animation */

const terminal =
document.getElementById("terminal-text");

if (terminal) {

  const lines = [
    "> boot ZombieOS",
    "> load ZSharp",
    "> ecosystem.status()",
    "",
    "SYSTEM ONLINE"
  ];

  let currentLine = 0;
  let currentChar = 0;

  function typeTerminal() {

    if (currentLine >= lines.length) {
      return;
    }

    const line =
    lines[currentLine];

    if (currentChar < line.length) {

      terminal.innerHTML +=
      line.charAt(currentChar);

      currentChar++;

      setTimeout(typeTerminal, 35);

    } else {

      terminal.innerHTML += "<br>";

      currentLine++;
      currentChar = 0;

      setTimeout(typeTerminal, 250);
    }
  }

  setTimeout(typeTerminal, 500);
}