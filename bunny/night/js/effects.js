/* ==========================================================
   Midnight Bunny OS
   Rev 9
   effects.js
========================================================== */

"use strict";

let glitchTimer = null;
let clockTimer = null;

/* ==========================================================
Initialize
========================================================== */

function initializeEffects(data){

    initializeClock();

    if(data.system.glitchEnabled){

        startGlitchLoop();

    }

}

/* ==========================================================
Desktop Clock
========================================================== */

function initializeClock(){

    updateClock();

    clockTimer = setInterval(updateClock,1000);

}

function updateClock(){

    const clock = document.getElementById("desktop-clock");

    if(!clock) return;

    const now = new Date();

    clock.textContent = now.toLocaleTimeString([],{

        hour:"2-digit",

        minute:"2-digit"

    });

}

/* ==========================================================
Random Glitch
========================================================== */

function startGlitchLoop(){

    glitchTimer = setInterval(()=>{

        triggerGlitch();

    },random(6000,14000));

}

function triggerGlitch(){

    document.body.classList.add("glitch");

    setTimeout(()=>{

        document.body.classList.remove("glitch");

    },220);

}

/* ==========================================================
Random Notification
========================================================== */

function randomNotification(){

    if(!window.BUNNY) return;

    const list = window.BUNNY.notifications;

    if(!list || !list.length) return;

    const index = Math.floor(

        Math.random()*list.length

    );

    notify(list[index]);

}

/* ==========================================================
Wallpaper Drift
========================================================== */

function wallpaperShift(){

    document.body.style.backgroundPosition =

        random(-20,20)+"px "+

        random(-20,20)+"px";

}

/* ==========================================================
RGB Flash
========================================================== */

function rgbFlash(){

    document.body.classList.add("rgb-flash");

    setTimeout(()=>{

        document.body.classList.remove("rgb-flash");

    },150);

}

/* ==========================================================
Utility
========================================================== */

function random(min,max){

    return Math.floor(

        Math.random()*(max-min+1)

    )+min;

}

/* ==========================================================
Cleanup
========================================================== */

function stopEffects(){

    clearInterval(glitchTimer);

    clearInterval(clockTimer);

}
