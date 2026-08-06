/* ===========================================================
   midnight.exe // ARTEMIS — page logic
   =========================================================== */

const NAV_ICONS = {
  home: "&#8962;",
  about: "&#9787;",
  memories: "&#128247;",
  playlist: "&#9835;",
  gallery: "&#128444;",
  friends: "&#128101;",
  contact: "&#9993;"
};

async function loadData() {
  const res = await fetch("json/artemis.json");
  return res.json();
}

function el(tag, className, html) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (html !== undefined) e.innerHTML = html;
  return e;
}

function renderNav(nav) {
  const list = document.getElementById("nav-list");
  nav.forEach(item => {
    const li = el("li");
    const div = el("div", "nav-item" + (item.active ? " active" : ""));
    div.innerHTML = `<span class="nav-icon">${NAV_ICONS[item.icon] || "&#8226;"}</span><span>${item.label}</span>`;
    li.appendChild(div);
    list.appendChild(li);
  });
}

function renderAbout(about) {
  document.getElementById("about-title").textContent = about.panelTitle ? "//_ABOUT_ME" : "//_ABOUT_ME";
  document.getElementById("hero-title").textContent = about.panelTitle;
  document.getElementById("about-title").textContent = about.aboutTitle;
  document.getElementById("about-name").textContent = about.name;
  document.getElementById("about-role").textContent = about.role;

  const bio = document.getElementById("about-bio");
  about.bio.forEach(line => bio.appendChild(el("p", null, line)));

  const stats = document.getElementById("about-stats");
  about.stats.forEach(s => {
    const row = el("div", "about-stat-row");
    row.innerHTML = `<span class="about-stat-label">${s.label}</span><span class="about-stat-value">${s.value}</span>`;
    stats.appendChild(row);
  });
}

function renderQuote(quote) {
  document.getElementById("quote-title").textContent = quote.title;
  document.getElementById("quote-text").innerHTML = quote.lines.join("<br>");
}

function renderStatus(status) {
  document.getElementById("status-title").textContent = status.title;
  document.getElementById("status-state").textContent = status.state;
  document.getElementById("status-footer").textContent = status.footer;
  const rows = document.getElementById("status-rows");
  status.rows.forEach(r => {
    rows.appendChild(el("p", "status-row", `${r.label} <span class="val">${r.value}</span>`));
  });
}

function renderTagList(data, listId, titleId) {
  document.getElementById(titleId).textContent = data.title;
  const list = document.getElementById(listId);
  data.items.forEach(item => list.appendChild(el("li", null, item)));
}

function renderPersonality(p) {
  document.getElementById("personality-title").textContent = p.title;
  const svg = document.getElementById("personality-chart");
  const cx = 120, cy = 100, r = 78;
  const n = p.axes.length;
  const angle = i => (Math.PI * 2 * i) / n - Math.PI / 2;

  const pointAt = (i, val) => {
    const a = angle(i);
    const rr = (val / 100) * r;
    return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)];
  };

  let svgContent = "";

  // grid rings
  [0.25, 0.5, 0.75, 1].forEach(f => {
    const pts = p.axes.map((_, i) => {
      const [x, y] = pointAt(i, f * 100);
      return `${x},${y}`;
    }).join(" ");
    svgContent += `<polygon points="${pts}" fill="none" stroke="#3a1c46" stroke-width="1"/>`;
  });

  // axis lines + labels
  p.axes.forEach((axis, i) => {
    const [x, y] = pointAt(i, 100);
    svgContent += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#3a1c46" stroke-width="1"/>`;
    const [lx, ly] = pointAt(i, 122);
    svgContent += `<text x="${lx}" y="${ly}" fill="#9884a6" font-size="9" font-family="Courier New, monospace" text-anchor="middle" dominant-baseline="middle">${axis}</text>`;
  });

  // data polygon
  const dataPts = p.values.map((v, i) => pointAt(i, v).join(",")).join(" ");
  svgContent += `<polygon points="${dataPts}" fill="rgba(255,47,201,0.18)" stroke="#ff2fc9" stroke-width="1.5"/>`;

  // data dots
  p.values.forEach((v, i) => {
    const [x, y] = pointAt(i, v);
    svgContent += `<circle cx="${x}" cy="${y}" r="2.5" fill="#ff2fc9"/>`;
  });

  svg.innerHTML = svgContent;
}

function renderMemories(memories) {
  document.getElementById("memories-title").textContent = memories.title;
  document.getElementById("memories-footer").innerHTML = memories.footer + " &#128274;";
  const list = document.getElementById("memories-list");
  memories.items.forEach(m => {
    const li = el("li", "memory-item");
    li.innerHTML = `<span><span class="memory-file">${m.file}</span><span class="memory-label">${m.label}</span></span><span class="memory-lock">${m.locked ? "&#128274;" : ""}</span>`;
    list.appendChild(li);
  });
}

function renderPlaylist(playlist) {
  document.getElementById("playlist-title").textContent = playlist.title;
  document.getElementById("playlist-name").textContent = playlist.nowPlayingLabel;
  document.getElementById("playlist-status").textContent = playlist.statusLabel;
  document.getElementById("playlist-track").textContent = playlist.track;
  document.getElementById("playlist-album").textContent = playlist.album;
  document.getElementById("ptime-current").textContent = playlist.currentTime;
  document.getElementById("ptime-duration").textContent = playlist.duration;
  document.getElementById("pbar-fill").style.width = playlist.progress + "%";
}

function renderFriends(friends) {
  document.getElementById("friends-title").textContent = friends.title;
  const grid = document.getElementById("friends-grid");
  friends.items.forEach(f => {
    const item = el("div", "friend-item");
    item.innerHTML = `
      <div class="friend-avatar"><img src="${f.image}" alt="${f.name}"></div>
      <div class="friend-name">${f.name}</div>
      <div class="friend-tag">${f.tag}</div>
    `;
    grid.appendChild(item);
  });
}

function renderSysinfo(sysinfo) {
  document.getElementById("sysinfo-title").textContent = sysinfo.title;
  const container = document.getElementById("sysinfo-lines");
  sysinfo.lines.forEach(line => {
    if (line === "") {
      container.appendChild(el("div", "blank"));
    } else {
      container.appendChild(el("p", null, line));
    }
  });
}

function renderFooter(footer) {
  document.getElementById("footer-left").textContent = footer.left;
  document.getElementById("footer-center").textContent = footer.center;
}

function renderSystem(system) {
  document.getElementById("sys-time").textContent = system.time;
}

function renderSidebarProtocol(protocol) {
  document.getElementById("protocol-fill").style.width = protocol.progress + "%";
  document.getElementById("protocol-threat").textContent = protocol.threat;
  document.getElementById("protocol-safe").textContent = protocol.safe;
}

async function init() {
  const data = await loadData();
  renderSystem(data.system);
  document.querySelector(".brand").textContent = data.sidebar.title;
  document.querySelector(".brand-sub").textContent = data.sidebar.subtitle;
  document.querySelector(".brand-name").innerHTML = `.... <span>${data.sidebar.name}</span>`;
  renderNav(data.sidebar.nav);
  renderSidebarProtocol(data.sidebar.protocol);

  renderAbout(data.about);
  renderQuote(data.quote);
  renderStatus(data.status);
  renderTagList(data.likes, "likes-list", "likes-title");
  renderTagList(data.dislikes, "dislikes-list", "dislikes-title");
  renderPersonality(data.personality);
  renderMemories(data.memories);
  renderPlaylist(data.playlist);
  renderFriends(data.friends);
  renderSysinfo(data.sysinfo);
  renderFooter(data.footer);
}

document.addEventListener("DOMContentLoaded", init);
