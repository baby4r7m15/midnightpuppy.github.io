/* ==========================================================
   Midnight Bunny OS
   Rev 9
   desktop.js
========================================================== */

"use strict";

/* ==========================================================
Create Desktop
========================================================== */

function createDesktop(data){

    const desktop = document.getElementById("desktop");

    if(!desktop) return;

    desktop.innerHTML = "";

    if(!data.icons) return;

    data.icons.forEach(icon => {

        desktop.appendChild(
            createDesktopIcon(icon)
        );

    });

}

/* ==========================================================
Create One Icon
========================================================== */

function createDesktopIcon(icon){

    const item = document.createElement("div");

    item.className = "desktop-icon";

    item.style.left = icon.x + "px";

    item.style.top = icon.y + "px";

    item.style.position = "absolute";

    item.dataset.window = icon.window;

    item.innerHTML = `

        <div class="icon">

            ${icon.icon}

        </div>

        <div class="label">

            ${icon.title}

        </div>

    `;

    item.addEventListener(

        "click",

        () => openWindow(icon.window)

    );

    return item;

}

/* ==========================================================
Refresh Desktop
========================================================== */

function refreshDesktop(){

    if(window.BUNNY){

        createDesktop(window.BUNNY);

    }

}
