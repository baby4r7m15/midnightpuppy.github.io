/*
===========================================================
 Midnight Bunny OS
 effects.js
 Rev 7.0
===========================================================
*/

const Effects = (() => {

    let mouseGlow;
    let idleTimer;

    const GLITCH_CLASSES = [
        "glitch-1",
        "glitch-2",
        "glitch-3"
    ];

    const SECRET_MESSAGES = [

        "🐇 Long ears synchronized.",
        "🥕 Carrot reserves nominal.",
        "💜 Reality.dll still missing.",
        "⚡ Hyperfocus engaged.",
        "🔒 Containment holding.",
        "🌙 Midnight Bunny online.",
        "🖥 RGB calibrated."

    ];

    function init() {

        createMouseGlow();

        bindMouse();

        wallpaperParallax();

        randomGlitches();

        randomHeaderGlitch();

        randomCRT();

        randomToast();

        idleWatcher();

        randomSecret();

        console.log("✨ Midnight Bunny effects initialized.");

    }

    /*=====================================
        Mouse Glow
    =====================================*/

    function createMouseGlow() {

        mouseGlow = document.createElement("div");

        mouseGlow.id = "bunny-mouse-glow";

        document.body.appendChild(mouseGlow);

    }

    function bindMouse() {

        document.addEventListener("mousemove", e => {

            if (!mouseGlow) return;

            mouseGlow.style.left = e.clientX + "px";
            mouseGlow.style.top = e.clientY + "px";

        });

    }

    /*=====================================
        Wallpaper Drift
    =====================================*/

    function wallpaperParallax() {

        document.addEventListener("mousemove", e => {

            const x =
                (e.clientX / window.innerWidth - .5) * 8;

            const y =
                (e.clientY / window.innerHeight - .5) * 8;

            document.body.style.backgroundPosition =
                `${50 + x}% ${50 + y}%`;

        });

    }

    /*=====================================
        Random Screen Glitch
    =====================================*/

    function randomGlitches() {

        setInterval(() => {

            if (Math.random() > .82) {

                glitch();

            }

        }, 3500);

    }

    function glitch() {

        const cls =
            GLITCH_CLASSES[
                random(0, GLITCH_CLASSES.length - 1)
            ];

        document.body.classList.add(cls);

        setTimeout(() => {

            document.body.classList.remove(
                "glitch-1",
                "glitch-2",
                "glitch-3"
            );

        }, 180);

    }

    /*=====================================
        Header Flicker
    =====================================*/

    function randomHeaderGlitch() {

        const title =
            document.getElementById("siteTitle");

        if (!title) return;

        setInterval(() => {

            if (Math.random() > .90) {

                title.classList.add("title-glitch");

                setTimeout(() => {

                    title.classList.remove("title-glitch");

                }, 300);

            }

        }, 3000);

    }

    /*=====================================
        CRT Flash
    =====================================*/

    function randomCRT() {

        setInterval(() => {

            if (Math.random() > .94) {

                crtFlash();

            }

        }, 5000);

    }

    function crtFlash() {

        document.body.classList.add("crt-flash");

        setTimeout(() => {

            document.body.classList.remove("crt-flash");

        }, 120);

    }

    /*=====================================
        Random Notifications
    =====================================*/

    function randomToast() {

        if (typeof Widgets === "undefined") return;

        const notifications = [

            ["Containment","Stable."],
            ["RabbitOS","Long ears synchronized."],
            ["Reality.dll","Still broken."],
            ["Reminder","Hydrate."],
            ["NymFit","Workout available."],
            ["Brain","404 Not Found."],
            ["RGB","Looking fabulous."],
            ["Carrots","Inventory replenished."],
            ["Kernel","Everything seems normal."]

        ];

        setInterval(() => {

            if (Math.random() > .72) {

                const n =
                    notifications[
                        random(0, notifications.length - 1)
                    ];

                Widgets.toast(n[0], n[1]);

            }

        }, 20000);

    }

    /*=====================================
        Idle Mode
    =====================================*/

    function idleWatcher() {

        resetIdle();

        [
            "mousemove",
            "keydown",
            "touchstart"
        ].forEach(event => {

            document.addEventListener(
                event,
                resetIdle
            );

        });

    }

    function resetIdle() {

        clearTimeout(idleTimer);

        document.body.classList.remove("idle");

        idleTimer = setTimeout(() => {

            document.body.classList.add("idle");

        }, 60000);

    }

    /*=====================================
        Console Easter Eggs
    =====================================*/

    function randomSecret() {

        console.log(

            SECRET_MESSAGES[
                random(
                    0,
                    SECRET_MESSAGES.length - 1
                )
            ]

        );

    }

    function random(min, max) {

        return Math.floor(
            Math.random() * (max - min + 1)
        ) + min;

    }

    return {

        init,
        glitch,
        crtFlash,
        wallpaperParallax,
        randomSecret

    };

})();