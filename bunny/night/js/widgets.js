/*
===========================================================
 Midnight Bunny OS
 widgets.js
 Long Ears Update - Rev 6.4
===========================================================
*/

const Widgets = (() => {

    let clockElement;
    let uptimeElement;
    let statusElement;
    let quoteElement;
    let cpuBar;
    let ramBar;
    let startTime = Date.now();

    const QUOTES = [
        "Touch permissions revoked.",
        "Containment stable.",
        "Hyperfocus engaged.",
        "Compiling chaos...",
        "Reality.dll is optional.",
        "Long ears online.",
        "RGB synchronized.",
        "Downloading carrots...",
        "Professional internet rabbit.",
        "Petting protocol disabled."
    ];

    function init() {

        clockElement = document.getElementById("widget-clock");
        uptimeElement = document.getElementById("widget-uptime");
        statusElement = document.getElementById("widget-status");
        quoteElement = document.getElementById("widget-quote");

        cpuBar = document.getElementById("cpu-bar");
        ramBar = document.getElementById("ram-bar");

        updateClock();
        updateQuote();
        updateSystem();

        setInterval(updateClock,1000);
        setInterval(updateSystem,2500);
        setInterval(updateQuote,15000);

    }

    function updateClock(){

        if(!clockElement) return;

        const now = new Date();

        clockElement.textContent =
            now.toLocaleTimeString([],{
                hour:"2-digit",
                minute:"2-digit",
                second:"2-digit"
            });

        if(uptimeElement){

            const uptime = Math.floor((Date.now()-startTime)/1000);

            const h = Math.floor(uptime/3600);
            const m = Math.floor((uptime%3600)/60);
            const s = uptime%60;

            uptimeElement.textContent =
                `${pad(h)}:${pad(m)}:${pad(s)}`;

        }

    }

    function updateSystem(){

        const cpu = random(12,78);
        const ram = random(22,84);

        if(cpuBar)
            cpuBar.style.width = cpu + "%";

        if(ramBar)
            ramBar.style.width = ram + "%";

        if(statusElement){

            let status = "ONLINE";

            if(cpu>70)
                status="HYPERFOCUS";

            if(cpu<25)
                status="Idle";

            statusElement.textContent=status;

        }

    }

    function updateQuote(){

        if(!quoteElement) return;

        quoteElement.textContent =
            QUOTES[random(0,QUOTES.length-1)];

    }

    function toast(title,message,time=3500){

        const toast=document.createElement("div");

        toast.className="bunny-toast";

        toast.innerHTML=`
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        `;

        document.body.appendChild(toast);

        requestAnimationFrame(()=>{
            toast.classList.add("show");
        });

        setTimeout(()=>{

            toast.classList.remove("show");

            setTimeout(()=>{
                toast.remove();
            },300);

        },time);

    }

    function notifyRandom(){

        const notifications=[
            ["Containment","System stable."],
            ["Reminder","Drink water."],
            ["Bunny","Carrot inventory updated."],
            ["NymFit","Workout available."],
            ["RGB","Lighting synchronized."],
            ["Brain","404 Not Found."],
            ["Reality.dll","Still unstable."]
        ];

        const n =
            notifications[random(0,notifications.length-1)];

        toast(n[0],n[1]);

    }

    function bunnyFetch(){

        return {
            os:"Midnight Bunny OS",
            version:"Long Ears Update",
            developer:"Artemis",
            species:"Protogen Rabbit",
            uptime:uptimeElement
                ?uptimeElement.textContent
                :"00:00:00"
        };

    }

    function random(min,max){

        return Math.floor(
            Math.random()*(max-min+1))+min;

    }

    function pad(value){

        return value
            .toString()
            .padStart(2,"0");

    }

    return{

        init,
        toast,
        notifyRandom,
        bunnyFetch

    };

})();
