const osText = document.getElementById("detected-os");
const downloadBtn = document.getElementById("recommended-download");

function detectOS() {
  const platform = navigator.userAgent.toLowerCase();

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

  if (platform.includes("linux") || platform.includes("x11")) {
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

  osText.textContent = `Detected System: ${os.name}`;
  downloadBtn.textContent = `Download Latest for ${os.name}`;
  downloadBtn.href = os.file;
}