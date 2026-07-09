/*
===========================================================
 Midnight Bunny OS
 shell.js
 Rev 6.9
===========================================================
*/

const Shell = (() => {

    let terminal;
    let output;
    let input;

    const history = [];
    let historyIndex = 0;

    function init() {

        terminal = document.getElementById("terminal");
        output = document.getElementById("terminal-output");
        input = document.getElementById("terminal-input");

        if (!terminal || !output || !input)
            return;

        input.addEventListener("keydown", handleKey);

        document.addEventListener("click", () => {
            input.focus();
        });

        printBanner();

        input.focus();

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

        if (!command)
            return;

        history.push(command);

        historyIndex = history.length;

        println(
            `<span class="prompt">bunny@night:~$</span> ${escape(command)}`
        );

        input.value = "";

        if (typeof Commands !== "undefined") {

            Commands.run(command);

        } else {

            println("<span class='error'>commands.js not loaded.</span>");

        }

        scrollBottom();

    }

    function previous() {

        if (!history.length)
            return;

        historyIndex--;

        if (historyIndex < 0)
            historyIndex = 0;

        input.value = history[historyIndex];

    }

    function next() {

        if (!history.length)
            return;

        historyIndex++;

        if (historyIndex >= history.length) {

            historyIndex = history.length;

            input.value = "";

            return;

        }

        input.value = history[historyIndex];

    }

    function autocomplete() {

        if (typeof Commands === "undefined")
            return;

        const value = input.value.trim();

        const matches = Commands
            .list()
            .filter(cmd => cmd.startsWith(value));

        if (matches.length === 1) {

            input.value = matches[0];

            return;

        }

        if (matches.length > 1) {

            println(matches.join("    "));

        }

    }

    function println(html = "") {

        if (!output)
            return;

        const row = document.createElement("div");

        row.className = "terminal-line";

        row.innerHTML = html;

        output.appendChild(row);

        scrollBottom();

    }

    async function type(text, speed = 18) {

        const row = document.createElement("div");

        row.className = "terminal-line";

        output.appendChild(row);

        for (let i = 0; i <= text.length; i++) {

            row.textContent = text.substring(0, i);

            scrollBottom();

            await sleep(speed);

        }

    }

    function clear() {

        if (output)
            output.innerHTML = "";

    }

    function printBanner() {

        println("<span class='accent'>Midnight Bunny OS v2.1.7</span>");
        println("Long Ears Update");
        println("");
        println("Type <span class='cmd'>help</span> to begin.");
        println("");

    }

    function scrollBottom() {

        terminal.scrollTop = terminal.scrollHeight;

    }

    function sleep(ms) {

        return new Promise(resolve => {

            setTimeout(resolve, ms);

        });

    }

    function escape(text) {

        return text
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;");

    }

    return {

        init,
        println,
        clear,
        type,
        focus() {

            if (input)
                input.focus();

        }

    };

})();