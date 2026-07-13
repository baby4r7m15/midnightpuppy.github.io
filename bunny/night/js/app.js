/* ==========================================================
   Midnight Bunny OS
   Rev 10
   app.js
========================================================== */

"use strict";

/* ==========================================================
Global
========================================================== */

window.BUNNY = null;

/* ==========================================================
Debug Console
========================================================== */

function createDebugConsole(){

    if(document.getElementById("debug-console")) return;

    const panel = document.createElement("div");

    panel.id = "debug-console";

    panel.style.position = "fixed";
    panel.style.left = "10px";
    panel.style.right = "10px";
    panel.style.bottom = "10px";
    panel.style.height = "220px";
    panel.style.overflowY = "auto";
    panel.style.padding = "10px";
    panel.style.background = "rgba(0,0,0,.88)";
    panel.style.color = "#8cffb5";
    panel.style.fontFamily = "monospace";
    panel.style.fontSize = "12px";
    panel.style.border = "1px solid #555";
    panel.style.borderRadius = "12px";
    panel.style.zIndex = "999999";
    panel.style.whiteSpace = "pre-wrap";

    document.body.appendChild(panel);

}

window.debug = function(message, type="INFO"){

    const panel = document.getElementById("debug-console");

    const time = new Date().toLocaleTimeString();

    const line = `[${time}] [${type}] ${message}`;

    console.log(line);

    if(panel){

        panel.innerHTML += line + "<br>";

        panel.scrollTop = panel.scrollHeight;

    }

};

/* ==========================================================
Global Error Handler
========================================================== */

window.onerror = function(message, source, line, column, error){

    debug("========== CRASH ==========","ERROR");
    debug(message,"ERROR");
    debug("File: " + source,"ERROR");
    debug("Line: " + line,"ERROR");
    debug("Column: " + column,"ERROR");

    if(error){

        debug(error.stack,"ERROR");

    }

    return false;

};

window.onunhandledrejection = function(event){

    debug("Unhandled Promise","ERROR");

    debug(event.reason,"ERROR");

};

/* ==========================================================
Boot
========================================================== */

window.addEventListener(

    "DOMContentLoaded",

    bootOS

);

/* ==========================================================
Boot OS
========================================================== */

async function bootOS(){

    createDebugConsole();

    debug("app.js loaded","SUCCESS");

    try{

        debug("Loading JSON...");

        const response = await fetch(

            "data/midnightbunny.json"

        );

        debug("HTTP Status: " + response.status);

        if(!response.ok){

            throw new Error(

                "Unable to load midnightbunny.json"

            );

        }

        window.BUNNY = await response.json();

        debug("JSON loaded successfully","SUCCESS");

        initializeOS();

    }

    catch(error){

        debug("BOOT FAILURE","ERROR");

        debug(error.message,"ERROR");

        debug(error.stack,"ERROR");

        showBootFailure(error);

    }

}

/* ==========================================================
Initialize
========================================================== */

function initializeOS(){

    debug("Initializing OS...");

    runSystem(

        "Desktop",

        initializeDesktop

    );

    runSystem(

        "Windows",

        initializeWindows

    );

    runSystem(

        "Terminal",

        initializeTerminal

    );

    runSystem(

        "Clock",

        startClock

    );

    debug("Initialization complete.","SUCCESS");

}

/* ==========================================================
Subsystem Runner
========================================================== */

function runSystem(name, fn){

    try{

        debug("Starting " + name + "...");

        if(typeof fn !== "function"){

            throw new Error(

                name + " function missing."

            );

        }

        fn(window.BUNNY);

        debug(name + " OK","SUCCESS");

    }

    catch(error){

        debug(name + " FAILED","ERROR");

        debug(error.message,"ERROR");

        debug(error.stack,"ERROR");

        throw error;

    }

}

/* ==========================================================
Boot Failure
========================================================== */

function showBootFailure(error){

    let boot = document.getElementById(

        "boot-layer"

    );

    if(!boot){

        boot = document.createElement("div");

        boot.id = "boot-layer";

        document.body.appendChild(boot);

    }

    boot.innerHTML = `

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

    if(!clock){

        debug("Clock element missing.","WARN");

        return;

    }

    clock.textContent = new Date().toLocaleTimeString(

        [],

        {

            hour:"2-digit",

            minute:"2-digit"

        }

    );

}
