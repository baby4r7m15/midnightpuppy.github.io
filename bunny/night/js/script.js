"use strict";

/* ==========================================================
CONFIG
========================================================== */

const CONFIG = {

    json: "midnightbunny.json"

};

let BUNNY = null;

/* ==========================================================
BOOT
========================================================== */

window.addEventListener(

    "DOMContentLoaded",

    init

);

async function init(){

    const response = await fetch(CONFIG.json);

    BUNNY = await response.json();

    applyTheme();

    buildBackground();

    buildAvatar();

    buildCards();

}

/* ==========================================================
THEME
========================================================== */

function applyTheme(){

    const root = document.documentElement;

    Object.entries(BUNNY.theme).forEach(

        ([key,value])=>{

            root.style.setProperty(

                "--"+key,

                value

            );

        }

    );

}

/* ==========================================================
BACKGROUND
========================================================== */

function buildBackground(){

    document.getElementById(

        "background"

    ).style.backgroundImage =

        `url("${BUNNY.background.image}")`;

}

/* ==========================================================
AVATAR
========================================================== */

function buildAvatar(){

    const avatar = document.getElementById(

        "avatar"

    );

    avatar.src =

        BUNNY.avatar.image;

    avatar.style.left =

        BUNNY.avatar.x + "px";

    avatar.style.top =

        BUNNY.avatar.y + "px";

    avatar.style.width =

        BUNNY.avatar.width + "px";

}

/* ==========================================================
CARDS
========================================================== */

function buildCards(){

    const container = document.getElementById(

        "cards"

    );

    container.innerHTML = "";

    BUNNY.cards.forEach(

        card=>{

            container.appendChild(

                createCard(card)

            );

        }

    );

}

/* ==========================================================
CREATE CARD
========================================================== */

function createCard(card){

    const box = document.createElement(

        "section"

    );

    box.className = "card";

    box.style.left = card.x + "px";

    box.style.top = card.y + "px";

    box.style.width = card.width + "px";

    box.style.height = card.height + "px";

    box.style.transform =

        `rotate(${card.rotation}deg)`;

    box.innerHTML = `

        <div class="card-header">

            <div class="card-icon">

                ${card.icon || ""}

            </div>

            <div>

                <div class="card-title">

                    ${card.title}

                </div>

                <div class="card-subtitle">

                    ${card.subtitle || ""}

                </div>

            </div>

        </div>

        <div class="card-content">

            ${renderContent(card.content)}

        </div>

    `;

    return box;

}

/* ==========================================================
CONTENT
========================================================== */

function renderContent(content){

    switch(content.type){

        case "text":

            return content.lines

                .map(

                    line=>`<p>${line}</p>`

                )

                .join("");

        case "list":

            return "<ul>" +

                content.items

                .map(

                    item=>`<li>${item}</li>`

                )

                .join("") +

                "</ul>";

        case "table":

            return "<table>" +

                content.rows

                .map(

                    row=>

                    `<tr>

                        <td>${row[0]}</td>

                        <td>${row[1]}</td>

                    </tr>`

                )

                .join("") +

                "</table>";

        case "terminal":

            return content.lines

                .map(

                    line=>

                    `<div>> ${line}</div>`

                )

                .join("");

        case "stats":

            return content.items

                .map(

                    stat=>

                    `<p>

                        <strong>${stat.label}</strong>

                        ${stat.value}%

                    </p>`

                )

                .join("");

        default:

            return "";

    }

}
