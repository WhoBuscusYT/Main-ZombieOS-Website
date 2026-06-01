/* IMAGE STORAGE */

let avatarBase64 = "";
let bannerBase64 = "";

/* ELEMENTS */

const bannerUpload =
document.getElementById(
"banner-upload"
);

const bannerPreview =
document.getElementById(
"profile-banner-preview"
);

const avatarUpload =
document.getElementById(
"avatar-upload"
);

const avatarPreview =
document.getElementById(
"profile-avatar-preview"
);

/* LOAD SAVED IMAGES */

if(data.avatarBase64){

avatarPreview.src =
data.avatarBase64;

avatarBase64 =
data.avatarBase64;

}

if(data.bannerBase64){

bannerPreview.src =
data.bannerBase64;

bannerBase64 =
data.bannerBase64;

}

/* MAX SIZE */

const MAX_FILE_SIZE =
5 * 1024 * 1024;

/* BANNER */

if(
bannerUpload &&
bannerPreview
){

bannerUpload.onchange =
(event)=>{

const file =
event.target.files[0];

if(!file){

return;

}

/* SIZE CHECK */

if(
file.size > MAX_FILE_SIZE
){

alert(
"Banner image exceeds 5MB limit."
);

return;

}

const reader =
new FileReader();

reader.onload =
(e)=>{

bannerBase64 =
e.target.result;

bannerPreview.src =
bannerBase64;

};

reader.readAsDataURL(
file
);

};

}

/* AVATAR */

if(
avatarUpload &&
avatarPreview
){

avatarUpload.onchange =
(event)=>{

const file =
event.target.files[0];

if(!file){

return;

}

/* SIZE CHECK */

if(
file.size > MAX_FILE_SIZE
){

alert(
"Profile picture exceeds 5MB limit."
);

return;

}

const reader =
new FileReader();

reader.onload =
(e)=>{

avatarBase64 =
e.target.result;

avatarPreview.src =
avatarBase64;

};

reader.readAsDataURL(
file
);

};

}