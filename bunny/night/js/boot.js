/*
===========================================================
 Midnight Bunny OS
 boot.js
 Long Ears Update - Rev 6.1
===========================================================
*/

const Boot = (() => {

    const DEFAULT_LINES = [
        "Bunny BIOS v2.0",
        "",
        "Checking bunny ears...",
        "Ear calibration complete.",
        "Initializing RGB controller...",
        "Mounting /burrow...",
        "Loading reality.dll...",
        "WARNING: reality.dll unstable",
        "Starting Hyperfocus Daemon...",
        "Loading autism.exe...",
        "Loading adhd.sys...",
        "Loading NymFit...",
        "Connecting to carrot servers...",
        "Containment protocol enabled.",
        "Touch permissions configured.",
        "",
        "Launching Midnight Bunny OS..."
    ];

    const RANDOM_LINES = [
        "Coffee levels critically low.",
        "Compiling chaos...",
        "Searching for motivation...",
        "Motivation not found.",
        "Synchronizing bunny fluff...",
        "Petting permissions revoked.",
        "Loading more RAM...",
        "Downloading carrots...",
        "Updating long ears...",
        "Initializing hacker bunny mode..."
    ];

    const config = {
        lineDelay: 140,
        finishDelay: 900,
        skipIfVisited: false
    };

    let overlay;
    let terminal;
    let progress;
    let title;

    function randomMessage() {
        return RANDOM_LINES[Math.floor(Math.random() * RANDOM_LINES.length)];
    }

    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function typeLine(text) {

        return new Promise(resolve => {

            const row = document.createElement("div");
            row.className = "boot-line";

            terminal.appendChild(row);

            let i = 0;

            function type() {

                row.textContent = text.substring(0, i);

                i++;

                if (i <= text.length) {

                    requestAnimationFrame(type);

                } else {

                    terminal.scrollTop = terminal.scrollHeight;
                    resolve();

                }

            }

            type();

        });

    }

    async function play() {

        overlay = document.getElementById("boot-overlay");

        if (!overlay) return;

        title = overlay.querySelector(".boot-title");
        terminal = overlay.querySelector(".boot-terminal");
        progress = overlay.querySelector(".boot-progress");

        terminal.innerHTML = "";

        const lines = [...DEFAULT_LINES];

        lines.splice(
            Math.floor(Math.random() * lines.length),
            0,
            randomMessage()
        );

        for (let i = 0; i < lines.length; i++) {

            await typeLine(lines[i]);

            if (progress) {

                progress.style.width =
                    ((i + 1) / lines.length) * 100 + "%";

            }

            await wait(config.lineDelay);

        }

        await wait(config.finishDelay);

        overlay.classList.add("boot-fade");

        await wait(800);

        overlay.remove();

    }

    function skip() {

        overlay = document.getElementById("boot-overlay");

        if (!overlay) return;

        overlay.remove();

    }

    function reboot() {

        location.reload();

    }

    function shutdown() {

        document.body.innerHTML = `
            <div class="shutdown-screen">
                <h1>Midnight Bunny OS</h1>
                <p>It is now safe to boop your monitor.</p>
            </div>
        `;

    }

    function init(options = {}) {

        Object.assign(config, options);

        if (
            config.skipIfVisited &&
            sessionStorage.getItem("bunnyBoot") === "1"
        ) {

            skip();
            return;

        }

        sessionStorage.setItem("bunnyBoot", "1");

        play();

    }

    return {

        init,
        play,
        skip,
        reboot,
        shutdown

    };

})();
