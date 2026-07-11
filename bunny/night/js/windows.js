/* ==========================================================
   Midnight Bunny OS
   Rev 9
   windows.js
========================================================== */

"use strict";

let highestZ = 100;

/* ==========================================================
Initialize
========================================================== */

function initializeWindows(data){

    const layer = document.getElementById("window-layer");

    if(!layer) return;

    layer.innerHTML = "";

    const windows = data.windows;

    Object.keys(windows).forEach(id=>{

        createWindow(id, windows[id]);

    });

}

/* ==========================================================
Create Window
========================================================== */

function createWindow(id, info){

    const layer = document.getElementById("window-layer");

    const windowElement = document.createElement("div");

    windowElement.className = "window";

    windowElement.dataset.window = id;

    windowElement.style.width = info.width + "px";
    windowElement.style.height = info.height + "px";

    windowElement.style.left = info.x + "px";
    windowElement.style.top = info.y + "px";

    windowElement.style.zIndex = ++highestZ;

    windowElement.innerHTML = `

        <div class="window-titlebar">

            <div class="window-title">

                ${info.title}

            </div>

            <div class="window-buttons">

                <button
                    class="window-close"
                    data-close="${id}">

                    ✕

                </button>

            </div>

        </div>

        <div class="window-content">

        </div>

    `;

    layer.appendChild(windowElement);

    attachWindowEvents(windowElement);

}

/* ==========================================================
Events
========================================================== */

function attachWindowEvents(windowElement){

    windowElement.addEventListener("mousedown",()=>{

        bringToFront(windowElement);

    });

    const closeButton = windowElement.querySelector(".window-close");

    closeButton.addEventListener("click",()=>{

        closeWindow(

            windowElement.dataset.window

        );

    });

}

/* ==========================================================
Open
========================================================== */

function openWindow(id){

    const windowElement = getWindow(id);

    if(!windowElement) return;

    windowElement.style.display = "block";

    bringToFront(windowElement);

}

/* ==========================================================
Close
========================================================== */

function closeWindow(id){

    const windowElement = getWindow(id);

    if(!windowElement) return;

    windowElement.style.display = "none";

}

/* ==========================================================
Focus
========================================================== */

function bringToFront(windowElement){

    windowElement.style.zIndex = ++highestZ;

}

/* ==========================================================
Helpers
========================================================== */

function getWindow(id){

    return document.querySelector(

        `.window[data-window="${id}"]`

    );

}

function getWindowContent(id){

    const windowElement = getWindow(id);

    if(!windowElement) return null;

    return windowElement.querySelector(

        ".window-content"

    );

}

function focusWindow(id){

    const windowElement = getWindow(id);

    if(!windowElement) return;

    bringToFront(windowElement);

}

/* ==========================================================
Toggle
========================================================== */

function toggleWindow(id){

    const windowElement = getWindow(id);

    if(!windowElement) return;

    if(windowElement.style.display==="none"){

        openWindow(id);

    }

    else{

        closeWindow(id);

    }

}

/* ==========================================================
Refresh
========================================================== */

function refreshWindows(){

    if(!window.BUNNY) return;

    initializeWindows(window.BUNNY);

}