/* ==========================================================
   Midnight Bunny OS
   Rev 11
   script.js
========================================================== */

"use strict";

/* ==========================================================
Global
========================================================== */

let BUNNY = null;

/* ==========================================================
Start
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    loadBunny

);

/* ==========================================================
Load JSON
========================================================== */

async function loadBunny(){

    try{

        const response = await fetch(

            "data/midnightbunny.json"

        );

        if(!response.ok){

            throw new Error(

                "Unable to load midnightbunny.json"

            );

        }

        BUNNY = await response.json();

        console.log(

            "🐇 Bunny Loaded",

            BUNNY

        );

        buildDesktop();

        startClock();

        startTerminal();

        startNotifications();

    }

    catch(error){

        document.getElementById(

            "desktop"

        ).innerHTML = `

            <div class="boot-error">

                <h1>BOOT FAILURE</h1>

                <p>${error.message}</p>

            </div>

        `;

    }

}

/* ==========================================================
Build Desktop
========================================================== */

function buildDesktop(){

    const desktop = document.getElementById(

        "desktop"

    );

    desktop.innerHTML = `

<div id="wallpaper"></div>

<div id="noise"></div>

<div id="glow"></div>

<header id="hud">

    <div>

        ${BUNNY.system.name}

        <span>

            Rev ${BUNNY.system.version}

        </span>

    </div>

    <div id="desktop-clock">

        --:--

    </div>

</header>

<div id="workspace">

</div>

`;

    buildWindows();

}

/* ==========================================================
Build Windows
========================================================== */

function buildWindows(){

    const workspace = document.getElementById(

        "workspace"

    );

    workspace.innerHTML = `

<!-- ======================================================
Profile
====================================================== -->

<section class="window profile">

    <div class="titlebar">

        about.txt

    </div>

    <div class="content">

        <h1>

            ${BUNNY.profile.name}

        </h1>

        <h2>

            ${BUNNY.profile.title}

        </h2>

        <p>

            ${BUNNY.profile.bio}

        </p>

        <table>

            <tr>

                <td>Status</td>

                <td>${BUNNY.profile.status}</td>

            </tr>

            <tr>

                <td>Pronouns</td>

                <td>${BUNNY.profile.pronouns}</td>

            </tr>

            <tr>

                <td>Level</td>

                <td>${BUNNY.about.level}</td>

            </tr>

            <tr>

                <td>Mood</td>

                <td>${BUNNY.about.mood}</td>

            </tr>

            <tr>

                <td>Food</td>

                <td>${BUNNY.about.favoriteFood}</td>

            </tr>

        </table>

    </div>

</section>

<!-- ======================================================
Avatar
====================================================== -->

<section class="window avatar">

    <div class="titlebar">

        avatar.png

    </div>

    <div class="content">

        <img

        src="${BUNNY.system.avatar}"

        alt="Avatar"

        class="avatar-image">

    </div>

</section>

<!-- ======================================================
Terminal
====================================================== -->

<section class="window terminal">

    <div class="titlebar">

        terminal.exe

    </div>

    <div

        class="content"

        id="terminal-output">

    </div>

</section>

<!-- ======================================================
Music
====================================================== -->

<section class="window music">

    <div class="titlebar">

        music.exe

    </div>

    <div class="content">

        <h3>

            ${BUNNY.music.nowPlaying}

        </h3>

        <p>

            ${BUNNY.music.artist}

        </p>

        <div class="progress">

            <div

            class="progress-fill"

            style="width:${BUNNY.music.progress}%">

            </div>

        </div>

    </div>

</section>

<!-- ======================================================
Notifications
====================================================== -->

<section class="window notifications">

    <div class="titlebar">

        notifications.log

    </div>

    <div

        class="content"

        id="notification-list">

    </div>

</section>

`;

    buildNotifications();

}

/* ==========================================================
Build Notifications
========================================================== */

function buildNotifications(){

    const list = document.getElementById(

        "notification-list"

    );

    if(!list) return;

    list.innerHTML = "";

    BUNNY.notifications.forEach(note=>{

        list.innerHTML += `

<div class="notification-card">

    ${note}

</div>

`;

    });

}

/* ==========================================================
Clock
========================================================== */

function startClock(){

    updateClock();

    setInterval(

        updateClock,

        1000

    );

}

function updateClock(){

    const clock = document.getElementById(

        "desktop-clock"

    );

    if(!clock) return;

    const now = new Date();

    clock.textContent = now.toLocaleTimeString(

        [],

        {

            hour:"2-digit",

            minute:"2-digit"

        }

    );

}

/* ==========================================================
Terminal
========================================================== */

function startTerminal(){

    const terminal = document.getElementById(

        "terminal-output"

    );

    if(!terminal) return;

    terminal.innerHTML = "";

    let index = 0;

    function nextLine(){

        if(index >= BUNNY.terminal.messages.length){

            return;

        }

        const line = document.createElement(

            "div"

        );

        line.className = "terminal-line";

        line.textContent =

            BUNNY.terminal.prompt +

            " " +

            BUNNY.terminal.messages[index];

        terminal.appendChild(

            line

        );

        terminal.scrollTop =

            terminal.scrollHeight;

        index++;

        setTimeout(

            nextLine,

            700

        );

    }

    nextLine();

}

/* ==========================================================
Notifications Animation
========================================================== */

function startNotifications(){

    const cards = document.querySelectorAll(

        ".notification-card"

    );

    cards.forEach((card,index)=>{

        card.style.animationDelay =

            (index * .15) + "s";

    });

}

console.log(

    "🐇 Midnight Bunny Rev 11 Ready"

);

/* ==========================================================
Optional Effects
========================================================== */

startWallpaper();

enableGlitch();

enableWindowGlow();

/* ==========================================================
Wallpaper
========================================================== */

function startWallpaper(){

    const wallpaper = document.getElementById(

        "wallpaper"

    );

    if(!wallpaper) return;

    wallpaper.style.backgroundImage =

        `url(${BUNNY.system.wallpaper})`;

}

/* ==========================================================
Window Glow
========================================================== */

function enableWindowGlow(){

    const windows = document.querySelectorAll(

        ".window"

    );

    windows.forEach(win=>{

        win.addEventListener(

            "mouseenter",

            ()=>{

                win.classList.add("active");

            }

        );

        win.addEventListener(

            "mouseleave",

            ()=>{

                win.classList.remove("active");

            }

        );

    });

}

/* ==========================================================
Glitch
========================================================== */

function enableGlitch(){

    if(!BUNNY.system.glitchEnabled) return;

    setInterval(()=>{

        const windows = document.querySelectorAll(

            ".window"

        );

        const random = windows[

            Math.floor(

                Math.random()*windows.length

            )

        ];

        if(!random) return;

        random.classList.add(

            "glitch"

        );

        setTimeout(()=>{

            random.classList.remove(

                "glitch"

            );

        },150);

    },4000);

}

/* ==========================================================
Random Notifications
========================================================== */

setInterval(()=>{

    const cards = document.querySelectorAll(

        ".notification-card"

    );

    if(cards.length===0) return;

    const card = cards[

        Math.floor(

            Math.random()*cards.length

        )

    ];

    card.classList.add(

        "pulse"

    );

    setTimeout(()=>{

        card.classList.remove(

            "pulse"

        );

    },700);

},5000);

/* ==========================================================
Random Terminal Activity
========================================================== */

setInterval(()=>{

    const terminal = document.getElementById(

        "terminal-output"

    );

    if(!terminal) return;

    const line = document.createElement(

        "div"

    );

    line.className = "terminal-line";

    line.textContent =

        BUNNY.terminal.prompt +

        " ping " +

        Math.floor(

            Math.random()*9999

        );

    terminal.appendChild(

        line

    );

    terminal.scrollTop =

        terminal.scrollHeight;

},9000);

console.log(

    "🐇 Midnight Bunny OS Ready"

);
