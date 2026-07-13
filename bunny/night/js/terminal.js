/* ==========================================================
   Midnight Bunny OS
   Rev 10
   terminal.js
========================================================== */

"use strict";

debug("Loading terminal.js...");

/* ==========================================================
Globals
========================================================== */

let terminalLines = [];

let terminalIndex = 0;

let terminalTimer = null;

/* ==========================================================
Initialize
========================================================== */

function initializeTerminal(data){

    debug("initializeTerminal()");

    const terminal = getWindowContent("terminal");

    if(!terminal){

        throw new Error(

            "Terminal window does not exist."

        );

    }

    terminal.innerHTML = `

        <div

            id="terminal-output"

            class="terminal-output">

        </div>

    `;

    if(

        !data ||

        !data.terminal ||

        !Array.isArray(data.terminal.messages)

    ){

        throw new Error(

            "terminal.messages missing from JSON."

        );

    }

    terminalLines = [

        "Initializing Bunny OS...",

        "Loading reality.dll...",

        "Checking carrots...",

        "Mounting midnight filesystem...",

        "Synchronizing fluff...",

        ...data.terminal.messages

    ];

    terminalIndex = 0;

    if(terminalTimer){

        clearTimeout(terminalTimer);

    }

    debug(

        "Terminal initialized with "

        +

        terminalLines.length

        +

        " messages.",

        "SUCCESS"

    );

    printNextLine();

}

/* ==========================================================
Print One Line
========================================================== */

function printNextLine(){

    const output = document.getElementById(

        "terminal-output"

    );

    if(!output){

        debug(

            "#terminal-output missing.",

            "ERROR"

        );

        return;

    }

    if(

        terminalIndex >=

        terminalLines.length

    ){

        debug(

            "Restarting terminal loop."

        );

        terminalIndex = 0;

        output.innerHTML = "";

    }

    const now = new Date();

    const time = now.toLocaleTimeString(

        [],

        {

            hour:"2-digit",

            minute:"2-digit",

            second:"2-digit"

        }

    );

    const line = document.createElement("div");

    line.className = "terminal-line";

    line.innerHTML = `

        <span class="terminal-time">

            ${time}

        </span>

        <span class="terminal-prompt">

            bunny@night:~$

        </span>

        <span class="terminal-message">

            ${terminalLines[terminalIndex]}

        </span>

    `;

    output.appendChild(line);

    output.scrollTop = output.scrollHeight;

    debug(

        "Terminal line "

        +

        terminalIndex

    );

    terminalIndex++;

    terminalTimer = setTimeout(

        printNextLine,

        1000

    );

}

/* ==========================================================
Loaded
========================================================== */

debug(

    "terminal.js loaded",

    "SUCCESS"

);
