/*
===========================================================
 Midnight Bunny OS
 effects.js
 Long Ears Update - Rev 6.5
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

    function init() {

        createMouseGlow();

        bindMouse();

        randomGlitches();

        randomTitleGlitch();

        randomToast();

        idleWatcher();

        console.log("✨ Bunny visual effects enabled.");

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
        Random Screen Glitches
    =====================================*/

    function randomGlitches() {

        setInterval(() => {

            if (Math.random() > 0.82) {

                glitch();

            }

        }, 3500);

    }

    function glitch() {

        document.body.classList.add(
            GLITCH_CLASSES[
                Math.floor(Math.random() * GLITCH_CLASSES.length)
            ]
        );

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

    function randomTitleGlitch() {

        const title = document.querySelector(".hero-title");

        if (!title) return;

        setInterval(() => {

            if (Math.random() > 0.88) {

                title.classList.add("title-glitch");

                setTimeout(() => {

                    title.classList.remove("title-glitch");

                }, 350);

            }

        }, 2500);

    }

    /*=====================================
        Notification Generator
    =====================================*/

    function randomToast() {

        if (typeof Widgets === "undefined") return;

        const messages = [

            ["Containment","Stable."],

            ["RabbitOS","Long ears synchronized."],

            ["Reality.dll","Still broken."],

            ["Reminder","Hydrate."],

            ["NymFit","Workout available."],

            ["Brain","404 Not Found."],

            ["RGB","Looking fabulous."],

            ["Bunny","Carrots acquired."],

            ["System","Everything is probably okay."]

        ];

        setInterval(() => {

            if (Math.random() > 0.70) {

                const m =
                    messages[Math.floor(Math.random() * messages.length)];

                Widgets.toast(m[0], m[1]);

            }

        }, 20000);

    }

    /*=====================================
        Idle Mode
    =====================================*/

    function idleWatcher() {

        resetIdle();

        ["mousemove","keydown","touchstart"].forEach(event => {

            document.addEventListener(event, resetIdle);

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
        CRT Flicker
    =====================================*/

    function crtFlash() {

        document.body.classList.add("crt-flash");

        setTimeout(() => {

            document.body.classList.remove("crt-flash");

        }, 120);

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
        Bunny Easter Eggs
    =====================================*/

    const secrets = [

        "🐇 Long ears detected.",

        "🥕 Carrot reserves nominal.",

        "💜 Midnight Bunny loves RGB.",

        "⚡ Hyperfocus mode enabled.",

        "🔒 Containment protocol active."

    ];

    function randomSecret() {

        console.log(

            secrets[
                Math.floor(Math.random() * secrets.length)
            ]

        );

    }

    return {

        init,

        glitch,

        crtFlash,

        wallpaperParallax,

        randomSecret

    };

})();
