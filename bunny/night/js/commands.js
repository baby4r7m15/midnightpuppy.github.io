/*
===========================================================
 Midnight Bunny OS
 commands.js
 Long Ears Update - Rev 6.3
===========================================================
*/

const Commands = (() => {

    const COMMANDS = {

        help() {

            Shell.println("");
            Shell.println("Available Commands");
            Shell.println("────────────────────────────────────");
            Shell.println("help           Show this menu");
            Shell.println("about          About Midnight Bunny");
            Shell.println("status         Current system status");
            Shell.println("bunnyfetch     Display system info");
            Shell.println("projects       Show current projects");
            Shell.println("nymfit         NymFit information");
            Shell.println("bio            Bunny bio");
            Shell.println("whoami         Current user");
            Shell.println("pwd            Current directory");
            Shell.println("ls             List files");
            Shell.println("cat README.md  Read README");
            Shell.println("date           Current time");
            Shell.println("clear          Clear terminal");
            Shell.println("reboot         Restart Bunny OS");
            Shell.println("shutdown       Shutdown Bunny OS");
            Shell.println("give_touches   Request contact");
            Shell.println("");

        },

        about() {

            Shell.println("");
            Shell.println("Midnight Bunny OS");
            Shell.println("----------------------------");
            Shell.println("A chaotic cyberpunk profile");
            Shell.println("built by Artemis.");
            Shell.println("Species: Protogen Rabbit");
            Shell.println("");

        },

        status() {

            Shell.println("");
            Shell.println("Containment : ACTIVE");
            Shell.println("Reality.dll : UNSTABLE");
            Shell.println("RGB         : ONLINE");
            Shell.println("Brain       : 404");
            Shell.println("");

        },

        bunnyfetch() {

            Shell.println("");

            Shell.println("          (\\_/)");
            Shell.println("          ( •_•)");
            Shell.println("         / >🥕");

            Shell.println("");

            Shell.println("Midnight Bunny OS");
            Shell.println("----------------------------");
            Shell.println("Developer  : Artemis");
            Shell.println("Species    : Protogen Rabbit");
            Shell.println("Project    : NymFit");
            Shell.println("Theme      : Long Ears Update");
            Shell.println("Containment: ACTIVE");
            Shell.println("Reward      : DENIED");
            Shell.println("");

        },

        projects() {

            Shell.println("");

            Shell.println("Current Projects");
            Shell.println("----------------");
            Shell.println("• Midnight Bunny OS");
            Shell.println("• NymFit");
            Shell.println("• Personal Website");

            Shell.println("");

        },

        nymfit() {

            Shell.println("");

            Shell.println("NymFit");
            Shell.println("----------------");
            Shell.println("Workout tracking");
            Shell.println("Hydration");
            Shell.println("Calories");
            Shell.println("Macros");
            Shell.println("Workout routines");

            Shell.println("");

        },

        bio() {

            Shell.println("");

            Shell.println("Chaotic hacker bunny.");
            Shell.println("Terminal addict.");
            Shell.println("Professional RGB enjoyer.");
            Shell.println("Powered almost entirely by carrots.");

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
            Shell.println("nymfit/");
            Shell.println("wallpapers/");
            Shell.println("");

        },

        cat(args) {

            if (!args.length) {

                Shell.println("Usage: cat filename");

                return;

            }

            switch (args[0]) {

                case "README.md":

                    Shell.println("");
                    Shell.println("Welcome to Midnight Bunny OS.");
                    Shell.println("Enjoy your stay.");
                    Shell.println("");

                    break;

                case "projects.txt":

                    COMMANDS.projects();

                    break;

                case "status.log":

                    COMMANDS.status();

                    break;

                default:

                    Shell.println("File not found.");

            }

        },

        date() {

            Shell.println(new Date().toString());

        },

        clear() {

            Shell.clear();

        },

        reboot() {

            Boot.reboot();

        },

        shutdown() {

            Boot.shutdown();

        },

        give_touches() {

            Shell.println("");
            Shell.println("Requesting permission...");
            Shell.println("Checking containment...");
            Shell.println("Contact: APPROVED");
            Shell.println("Reward: DENIED");
            Shell.println("Containment remains active.");
            Shell.println("");

        }

    };

    function run(commandLine) {

        const parts = commandLine.trim().split(/\s+/);

        const command = parts.shift().toLowerCase();

        if (COMMANDS[command]) {

            COMMANDS[command](parts);

        } else {

            Shell.println("Unknown command: " + command);
            Shell.println("Type 'help' for a list of commands.");

        }

    }

    function list() {

        return Object.keys(COMMANDS);

    }

    return {

        run,
        list

    };

})();
