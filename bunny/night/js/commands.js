/*
===========================================================
 Midnight Bunny OS
 commands.js
 Rev 7.0
===========================================================
*/

const Commands = (() => {

    const FILESYSTEM = {

        "README.md": [
            "Welcome to Midnight Bunny OS.",
            "",
            "Long Ears Update",
            "",
            "Type 'help' to see available commands."
        ],

        "projects.txt": [
            "• Midnight Bunny OS",
            "• NymFit",
            "• Personal Website"
        ],

        "status.log": [
            "Containment........ACTIVE",
            "Reality.dll........UNSTABLE",
            "Brain.exe..........404",
            "Touch Protocol.....GRANTED"
        ]

    };

    const COMMANDS = {

        help() {

            Shell.println("");
            Shell.println("<span class='accent'>Available Commands</span>");
            Shell.println("────────────────────────────────────────");
            Shell.println("help");
            Shell.println("about");
            Shell.println("bio");
            Shell.println("status");
            Shell.println("bunnyfetch");
            Shell.println("projects");
            Shell.println("nymfit");
            Shell.println("whoami");
            Shell.println("pwd");
            Shell.println("ls");
            Shell.println("cat README.md");
            Shell.println("date");
            Shell.println("clear");
            Shell.println("reboot");
            Shell.println("shutdown");
            Shell.println("give_touches");
            Shell.println("fortune");
            Shell.println("echo");
            Shell.println("");

        },

        about() {

            Shell.println("");
            Shell.println("Midnight Bunny OS");
            Shell.println("Cyberpunk profile environment");
            Shell.println("Created by Artemis");
            Shell.println("");

        },

        bio() {

            Shell.println("");
            Shell.println("Chaotic hacker bunny.");
            Shell.println("Terminal enthusiast.");
            Shell.println("Professional RGB enjoyer.");
            Shell.println("Powered almost entirely by carrots.");
            Shell.println("");

        },

        status() {

            Shell.println("");
            Shell.println("Containment : ACTIVE");
            Shell.println("Reality.dll : UNSTABLE");
            Shell.println("Brain.exe   : 404");
            Shell.println("Touch       : GRANTED");
            Shell.println("");

        },

        bunnyfetch() {

            const info =
                typeof Widgets !== "undefined"
                    ? Widgets.bunnyFetch()
                    : null;

            Shell.println("");
            Shell.println("        (\\_/)");
            Shell.println("        ( •_•)");
            Shell.println("       / >🥕");
            Shell.println("");

            if (info) {

                Shell.println("OS         : " + info.os);
                Shell.println("Version    : " + info.version);
                Shell.println("Developer  : " + info.developer);
                Shell.println("Species    : " + info.species);
                Shell.println("Uptime     : " + info.uptime);

            } else {

                Shell.println("Midnight Bunny OS");

            }

            Shell.println("");

        },

        projects() {

            Shell.println("");

            FILESYSTEM["projects.txt"].forEach(line =>
                Shell.println(line)
            );

            Shell.println("");

        },

        nymfit() {

            Shell.println("");
            Shell.println("NymFit");
            Shell.println("----------------");
            Shell.println("Workout tracking");
            Shell.println("Nutrition");
            Shell.println("Hydration");
            Shell.println("Macros");
            Shell.println("Progress");
            Shell.println("");

        },

        whoami() {

            Shell.println("artemis");

        },

        pwd() {

            Shell.println("/home/bunny");

        },

        ls() {

            Shell.println("");
            Shell.println("README.md");
            Shell.println("projects.txt");
            Shell.println("status.log");
            Shell.println("carrots/");
            Shell.println("wallpapers/");
            Shell.println("nymfit/");
            Shell.println("secrets/");
            Shell.println("");

        },

        cat(args) {

            if (!args.length) {

                Shell.println("Usage: cat <file>");

                return;

            }

            const file = FILESYSTEM[args[0]];

            if (!file) {

                Shell.println("File not found.");

                return;

            }

            Shell.println("");

            file.forEach(line => Shell.println(line));

            Shell.println("");

        },

        date() {

            Shell.println(new Date().toString());

        },

        clear() {

            Shell.clear();

        },

        reboot() {

            if (typeof Boot !== "undefined" &&
                Boot.reboot) {

                Boot.reboot();

            } else {

                location.reload();

            }

        },

        shutdown() {

            if (typeof Boot !== "undefined" &&
                Boot.shutdown) {

                Boot.shutdown();

            } else {

                Shell.println("Goodbye.");

            }

        },

        give_touches() {

            Shell.println("");
            Shell.println("Checking containment...");
            Shell.println("Touch permissions: GRANTED");
            Shell.println("Reward: DENIED");
            Shell.println("");

        },

        fortune() {

            const fortunes = [

                "Reality.dll failed successfully.",
                "Today is a good day for carrots.",
                "Hyperfocus detected.",
                "Containment remains stable.",
                "RGB increases performance by 12%.",
                "Professional bunny detected."

            ];

            Shell.println(

                fortunes[
                    Math.floor(
                        Math.random() * fortunes.length
                    )
                ]

            );

        },

        echo(args) {

            Shell.println(args.join(" "));

        }

    };

    function run(commandLine) {

        const parts =
            commandLine.trim().split(/\s+/);

        const command =
            (parts.shift() || "").toLowerCase();

        if (COMMANDS[command]) {

            COMMANDS[command](parts);

        } else {

            Shell.println(
                `${command}: command not found`
            );

            Shell.println(
                "Type 'help' for a list of commands."
            );

        }

    }

    function list() {

        return Object.keys(COMMANDS).sort();

    }

    return {

        run,
        list

    };

})();