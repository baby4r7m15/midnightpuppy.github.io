/*
 * Midnight Bunny OS
 * core.js - Rev 6.7
 * Matches the current HTML layout
 */

const BunnyOS = {
  config: null,

  async init() {
    console.log("🐇 Booting Midnight Bunny OS...");

    await this.loadConfig();

    this.populatePage();
    this.boot();
    this.bindTerminal();
  },

  async loadConfig() {
    try {

      const res = await fetch("/bunny/night/data/midnightbunny.json", {
        cache: "no-store"
      });

      this.config = await res.json();

      console.log("Loaded config:", this.config.head?.title);

    } catch (e) {

      console.error("Couldn't load midnightbunny.json", e);

    }
  },

  populatePage() {

    if (!this.config) return;

    const data = this.config;

    // Page title
    document.title = data.head?.title || "MidnightBunny.exe";

    // Header
    this.setText("siteTitle", data.header.title);

    const title = document.getElementById("siteTitle");

    if (title) {
      title.setAttribute("data-text", data.header.title);
    }

    this.setText("siteSubtitle", data.header.subtitle);

    // Avatar

    const avatar = document.getElementById("avatarImg");

    if (avatar && data.profile.avatar) {

      avatar.src = data.profile.avatar.src;

      if (data.profile.avatar.alt) {
        avatar.alt = data.profile.avatar.alt;
      }

    }

    // Profile

    this.setText("profileName", data.profile.name);

    this.setHTML("profileMeta", data.profile.metaHtml);

    this.renderBars(data.profile.bars);

    this.renderSimpleList(
      "loadoutList",
      data.profile.loadout
    );

    // Bio

    this.renderBio(data.bio.entries);

    this.renderVibes(data.bio.vibes);

    // Stats

    this.renderCards(data.statsPanel.cards);

    this.renderSimpleList(
      "statusReportList",
      data.statusReport.items
    );

    // Toast

    this.setText(
      "toastHeader",
      data.toast.header
    );

    if (typeof typeToast === "function") {
      typeToast(data.toast.line);
    }

  },

  boot() {

    const overlay = document.getElementById("boot-overlay");

    if (!overlay) return;

    setTimeout(() => {

      overlay.style.opacity = "0";
      overlay.style.transition = "opacity .8s";

      setTimeout(() => overlay.remove(), 800);

    }, 2200);

  },

  bindTerminal() {

    const input = document.getElementById("terminal-input");

    if (!input) return;

    input.addEventListener("keydown", (e) => {

      if (e.key !== "Enter") return;

      const cmd = input.value.trim().toLowerCase();

      input.value = "";

      this.runCommand(cmd);

    });

  },

  runCommand(cmd) {

    const out = document.getElementById("terminal-output");

    const print = (text) => {

      if (!out) return;

      out.innerHTML += `<div>${text}</div>`;

      out.scrollTop = out.scrollHeight;

    };

    switch (cmd) {

      case "help":

        print("Commands:");
        print("help");
        print("about");
        print("projects");
        print("bunnyfetch");
        print("give_touches");
        print("clear");

        break;

      case "about":

        print("Midnight Bunny OS");
        print("After-hours hacker bunny.");

        break;

      case "projects":

        print("• NymFit");
        print("• Midnight Bunny OS");

        break;

      case "bunnyfetch":

        if (this.config) {

          print("🐇 " + this.config.header.title);
          print("Kernel: Long Ears Update");
          print("Status: " + this.config.header.subtitle);

        } else {

          print("Config not loaded.");

        }

        break;

      case "give_touches":

        print("Touch permissions: GRANTED");
        print("Reward: DENIED");

        break;

      case "clear":

        if (out) out.innerHTML = "";

        break;

      default:

        if (cmd) {

          print(cmd + ": command not found");

        }

    }

  },

  setText(id, value) {

    const el = document.getElementById(id);

    if (el) el.textContent = value;

  },

  setHTML(id, value) {

    const el = document.getElementById(id);

    if (el) el.innerHTML = value;

  },

  renderSimpleList(id, list) {

    const el = document.getElementById(id);

    if (!el) return;

    el.innerHTML = "";

    (list || []).forEach(item => {

      const li = document.createElement("li");

      li.textContent = item;

      el.appendChild(li);

    });

  },

  renderBars(bars) {

    const wrap = document.getElementById("profileBars");

    if (!wrap) return;

    wrap.innerHTML = "";

    (bars || []).forEach(bar => {

      wrap.innerHTML += `
<div class="bar-wrap">
    <div class="bar-label">${bar.label}</div>
    <div class="bar">
        <div class="fill ${bar.fillClass}"
             style="width:${bar.percent}%">
        </div>
    </div>
    <div class="bar-value">${bar.value}</div>
</div>`;

    });

  },

  renderBio(entries) {

    const wrap = document.getElementById("bioLogList");

    if (!wrap) return;

    wrap.innerHTML = "";

    (entries || []).forEach(entry => {

      wrap.innerHTML += `
<li>
<span class="q-dot"></span>
${entry.text}
<span class="tag ${entry.tagClass}">
${entry.tag}
</span>
</li>`;

    });

  },

  renderVibes(vibes) {

    const wrap = document.getElementById("vibesList");

    if (!wrap) return;

    wrap.innerHTML = "";

    (vibes || []).forEach(vibe => {

      const chip = document.createElement("span");

      chip.className = "chip";

      chip.textContent = vibe;

      wrap.appendChild(chip);

    });

  },

  renderCards(cards) {

    const wrap = document.getElementById("statsCards");

    if (!wrap) return;

    wrap.innerHTML = "";

    (cards || []).forEach(card => {

      wrap.innerHTML += `
<div class="card">

<div class="card-title">

${card.name}

<span>${card.level}</span>

</div>

<div class="card-bar">

<div style="width:${card.percent}%"></div>

</div>

<div class="card-sub">

${card.subtext}

</div>

</div>`;

    });

  }

};

document.addEventListener("DOMContentLoaded", () => BunnyOS.init());