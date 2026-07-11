/* ==========================================================
   Midnight Bunny OS
   windows.js
========================================================== */

"use strict";

let highestWindow = 10;

/* ==========================================================
Create Window
========================================================== */

function createWindow(id, options){

    const layer = document.getElementById("window-layer");

    const win = document.createElement("section");

    win.className = "window";

    win.dataset.window = id;

    win.style.left = options.x + "px";
    win.style.top = options.y + "px";

    win.style.width = options.width + "px";
    win.style.height = options.height + "px";

    win.style.zIndex = ++highestWindow;

    win.innerHTML = `

        <div class="window-titlebar">

            <div class="window-buttons">

                <span class="window-close"></span>
                <span class="window-min"></span>
                <span class="window-max"></span>

            </div>

            <div class="window-title">

                ${options.title}

            </div>

        </div>

        <div class="window-content"></div>

    `;

    layer.appendChild(win);

    makeWindowDraggable(win);

    focusWindow(win);

}

/* ==========================================================
Initialize
========================================================== */

function initializeWindows(){

    document.querySelectorAll(".window").forEach(win=>{

        focusWindow(win);

    });

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

    const win = getWindow(id);

    if(!win) return null;

    return win.querySelector(

        ".window-content"

    );

}

/* ==========================================================
Focus
========================================================== */

function focusWindow(win){

    win.addEventListener(

        "mousedown",

        ()=>{

            highestWindow++;

            win.style.zIndex = highestWindow;

        }

    );

}

/* ==========================================================
Drag
========================================================== */

function makeWindowDraggable(win){

    const bar = win.querySelector(

        ".window-titlebar"

    );

    let dragging = false;

    let startX = 0;

    let startY = 0;

    let left = 0;

    let top = 0;

    bar.addEventListener(

        "mousedown",

        e=>{

            dragging = true;

            startX = e.clientX;

            startY = e.clientY;

            left = win.offsetLeft;

            top = win.offsetTop;

            highestWindow++;

            win.style.zIndex = highestWindow;

        }

    );

    document.addEventListener(

        "mousemove",

        e=>{

            if(!dragging) return;

            win.style.left =

                left + (e.clientX-startX) + "px";

            win.style.top =

                top + (e.clientY-startY) + "px";

        }

    );

    document.addEventListener(

        "mouseup",

        ()=>{

            dragging = false;

        }

    );

}
```
