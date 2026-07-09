/*
===========================================================
 Midnight Bunny OS
 core.js
 Long Ears Update - Rev 6.6
===========================================================
*/

const BunnyOS = (() => {

    const VERSION = "Long Ears Update";
    const CONFIG = {
        json: "../data/midnightbunny.json"
    };

    let data = null;

    /*=====================================
        Boot
    =====================================*/

    async function init() {

        console.log(
            `%cMidnight Bunny OS`,
            "color:#93ecff;font-size:16px;font-weight:bold;"
        );

        await loadConfig();

        applyTheme();

        populatePage();

        Boot.init({
            skipIfVisited: false
        });

        Shell.init();

        Widgets.init();

        Effects.init();

        registerGlobalEvents();

        startupToast();

        console.log("🐇 Bunny OS Ready.");

    }

    /*=====================================
        JSON Loader
    =====================================*/

    async function loadConfig() {

        try {

            const response =
                await fetch(CONFIG.json);

            data = await response.json();

            window.BunnyConfig = data;

            console.log("Configuration loaded.");

        } catch (error) {

            console.error(error);

        }

    }

    /*=====================================
        Theme
    =====================================*/

    function applyTheme() {

        if (!data || !data.theme) return;

        const root = document.documentElement;

        Object.entries(data.theme).forEach(([key,value]) => {

            root.style.setProperty(
                "--"+key,
                value
            );

        });

    }

    /*=====================================
        Populate HTML
    =====================================*/

    function populatePage() {

        if(!data) return;

        setText("page-title",data.header.title);

        setText("page-subtitle",data.header.subtitle);

        setText("profile-name",data.profile.name);

        setHTML("profile-meta",data.profile.metaHtml);

        setImage(
            "profile-avatar",
            data.profile.avatar.src,
            data.profile.avatar.alt
        );

        buildBars();

        buildBio();

        buildLoadout();

        buildSystemLog();

    }

    /*=====================================
        Progress Bars
    =====================================*/

    function buildBars(){

        const container =
            document.getElementById("profile-bars");

        if(!container) return;

        container.innerHTML="";

        data.profile.bars.forEach(bar=>{

            const div=document.createElement("div");

            div.className="meter";

            div.innerHTML=`
                <div class="meter-label">
                    ${bar.label}
                </div>

                <div class="meter-track">

                    <div
                        class="meter-fill ${bar.fillClass}"
                        style="width:${bar.percent}%">
                    </div>

                </div>

                <div class="meter-value">
                    ${bar.value}
                </div>
            `;

            container.appendChild(div);

        });

    }

    /*=====================================
        Bio
    =====================================*/

    function buildBio(){

        const list=
            document.getElementById("bio-list");

        if(!list) return;

        list.innerHTML="";

        data.bio.entries.forEach(entry=>{

            const item=document.createElement("div");

            item.className="bio-entry";

            item.innerHTML=`
                <span>${entry.text}</span>

                <span class="${entry.tagClass}">
                    ${entry.tag}
                </span>
            `;

            list.appendChild(item);

        });

    }

    /*=====================================
        Loadout
    =====================================*/

    function buildLoadout(){

        const loadout=
            document.getElementById("loadout");

        if(!loadout) return;

        loadout.innerHTML="";

        data.profile.loadout.forEach(item=>{

            const li=document.createElement("li");

            li.textContent=item;

            loadout.appendChild(li);

        });

    }

    /*=====================================
        System Log
    =====================================*/

    function buildSystemLog(){

        const log=
            document.getElementById("system-log");

        if(!log) return;

        log.innerHTML="";

        data.systemLog.lines.forEach(line=>{

            if(line.type==="gap"){

                log.appendChild(document.createElement("br"));

                return;

            }

            const row=document.createElement("div");

            row.className="log-line";

            row.innerHTML=`
                <span class="time">${line.time||""}</span>

                <span>${line.message||""}</span>

                ${
                    line.status
                    ?`<span class="${line.statusClass}">
                        ${line.status}
                      </span>`
                    :""
                }
            `;

            log.appendChild(row);

        });

    }

    /*=====================================
        Startup Toast
    =====================================*/

    function startupToast(){

        if(!data || !data.toast) return;

        setTimeout(()=>{

            Widgets.toast(

                data.toast.header,

                data.toast.line,

                5500

            );

        },3500);

    }

    /*=====================================
        Global Events
    =====================================*/

    function registerGlobalEvents(){

        window.addEventListener("resize",()=>{

            console.log(
                window.innerWidth,
                window.innerHeight
            );

        });

        document.addEventListener("keydown",e=>{

            if(e.key==="F1"){

                e.preventDefault();

                Commands.run("help");

            }

        });

    }

    /*=====================================
        Helpers
    =====================================*/

    function setText(id,text){

        const el=document.getElementById(id);

        if(el) el.textContent=text;

    }

    function setHTML(id,html){

        const el=document.getElementById(id);

        if(el) el.innerHTML=html;

    }

    function setImage(id,src,alt){

        const el=document.getElementById(id);

        if(!el) return;

        el.src=src;

        el.alt=alt;

    }

    /*=====================================
        Public API
    =====================================*/

    return{

        init,

        get version(){

            return VERSION;

        },

        get config(){

            return data;

        }

    };

})();

/*=====================================
    Launch Bunny OS
=====================================*/

document.addEventListener(

    "DOMContentLoaded",

    BunnyOS.init

);
