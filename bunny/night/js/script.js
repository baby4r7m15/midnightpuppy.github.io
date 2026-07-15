"use strict";

const JSON_FILE="data/midnightbunny.json";

let DATA=null;

document.addEventListener(

    "DOMContentLoaded",

    init

);

async function init(){

    const response=await fetch(JSON_FILE);

    DATA=await response.json();

    buildBackground();

    buildAvatar();

    buildCards();

}
function buildBackground(){

    const bg=document.getElementById(

        "background"

    );

    bg.src=DATA.background;

}
function buildAvatar(){

    const avatar=document.getElementById(

        "avatar"

    );

    avatar.src=DATA.avatar.image;

    avatar.style.left=

        DATA.avatar.x+"px";

    avatar.style.top=

        DATA.avatar.y+"px";

    avatar.style.width=

        DATA.avatar.width+"px";

}
function buildCards(){

    const cards=document.getElementById(

        "cards"

    );

    cards.innerHTML="";

    DATA.cards.forEach(card=>{

        cards.appendChild(

            createCard(card)

        );

    });

}
function createCard(card){

    const div=document.createElement(

        "section"

    );

    div.className="card";

    div.style.left=

        card.x+"px";

    div.style.top=

        card.y+"px";

    div.style.width=

        card.width+"px";

    div.style.height=

        card.height+"px";

    div.style.transform=

        `rotate(${card.rotation}deg)`;

    div.innerHTML=

    `<h2>${card.title}</h2>`;

    return div;

      }
