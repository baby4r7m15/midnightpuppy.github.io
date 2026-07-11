/* ==========================================================
   Midnight Bunny OS
   Rev 9
   drag.js
========================================================== */

"use strict";

let dragWindow = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

/* ==========================================================
Initialize
========================================================== */

function initializeDragging(){

    document.addEventListener("mousedown", beginDrag);

    document.addEventListener("mousemove", drag);

    document.addEventListener("mouseup", endDrag);

}

/* ==========================================================
Begin Drag
========================================================== */

function beginDrag(e){

    const titlebar = e.target.closest(".window-titlebar");

    if(!titlebar) return;

    dragWindow = titlebar.parentElement;

    const rect = dragWindow.getBoundingClientRect();

    dragOffsetX = e.clientX - rect.left;

    dragOffsetY = e.clientY - rect.top;

    focusWindow(dragWindow.dataset.window);

}

/* ==========================================================
Dragging
========================================================== */

function drag(e){

    if(!dragWindow) return;

    dragWindow.style.left =
        (e.clientX - dragOffsetX) + "px";

    dragWindow.style.top =
        (e.clientY - dragOffsetY) + "px";

}

/* ==========================================================
Stop Drag
========================================================== */

function endDrag(){

    dragWindow = null;

}

/* ==========================================================
Start
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    initializeDragging

);
