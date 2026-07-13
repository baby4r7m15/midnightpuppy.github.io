/* ==========================================================
   Midnight Bunny OS
   Rev 10
   desktop.js
========================================================== */

"use strict";

debug("Loading desktop.js...");

/* ==========================================================
Initialize Desktop
========================================================== */

function initializeDesktop(data){

    debug("initializeDesktop()");

    if(!data){

        throw new Error("No Bunny data supplied.");

    }

    buildDesktopWindows(data);

}

/* ==========================================================
Desktop Layout
========================================================== */

function buildDesktopWindows(data){

    debug("Building desktop layout...");

    const layer = document.getElementById("window-layer");

    if(!layer){

        throw new Error("#window-layer not found.");

    }

    layer.innerHTML = "";

    const windows = [

        {

            id:"profile",

            title:"profile.sys",

            x:30,

            y:40,

            width:310,

            height:520

        },

        {

            id:"avatar",

            title:"avatar.png",

            x:360,

            y:40,

            width:470,

            height:520

        },

        {

            id:"terminal",

            title:"terminal",

            x:20,

            y:580,

            width:610,

            height:270

        },

        {

            id:"quests",

            title:"quests.log",

            x:850,

            y:40,

            width:320,

            height:230

        },

        {

            id:"music",

            title:"music.exe",

            x:850,

            y:290,

            width:320,

            height:160

        },

        {

            id:"status",

            title:"status.sys",

            x:850,

            y:470,

            width:320,

            height:220

        }

    ];

    windows.forEach(win=>{

        debug("Calling createWindow(): " + win.id);

        createWindow(

            win.id,

            win

        );

    });

    debug("Populating windows...");

    populateProfile(data);

    populateAvatar(data);

    populateQuests(data);

    populateMusic(data);

    populateStatus(data);

    debug("Desktop complete.","SUCCESS");

}

/* ==========================================================
Profile
========================================================== */

function populateProfile(data){

    debug("Profile...");

    const el = getWindowContent("profile");

    if(!el){

        throw new Error(

            "Profile window missing."

        );

    }

    el.innerHTML = `

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

<td>Level</td>

<td>${data.about.level}</td>

</tr>

<tr>

<td>Mood</td>

<td>${data.about.mood}</td>

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

    debug("Avatar...");

    const el = getWindowContent("avatar");

    if(!el){

        throw new Error(

            "Avatar window missing."

        );

    }

    el.innerHTML = `

<img

class="window-image"

src="${data.system.avatar}"

alt="Avatar">

`;

}

/* ==========================================================
Quests
========================================================== */

function populateQuests(data){

    debug("Quests...");

    const el = getWindowContent("quests");

    if(!el){

        throw new Error(

            "Quest window missing."

        );

    }

    el.innerHTML = "";

    data.notifications.forEach(note=>{

        el.innerHTML += `

<div class="card">

${note}

</div>

`;

    });

}

/* ==========================================================
Music
========================================================== */

function populateMusic(data){

    debug("Music...");

    const el = getWindowContent("music");

    if(!el){

        throw new Error(

            "Music window missing."

        );

    }

    el.innerHTML = `

<div>

<strong>

${data.music.nowPlaying}

</strong>

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

    debug("Status...");

    const el = getWindowContent("status");

    if(!el){

        throw new Error(

            "Status window missing."

        );

    }

    el.innerHTML = `

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

debug("desktop.js loaded.","SUCCESS");
