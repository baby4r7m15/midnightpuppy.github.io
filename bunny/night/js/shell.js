/*
===========================================================
 Midnight Bunny OS
 shell.js
 Long Ears Update - Rev 6.2
===========================================================
*/

const Shell = (() => {

    let terminal;
    let output;
    let input;

    let history = [];
    let historyIndex = 0;

    function init() {

        terminal = document.getElementById("terminal");
        output = document.getElementById("terminal-output");
        input = document.getElementById("terminal-input");

        if (!input) return;

        input.addEventListener("keydown", handleKey);

        printBanner();

        focus();

    }

    function focus() {

        if (!input) return;

        input.focus();

        document.addEventListener("click", () => {

            input.focus();

        });

    }

    function handleKey(e) {

        switch (e.key) {

            case "Enter":

                e.preventDefault();

                execute();

                break;

            case "ArrowUp":

                e.preventDefault();

                previous();

                break;

            case "ArrowDown":

                e.preventDefault();

                next();

                break;

            case "Tab":

                e.preventDefault();

                autocomplete();

                break;

        }

    }

    function execute() {

        const command = input.value.trim();

        if (!command) return;

        history.push(command);

        historyIndex = history.length;

        println(`<span class="prompt">bunny@night:~$</span> ${escape(command)}`);

        input.value = "";

        if (typeof Commands !== "undefined") {

            Commands.run(command);

        } else {

            println("Command system unavailable.");

        }

        scrollBottom();

    }

    function previous() {

        if (!history.length) return;

        historyIndex--;

        if (historyIndex < 0)
            historyIndex = 0;

        input.value = history[historyIndex];

    }

    function next() {

        if (!history.length) return;

        historyIndex++;

        if (historyIndex >= history.length) {

            historyIndex = history.length;

            input.value = "";

            return;

        }

        input.value = history[historyIndex];

    }

    function autocomplete() {

        if (typeof Commands === "undefined") return;

        const value = input.value.trim();

        const matches = Commands.list().filter(cmd =>
            cmd.startsWith(value)
        );

        if (matches.length === 1) {

            input.value = matches[0];

        } else if (matches.length > 1) {

            println(matches.join("    "));

        }

    }

    function println(text = "") {

        if (!output) return;

        const row = document.createElement("div");

        row.className = "terminal-line";

        row.innerHTML = text;

        output.appendChild(row);

        scrollBottom();

    }

    function clear() {

        if (!output) return;

        output.innerHTML = "";

    }

    function type(text, speed = 18) {

        return new Promise(resolve => {

            const row = document.createElement("div");

            row.className = "terminal-line";

            output.appendChild(row);

            let i = 0;

            const timer = setInterval(() => {

                row.textContent = text.substring(0, i);

                i++;

                scrollBottom();

                if (i > text.length) {

                    clearInterval(timer);

                    resolve();

                }

            }, speed);

        });

    }

    function printBanner() {

        println("╔══════════════════════════════════════╗");
        println("║      Midnight Bunny OS v2.0          ║");
        println("║        Long Ears Update              ║");
        println("╚══════════════════════════════════════╝");
        println("");
        println("Type <span class='cmd'>help</span> to view commands.");
        println("");

    }

    function scrollBottom() {

        if (!terminal) return;

        terminal.scrollTop = terminal.scrollHeight;

    }

    function escape(text) {

        return text
            .replaceAll("&","&amp;")
            .replaceAll("<","&lt;")
            .replaceAll(">","&gt;");

    }

    return {

        init,
        println,
        clear,
        type,
        focus

    };

})();
