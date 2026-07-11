/* ==========================================================
   Midnight Bunny OS
   Rev 9
   about.js
========================================================== */

"use strict";

/* ==========================================================
Initialize
========================================================== */

function initializeAbout(data){

    const content = getWindowContent("about");

    if(!content) return;

    renderAbout(content, data);

}

/* ==========================================================
Render
========================================================== */

function renderAbout(container, data){

    const profile = data.profile || {};
    const about = data.about || {};

    container.innerHTML = `
    
    <div class="window-section">

        <img
            class="window-image"
            src="${data.system.avatar}"
            alt="${profile.name}"
        >

    </div>

    <div class="window-section">

        <h2 class="window-heading">

            ${profile.name}

        </h2>

        <div class="window-subtext">

            ${profile.title}

        </div>

    </div>

    <div class="window-section">

        <p class="window-text">

            ${profile.bio}

        </p>

    </div>

    <div class="window-section">

        <table class="table">

            <tr>

                <td>Status</td>

                <td>${profile.status}</td>

            </tr>

            <tr>

                <td>Pronouns</td>

                <td>${profile.pronouns}</td>

            </tr>

            <tr>

                <td>Level</td>

                <td>${about.level}</td>

            </tr>

            <tr>

                <td>Mood</td>

                <td>${about.mood}</td>

            </tr>

            <tr>

                <td>Favorite Color</td>

                <td>${about.favoriteColor}</td>

            </tr>

            <tr>

                <td>Favorite Food</td>

                <td>${about.favoriteFood}</td>

            </tr>

            <tr>

                <td>Location</td>

                <td>${about.location}</td>

            </tr>

        </table>

    </div>

    <div class="window-section">

        <span class="tag">

            Midnight Bunny OS

        </span>

    </div>

    `;

}

/* ==========================================================
Refresh
========================================================== */

function refreshAbout(){

    if(!window.BUNNY) return;

    const content = getWindowContent("about");

    if(!content) return;

    renderAbout(content, window.BUNNY);

}
