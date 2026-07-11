/* ==========================================================
   Midnight Bunny OS
   Rev 9
   boot.js
========================================================== */

"use strict";

let bootFinished = false;

/* ==========================================================
Initialize
========================================================== */

function initializeBoot(data){

    if(!data.system.bootEnabled){

        return;

    }

    const layer = document.getElementById("boot-layer");

    if(!layer) return;

    renderBoot(layer, data);

}

/* ==========================================================
Render Boot Screen
========================================================== */

function renderBoot(layer, data){

    layer.innerHTML = `

    <div class="boot-screen">

        <div class="boot-logo">

            ${data.system.name}

        </div>

        <div class="boot-version">

            Version ${data.system.version}

        </div>

        <div
            class="boot-terminal"
            id="boot-terminal">

        </div>

    </div>

    `;

    playBoot(data);

}

/* ==========================================================
Boot Sequence
========================================================== */

function playBoot(data){

    const terminal = document.getElementById("boot-terminal");

    if(!terminal) return;

    const lines = [

        "Initializing Bunny Kernel...",
        "Loading filesystem...",
        "Mounting carrots...",
        "Starting desktop manager...",
        "Loading wallpaper...",
        "Loading profile...",
        "Loading windows...",
        "Loading notifications...",
        "Reality.dll loaded.",
        "Containment stable.",
        "Welcome back, " + data.profile.name + "."

    ];

    let index = 0;

    function nextLine(){

        if(index >= lines.length){

            finishBoot();

            return;

        }

        const line = document.createElement("div");

        line.className = "boot-line";

        line.textContent = lines[index];

        terminal.appendChild(line);

        terminal.scrollTop = terminal.scrollHeight;

        index++;

        setTimeout(nextLine, 180);

    }

    nextLine();

}

/* ==========================================================
Finish
========================================================== */

function finishBoot(){

    if(bootFinished) return;

    bootFinished = true;

    const layer = document.getElementById("boot-layer");

    if(!layer) return;

    layer.classList.add("boot-fade");

    setTimeout(()=>{

        layer.remove();

    },900);

}

/* ==========================================================
Replay
========================================================== */

function replayBoot(){

    bootFinished = false;

    initializeBoot(window.BUNNY);

}
