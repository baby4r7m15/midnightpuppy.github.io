/* ==========================================================
   Midnight Bunny OS
   terminal.js
========================================================== */

"use strict";

/* ==========================================================
Initialize
========================================================== */

function initializeTerminal(data){

    const terminal = getWindowContent("terminal");

    if(!terminal) return;

    terminal.innerHTML = `

        <div class="terminal-output"

             id="terminal-output">

        </div>

    `;

    startTerminal(data);

}

/* ==========================================================
Terminal
========================================================== */

let terminalIndex = 0;

let terminalLines = [];

function startTerminal(data){

    terminalLines = [

        "Initializing Bunny OS...",

        "Loading reality.dll",

        "Mounting /carrots",

        "Checking containment...",

        "Containment stable.",

        "Brain.exe online.",

        "RGB overload detected.",

        "Quantum fluff synchronized.",

        ...data.terminal.messages

    ];

    terminalIndex = 0;

    typeNextLine();

}

/* ==========================================================
Typing
========================================================== */

function typeNextLine(){

    const output = document.getElementById(

        "terminal-output"

    );

    if(!output) return;

    if(terminalIndex >= terminalLines.length){

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

    output.innerHTML += `

        <div class="terminal-line">

            <span class="terminal-time">

                ${time}

            </span>

            <span class="terminal-prompt">

                bunny@night:~$

            </span>

            <span class="terminal-message">

                ${terminalLines[terminalIndex]}

            </span>

        </div>

    `;

    output.scrollTop = output.scrollHeight;

    terminalIndex++;

    setTimeout(

        typeNextLine,

        900 + Math.random()*1400

    );

}
