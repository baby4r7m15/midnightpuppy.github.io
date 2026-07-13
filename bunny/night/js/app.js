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

window.debug = function(message,type="INFO"){

    const output = document.getElementById(

        "debug-output"

    );

    const time = new Date().toLocaleTimeString();

    const line = document.createElement("div");

    let css = "debug-info";

    if(type==="SUCCESS") css="debug-success";

    if(type==="WARN") css="debug-warn";

    if(type==="ERROR") css="debug-error";

    line.className = css;

    line.textContent = `[${time}] ${type}  ${message}`;

    console.log(

        `[${type}] ${message}`

    );

    if(output){

        output.appendChild(line);

        output.scrollTop = output.scrollHeight;

    }

};

/* ==========================================================
Global Error Handlers
========================================================== */

window.onerror = function(message,source,line,column,error){

    debug("========== CRASH ==========","ERROR");
    debug(message,"ERROR");
    debug("File: "+source,"ERROR");
    debug("Line: "+line,"ERROR");
    debug("Column: "+column,"ERROR");

    if(error){

        debug(error.stack,"ERROR");

    }

    return false;

};

window.onunhandledrejection = function(event){

    debug("Unhandled Promise","ERROR");

    debug(String(event.reason),"ERROR");

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

    debug("app.js loaded","SUCCESS");

    const clearButton = document.getElementById(

        "debug-clear"

    );

    if(clearButton){

        clearButton.onclick = ()=>{

            document.getElementById(

                "debug-output"

            ).innerHTML = "";

        };

    }

    try{

        debug("Loading JSON...");

        const response = await fetch(

            "data/midnightbunny.json"

        );

        debug("HTTP Status: "+response.status);

        if(!response.ok){

            throw new Error(

                "Unable to load midnightbunny.json"

            );

        }

        window.BUNNY = await response.json();

        debug("JSON loaded.","SUCCESS");

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

    debug(

        "Initialization Complete",

        "SUCCESS"

    );

}

/* ==========================================================
Subsystem Runner
========================================================== */

function runSystem(name,fn){

    try{

        debug("Starting "+name+"...");

        if(typeof fn!=="function"){

            throw new Error(

                name+" function missing."

            );

        }

        fn(window.BUNNY);

        debug(name+" OK","SUCCESS");

    }

    catch(error){

        debug(name+" FAILED","ERROR");

        debug(error.message,"ERROR");

        debug(error.stack,"ERROR");

        throw error;

    }

}

/* ==========================================================
Boot Failure
========================================================== */

function showBootFailure(error){

    const boot = document.getElementById(

        "boot-layer"

    );

    if(!boot) return;

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

        debug(

            "#desktop-clock missing",

            "WARN"

        );

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

debug("app.js parsed","SUCCESS");
