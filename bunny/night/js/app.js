/* ==========================================================
   Midnight Bunny OS
   Rev 9
   app.js
========================================================== */

"use strict";

/* ==========================================================
Global Data
========================================================== */

window.BUNNY = null;

/* ==========================================================
Load JSON
========================================================== */

async function loadBunnyData(){

    try{

        const response = await fetch("data/midnightbunny.json");

        if(!response.ok){

            throw new Error(
                `Unable to load midnightbunny.json (${response.status})`
            );

        }

        window.BUNNY = await response.json();

        console.log(
            "🐇 Midnight Bunny loaded.",
            window.BUNNY
        );

        initializeOS();

    }

    catch(error){

        console.error(error);

        document.body.innerHTML = `
            <div style="
                color:white;
                font-family:monospace;
                padding:40px;
            ">
                <h2>Boot Failure</h2>
                <p>${error.message}</p>
            </div>
        `;

    }

}

/* ==========================================================
Initialize OS
========================================================== */

function initializeOS(){

    if(typeof initializeDesktop === "function"){

        initializeDesktop(window.BUNNY);

    }

    if(typeof initializeWindows === "function"){

        initializeWindows(window.BUNNY);

    }

    if(typeof initializeAbout === "function"){

        initializeAbout(window.BUNNY);

    }

    if(typeof initializeTerminal === "function"){

        initializeTerminal(window.BUNNY);

    }

    if(typeof initializeMusic === "function"){

        initializeMusic(window.BUNNY);

    }

    if(typeof initializeBoot === "function"){

        initializeBoot(window.BUNNY);

    }

    if(typeof initializeToasts === "function"){

        initializeToasts(window.BUNNY);

    }

    if(typeof initializeEffects === "function"){

        initializeEffects(window.BUNNY);

    }

}

/* ==========================================================
Start
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    loadBunnyData

);
