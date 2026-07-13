/* ==========================================================
   Midnight Bunny
   Rev 11
   script.js
========================================================== */

"use strict";

/* ==========================================================
CONFIG
========================================================== */

const CONFIG = {

    json: "data/bunny.json",

    discord: {

        enabled: true,

        userID: "YOUR_DISCORD_ID",

        refresh: 15000

    }

};

/* ==========================================================
GLOBAL DATA
========================================================== */

let BUNNY = null;

let DISCORD = null;

/* ==========================================================
BOOT
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    boot

);

/* ==========================================================
BOOT
========================================================== */

async function boot(){

    try{

        await loadJSON();

        buildDesktop();

        startDiscord();

    }

    catch(error){

        console.error(error);

    }

}

/* ==========================================================
LOAD JSON
========================================================== */

async function loadJSON(){

    const response = await fetch(

        CONFIG.json

    );

    if(!response.ok){

        throw new Error(

            "Unable to load bunny.json"

        );

    }

    BUNNY = await response.json();

    console.log(

        "🐇 Bunny Loaded",

        BUNNY

    );

}
/* ==========================================================
BUILD DESKTOP
========================================================== */

function buildDesktop(){

    buildBackground();

    buildAvatar();

    buildCards();

}

/* ==========================================================
BACKGROUND
========================================================== */

function buildBackground(){

    const background = document.getElementById(

        "background"

    );

    if(!background) return;

    background.style.backgroundImage =

        `url("${BUNNY.desktop.background}")`;

}

/* ==========================================================
AVATAR
========================================================== */

function buildAvatar(){

    const avatar = document.getElementById(

        "avatar"

    );

    if(!avatar) return;

    const data = BUNNY.desktop.avatar;

    avatar.src = data.image;

    avatar.style.left = data.x + "px";

    avatar.style.top = data.y + "px";

    avatar.style.width = data.width + "px";

    avatar.style.height = data.height + "px";

}

/* ==========================================================
CARDS
========================================================== */

function buildCards(){

    const container = document.getElementById(

        "cards"

    );

    if(!container) return;

    container.innerHTML = "";

    BUNNY.cards.forEach(card=>{

        container.appendChild(

            createCard(card)

        );

    });

}
/* ==========================================================
CREATE CARD
========================================================== */

function createCard(card){

    const element = document.createElement(

        "section"

    );

    element.className =

        `card theme-${card.theme}`;

    element.id = card.id;

    /* Position */

    element.style.left =

        card.style.x + "px";

    element.style.top =

        card.style.y + "px";

    element.style.width =

        card.style.width + "px";

    element.style.height =

        card.style.height + "px";

    element.style.zIndex =

        card.style.z || 1;

    element.style.opacity =

        card.style.opacity || 1;

    element.style.transform =

        `rotate(${card.style.rotation || 0}deg)`;

    /* Header */

    element.innerHTML = `

        <div class="card-header">

            <div class="card-icon">

                ${card.icon || ""}

            </div>

            <div class="card-heading">

                <div class="card-title">

                    ${card.title}

                </div>

                <div class="card-subtitle">

                    ${card.subtitle || ""}

                </div>

            </div>

        </div>

        <div class="card-content"></div>

    `;

    const content = element.querySelector(

        ".card-content"

    );

    switch(card.type){

        case "table":

            renderTable(content, card);

            break;

        case "text":

            renderText(content, card);

            break;

        case "list":

            renderList(content, card);

            break;

        case "stats":

            renderStats(content, card);

            break;

        case "terminal":

            renderTerminal(content, card);

            break;

        case "music":

            renderMusic(content, card);

            break;

        case "discord":

            renderDiscord(content, card);

            break;

        case "checklist":

            renderChecklist(content, card);

            break;

    }

    return element;

}
/* ==========================================================
TABLE
========================================================== */

function renderTable(container, card){

    const table = document.createElement("table");

    card.rows.forEach(row=>{

        const tr = document.createElement("tr");

        tr.innerHTML = `

            <td>${row[0]}</td>

            <td>${row[1]}</td>

        `;

        table.appendChild(tr);

    });

    container.appendChild(table);

}

/* ==========================================================
TEXT
========================================================== */

function renderText(container, card){

    card.text.forEach(line=>{

        const p = document.createElement("p");

        p.textContent = line;

        container.appendChild(p);

    });

}

/* ==========================================================
LIST
========================================================== */

function renderList(container, card){

    const ul = document.createElement("ul");

    card.items.forEach(item=>{

        const li = document.createElement("li");

        li.textContent = item;

        ul.appendChild(li);

    });

    container.appendChild(ul);

}
/* ==========================================================
STATS
========================================================== */

function renderStats(container, card){

    card.stats.forEach(stat=>{

        const item = document.createElement("div");

        item.className = "stat";

        item.innerHTML = `

            <div class="stat-label">

                ${stat.label}

                <span>${stat.value}%</span>

            </div>

            <div class="stat-bar">

                <div
                    class="stat-fill"
                    style="width:${stat.value}%">
                </div>

            </div>

        `;

        container.appendChild(item);

    });

}

/* ==========================================================
TERMINAL
========================================================== */

function renderTerminal(container, card){

    container.classList.add(

        "terminal"

    );

    card.lines.forEach(line=>{

        const div = document.createElement("div");

        div.className =

            "terminal-line";

        div.textContent =

            "> " + line;

        container.appendChild(div);

    });

}

/* ==========================================================
MUSIC
========================================================== */

function renderMusic(container, card){

    container.innerHTML = `

        <div class="music-track">

            ${card.track}

        </div>

        <div class="music-artist">

            ${card.artist}

        </div>

        <div class="music-progress">

            <div
                class="music-progress-fill"
                style="width:${card.progress}%">
            </div>

        </div>

    `;

}

/* ==========================================================
CHECKLIST
========================================================== */

function renderChecklist(container, card){

    const ul = document.createElement("ul");

    card.items.forEach(item=>{

        const li = document.createElement("li");

        li.className =

            item.done

            ? "done"

            : "";

        li.innerHTML =

            `${item.done ? "☑" : "☐"} ${item.text}`;

        ul.appendChild(li);

    });

    container.appendChild(ul);

}
/* ==========================================================
DISCORD (LANYARD)
========================================================== */

async function updateDiscord(){

    if(!CONFIG.discord.enabled){

        return;

    }

    try{

        const response = await fetch(

            `https://api.lanyard.rest/v1/users/${CONFIG.discord.userID}`

        );

        const json = await response.json();

        if(!json.success){

            return;

        }

        DISCORD = json.data;

        refreshDiscordCard();

    }

    catch(error){

        console.error(

            "Discord Error",

            error

        );

    }

}

function startDiscord(){

    updateDiscord();

    setInterval(

        updateDiscord,

        CONFIG.discord.refresh

    );

}

/* ==========================================================
RENDER DISCORD
========================================================== */

function renderDiscord(container){

    container.classList.add(

        "discord-card"

    );

    container.innerHTML =

        "<div class='discord-loading'>Connecting to Discord...</div>";

}

function refreshDiscordCard(){

    if(!DISCORD) return;

    const card = document.querySelector(

        "#discord .card-content"

    );

    if(!card) return;

    const statusColors={

        online:"#43b581",

        idle:"#faa61a",

        dnd:"#f04747",

        offline:"#747f8d"

    };

    const color=

        statusColors[DISCORD.discord_status]

        || "#747f8d";

    let activity="Nothing right now";

    if(

        DISCORD.activities

        &&

        DISCORD.activities.length

    ){

        const custom=

            DISCORD.activities.find(

                a=>a.type===4

            );

        const playing=

            DISCORD.activities.find(

                a=>a.type===0

            );

        const spotify=

            DISCORD.listening_to_spotify;

        if(spotify){

            activity=

                "🎵 " +

                DISCORD.spotify.song +

                "<br>" +

                DISCORD.spotify.artist;

        }

        else if(playing){

            activity=

                "🎮 " +

                playing.name;

        }

        else if(custom){

            activity=

                custom.state;

        }

    }

    card.innerHTML=`

        <div class="discord-status">

            <span
                class="status-dot"
                style="background:${color}">
            </span>

            ${DISCORD.discord_status.toUpperCase()}

        </div>

        <div class="discord-activity">

            ${activity}

        </div>

    `;

}
