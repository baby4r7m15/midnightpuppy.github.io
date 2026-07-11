/* ==========================================================
   Midnight Bunny OS
   Rev 9
   toast.js
========================================================== */

"use strict";

let toastQueue = [];
let toastTimer = null;

/* ==========================================================
Initialize
========================================================== */

function initializeToasts(data){

    toastQueue = [...(data.notifications || [])];

    startToastLoop();

}

/* ==========================================================
Loop
========================================================== */

function startToastLoop(){

    if(toastTimer){

        clearInterval(toastTimer);

    }

    toastTimer = setInterval(()=>{

        if(!toastQueue.length) return;

        const message = toastQueue.shift();

        showToast(message);

        toastQueue.push(message);

    },7000);

}

/* ==========================================================
Show Toast
========================================================== */

function showToast(message){

    const layer = document.getElementById("toast-layer");

    if(!layer) return;

    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = `

        <div class="toast-header">

            🐇 Midnight Bunny OS

        </div>

        <div class="toast-body">

            ${message}

        </div>

        <div class="toast-progress"></div>

    `;

    layer.appendChild(toast);

    requestAnimationFrame(()=>{

        toast.classList.add("show");

    });

    setTimeout(()=>{

        toast.classList.remove("show");

        toast.classList.add("hide");

    },5000);

    setTimeout(()=>{

        toast.remove();

    },5600);

}

/* ==========================================================
Custom Toast
========================================================== */

function notify(message){

    showToast(message);

}

/* ==========================================================
Stop
========================================================== */

function stopToasts(){

    if(toastTimer){

        clearInterval(toastTimer);

    }

}
