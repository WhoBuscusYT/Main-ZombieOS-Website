const platformText =
document.getElementById("platform-text");

const downloadContainer =
document.getElementById("download-container");

if(platformText){

const platform =
navigator.platform.toLowerCase();

if(platform.includes("win")){

platformText.textContent =
"Windows detected. Your system supports the latest version of ZOS.";

}

else{

platformText.innerHTML =
`
<div class="unsupported-warning">
Your OS doesn't support the latest version of ZOS.
</div>
`;

downloadContainer.innerHTML = "";

}

}