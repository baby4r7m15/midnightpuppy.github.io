debug("✅ desktop.js loaded");

/* ==========================================================
   Midnight Bunny OS
   desktop.js
========================================================== */

"use strict";

/* ==========================================================
Initialize Desktop
========================================================== */

function initializeDesktop(data){

    const desktop = document.getElementById("desktop");

    if(!desktop) return;

    buildDesktopWindows(data);

}

/* ==========================================================
Build Layout
========================================================== */

function buildDesktopWindows(data){

    const layer = document.getElementById("window-layer");

    layer.innerHTML = "";

    createWindow("profile",{
        title:"profile.sys",
        x:40,
        y:70,
        width:320,
        height:540
    });

    createWindow("avatar",{
        title:"avatar.png",
        x:390,
        y:70,
        width:520,
        height:540
    });

    createWindow("terminal",{
        title:"terminal",
        x:40,
        y:630,
        width:560,
        height:280
    });

    createWindow("quests",{
        title:"quests.log",
        x:930,
        y:70,
        width:320,
        height:240
    });

    createWindow("music",{
        title:"music.exe",
        x:930,
        y:330,
        width:320,
        height:160
    });

    createWindow("status",{
        title:"status.sys",
        x:930,
        y:510,
        width:320,
        height:200
    });

    populateProfile(data);

    populateAvatar(data);

    populateQuests(data);

    populateMusic(data);

    populateStatus(data);

}

/* ==========================================================
Profile
========================================================== */

function populateProfile(data){

    const el=getWindowContent("profile");

    if(!el) return;

    el.innerHTML=`

<h2>${data.profile.name}</h2>

<p class="window-subtext">

${data.profile.title}

</p>

<br>

<table class="table">

<tr>

<td>Status</td>

<td>${data.profile.status}</td>

</tr>

<tr>

<td>Pronouns</td>

<td>${data.profile.pronouns}</td>

</tr>

<tr>

<td>Mood</td>

<td>${data.about.mood}</td>

</tr>

<tr>

<td>Level</td>

<td>${data.about.level}</td>

</tr>

<tr>

<td>Food</td>

<td>${data.about.favoriteFood}</td>

</tr>

</table>

`;

}

/* ==========================================================
Avatar
========================================================== */

function populateAvatar(data){

    const el=getWindowContent("avatar");

    if(!el) return;

    el.innerHTML=`

<img
class="window-image"
src="${data.system.avatar}">

`;

}

/* ==========================================================
Quests
========================================================== */

function populateQuests(data){

    const el=getWindowContent("quests");

    if(!el) return;

    el.innerHTML=data.notifications.map(n=>`

<div class="card">

${n}

</div>

`).join("");

}

/* ==========================================================
Music
========================================================== */

function populateMusic(data){

    const el=getWindowContent("music");

    if(!el) return;

    el.innerHTML=`

<div class="window-text">

${data.music.nowPlaying}

</div>

<div class="window-subtext">

${data.music.artist}

</div>

<div class="progress">

<div
class="progress-fill"
style="width:${data.music.progress}%">

</div>

</div>

`;

}

/* ==========================================================
Status
========================================================== */

function populateStatus(data){

    const el=getWindowContent("status");

    if(!el) return;

    el.innerHTML=`

<table class="table">

<tr>

<td>Version</td>

<td>${data.system.version}</td>

</tr>

<tr>

<td>Theme</td>

<td>${data.system.theme}</td>

</tr>

<tr>

<td>Chaos</td>

<td>99%</td>

</tr>

<tr>

<td>Containment</td>

<td>ACTIVE</td>

</tr>

</table>

`;

}
