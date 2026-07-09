/*
===========================================================
 Midnight Bunny OS
 boot.js
 Rev 7.0
===========================================================
*/

const Boot = (() => {

    const DEFAULT_LINES = [

        "Bunny BIOS v2.1.7",
        "",
        "Checking bunny ears...",
        "Ear calibration complete.",
        "Initializing RGB controller...",
        "Mounting /burrow...",
        "Loading reality.dll...",
        "WARNING: reality.dll unstable",
        "Loading Hyperfocus Daemon...",
        "Loading autism.exe...",
        "Loading adhd.sys...",
        "Loading NymFit...",
        "Connecting to carrot servers...",
        "Containment protocol enabled.",
        "Touch permissions granted.",
        "",
        "Launching Midnight Bunny OS..."

    ];

    const RANDOM_LINES = [

        "Downloading carrots...",
        "Professional internet rabbit detected.",
        "Reality.dll still missing.",
        "Compiling chaos...",
        "Synchronizing bunny fluff...",
        "Loading more RAM...",
        "Initializing hacker bunny mode...",
        "Calibrating RGB...",
        "Petting permissions revoked.",
        "Updating long ears..."

    ];

    const config = {

        lineDelay: 90,
        finishDelay: 700,
        skipIfVisited: false

    };

    let overlay;
    let terminal;
    let progress;
    let title;

    function init(options = {}) {

        Object.assign(config, options);

        overlay = document.getElementById("boot-overlay");

        if (!overlay)
            return;

        title = overlay.querySelector(".boot-title");
        terminal = overlay.querySelector(".boot-terminal");
        progress = overlay.querySelector(".boot-progress");

        if (
            config.skipIfVisited &&
            sessionStorage.getItem("mb_boot") === "1"
        ) {

            overlay.remove();
            return;

        }

        sessionStorage.setItem("mb_boot", "1");

        play();

    }

    async function play() {

        if (!terminal)
            return;

        terminal.innerHTML = "";

        const lines = [...DEFAULT_LINES];

        lines.splice(

            random(2, lines.length - 2),

            0,

            RANDOM_LINES[random(0, RANDOM_LINES.length - 1)]

        );

        for (let i = 0; i < lines.length; i++) {

            await type(lines[i]);

            if (progress) {

                progress.style.width =
                    ((i + 1) / lines.length * 100) + "%";

            }

            await wait(config.lineDelay);

        }

        await wait(config.finishDelay);

        fadeOut();

    }

    function fadeOut() {

        if (!overlay)
            return;

        overlay.style.transition = "opacity .8s";

        overlay.style.opacity = "0";

        setTimeout(() => {

            overlay.remove();

            if (typeof Widgets !== "undefined") {

                Widgets.notifyRandom();

            }

        }, 800);

    }

    function reboot() {

        sessionStorage.removeItem("mb_boot");

        location.reload();

    }

    function shutdown() {

        document.body.innerHTML = `

<div class="shutdown-screen">

<h1>Midnight Bunny OS</h1>

<p>System halted.</p>

<p>It is now safe to boop your monitor.</p>

</div>

`;

    }

    function skip() {

        if (overlay)
            overlay.remove();

    }

    async function type(text) {

        const row = document.createElement("div");

        row.className = "boot-line";

        terminal.appendChild(row);

        for (let i = 0; i <= text.length; i++) {

            row.textContent = text.substring(0, i);

            terminal.scrollTop = terminal.scrollHeight;

            await wait(8);

        }

    }

    function wait(ms) {

        return new Promise(resolve => {

            setTimeout(resolve, ms);

        });

    }

    function random(min, max) {

        return Math.floor(

            Math.random() * (max - min + 1)

        ) + min;

    }

    return {

        init,
        play,
        skip,
        reboot,
        shutdown

    };

})();