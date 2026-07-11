/* ==========================================================
   Midnight Bunny OS
   Rev 9
   terminal.js
========================================================== */

"use strict";

let terminalTimer = null;

/* ==========================================================
Initialize
========================================================== */

function initializeTerminal(data){

    const terminal = getWindowContent("terminal");

    if(!terminal) return;

    renderTerminal(terminal, data);

}

/* ==========================================================
Render
========================================================== */

function renderTerminal(container, data){

    container.innerHTML = `

        <div id="terminal-output"
             class="terminal-output">

        </div>

    `;

    const output = document.getElementById("terminal-output");

    if(!output) return;

    output.innerHTML = "";

    const messages = data.terminal?.messages || [];

    let index = 0;

    if(terminalTimer){

        clearInterval(terminalTimer);

    }

    function addLine(text){

        const now = new Date();

        const time = now.toLocaleTimeString([],{

            hour:"2-digit",

            minute:"2-digit",

            second:"2-digit"

        });

        const line = document.createElement("div");

        line.className = "terminal-line";

        line.innerHTML = `

            <span class="terminal-time">

                ${time}

            </span>

            <span class="terminal-prompt">

                ${data.terminal.prompt}

            </span>

            <span class="terminal-message">

                ${text}

            </span>

        `;

        output.appendChild(line);

        output.scrollTop = output.scrollHeight;

    }

    messages.forEach(addLine);

    terminalTimer = setInterval(()=>{

        if(messages.length===0) return;

        addLine(messages[index]);

        index++;

        if(index>=messages.length){

            index=0;

        }

    },4000);

}

/* ==========================================================
Stop
========================================================== */

function stopTerminal(){

    if(terminalTimer){

        clearInterval(terminalTimer);

    }

}

/* ==========================================================
Refresh
========================================================== */

function refreshTerminal(){

    if(!window.BUNNY) return;

    initializeTerminal(window.BUNNY);

}
