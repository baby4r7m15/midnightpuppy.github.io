/* ==========================================================
   Midnight Bunny OS
   Rev 10
   windows.js
========================================================== */

"use strict";

debug("Loading windows.js...");

/* ==========================================================
Globals
========================================================== */

let highestWindow = 100;

/* ==========================================================
Initialize
========================================================== */

function initializeWindows(){

    debug("initializeWindows()");

    const windows = document.querySelectorAll(".window");

    debug("Found " + windows.length + " window(s).");

    windows.forEach(win=>{

        focusWindow(win);

    });

}

/* ==========================================================
Create Window
========================================================== */

function createWindow(id, options){

    debug("Creating window: " + id);

    try{

        const layer = document.getElementById("window-layer");

        if(!layer){

            throw new Error(
                "#window-layer not found."
            );

        }

        const win = document.createElement("section");

        win.className = "window";

        win.dataset.window = id;

        win.style.left = options.x + "px";
        win.style.top = options.y + "px";
        win.style.width = options.width + "px";
        win.style.height = options.height + "px";

        highestWindow++;

        win.style.zIndex = highestWindow;

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

        debug("Created: " + id,"SUCCESS");

        return win;

    }

    catch(error){

        debug("Window failed: " + id,"ERROR");

        debug(error.message,"ERROR");

        debug(error.stack,"ERROR");

        throw error;

    }

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

    if(!win){

        debug(

            "Missing window: " + id,

            "WARN"

        );

        return null;

    }

    const content = win.querySelector(

        ".window-content"

    );

    if(!content){

        debug(

            "Missing .window-content in " + id,

            "WARN"

        );

    }

    return content;

}

/* ==========================================================
Focus
========================================================== */

function focusWindow(win){

    if(!win) return;

    win.addEventListener(

        "mousedown",

        ()=>{

            highestWindow++;

            win.style.zIndex = highestWindow;

            document

            .querySelectorAll(".window")

            .forEach(w=>{

                w.classList.remove("active");

            });

            win.classList.add("active");

        }

    );

}

/* ==========================================================
Dragging
========================================================== */

function makeWindowDraggable(win){

    const bar = win.querySelector(

        ".window-titlebar"

    );

    if(!bar){

        debug(

            "No titlebar found.",

            "WARN"

        );

        return;

    }

    let dragging = false;

    let startX = 0;
    let startY = 0;

    let startLeft = 0;
    let startTop = 0;

    bar.addEventListener(

        "mousedown",

        e=>{

            dragging = true;

            startX = e.clientX;
            startY = e.clientY;

            startLeft = win.offsetLeft;
            startTop = win.offsetTop;

            highestWindow++;

            win.style.zIndex = highestWindow;

        }

    );

    document.addEventListener(

        "mousemove",

        e=>{

            if(!dragging) return;

            win.style.left =

                startLeft +

                (e.clientX-startX)

                + "px";

            win.style.top =

                startTop +

                (e.clientY-startY)

                + "px";

        }

    );

    document.addEventListener(

        "mouseup",

        ()=>{

            dragging = false;

        }

    );

}

/* ==========================================================
Loaded
========================================================== */

debug(

    "windows.js loaded",

    "SUCCESS"

);

debug(

    "createWindow = " +

    typeof createWindow

);
