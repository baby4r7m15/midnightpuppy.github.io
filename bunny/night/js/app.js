/* ==========================================================
   Midnight Bunny OS
   app.js
========================================================== */

"use strict";

/* ==========================================================
Global
========================================================== */

window.BUNNY = null;

/* ==========================================================
Boot
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    bootOS

);

/* ==========================================================
Load JSON
========================================================== */

async function bootOS(){

    try{

        const response = await fetch(
            "data/midnightbunny.json"
        );

        if(!response.ok){

            throw new Error(
                "Unable to load midnightbunny.json"
            );

        }

        window.BUNNY = await response.json();

        initializeOS();

    }

    catch(error){

        console.error(error);

        document.body.innerHTML = `

            <div class="boot-screen">

                <div class="boot-logo">

                    BOOT FAILURE

                </div>

                <div class="boot-terminal">

                    ${error.message}

                </div>

            </div>

        `;

    }

}

/* ==========================================================
Initialize
========================================================== */

function initializeOS(){

    if(typeof initializeDesktop==="function"){

        initializeDesktop(window.BUNNY);

    }

    if(typeof initializeWindows==="function"){

        initializeWindows(window.BUNNY);

    }

    if(typeof initializeTerminal==="function"){

        initializeTerminal(window.BUNNY);

    }

    startClock();

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
