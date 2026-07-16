/* Midnight Bunny — loads midnightbunny.json and builds the page from it.
   Edit midnightbunny.json to change colors, text, or cards — no HTML editing needed. */

const DATA_URL = "midnightbunny.json";

init();

async function init() {
  const stage = document.getElementById("stage");
  try {
    const res = await fetch(DATA_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`Could not load ${DATA_URL} (${res.status})`);
    const data = await res.json();
    render(data, stage);
  } catch (err) {
    stage.innerHTML = `
      <div class="loading" style="position:static;min-height:60vh;flex-direction:column;gap:10px;">
        <div>⚠ profile.exe failed to load</div>
        <div style="font-family:var(--f-mono);font-size:0.8rem;color:var(--text-dim);">${escapeHtml(err.message)}</div>
      </div>`;
    console.error(err);
  }
}

function render(data, stage) {
  applyTheme(data.theme);
  document.title = data.site?.title || document.title;

  stage.innerHTML = "";

  const cardsById = {};
  (data.cards || []).forEach(c => (cardsById[c.id] = c));

  // 1. hero always leads
  const hero = data.cards.find(c => c.variant === "glitch-banner");
  if (hero) stage.appendChild(buildCard(hero));

  // 2. portrait + floating badges sit right after the hero
  stage.appendChild(buildPortrait(data.character, data.badges));

  // 3. remaining cards, in the order authored in the JSON
  data.cards
    .filter(c => c.variant !== "glitch-banner")
    .forEach(c => stage.appendChild(buildCard(c)));
}

function applyTheme(theme) {
  if (!theme) return;
  const root = document.documentElement.style;
  const colorVarMap = {
    void: "--void", panel: "--panel", panelEdge: "--panel-edge",
    neonPink: "--pink", neonCyan: "--cyan", neonPurple: "--purple",
    neonGreen: "--green", neonYellow: "--yellow",
    textMain: "--text-main", textDim: "--text-dim"
  };
  Object.entries(theme.colors || {}).forEach(([key, val]) => {
    const cssVar = colorVarMap[key];
    if (cssVar) root.setProperty(cssVar, val);
  });
  if (theme.fonts?.display) root.setProperty("--f-display", theme.fonts.display);
  if (theme.fonts?.mono) root.setProperty("--f-mono", theme.fonts.mono);
  if (theme.fonts?.pixel) root.setProperty("--f-pixel", theme.fonts.pixel);
}

function buildPortrait(character, badges) {
  const wrap = document.createElement("div");
  wrap.className = "portrait";

  const frame = document.createElement("div");
  frame.className = "portrait__frame";

  const img = document.createElement("img");
  img.src = character?.portrait || "";
  img.alt = character?.portraitAlt || character?.name || "portrait";
  img.loading = "eager";
  img.onerror = () => {
    frame.innerHTML = `<div class="portrait__fallback">${character?.fallbackEmoji || "🐰"}</div>`;
  };
  frame.appendChild(img);
  wrap.appendChild(frame);

  const caption = document.createElement("div");
  caption.className = "portrait__caption";
  caption.textContent = character?.name || "";
  wrap.appendChild(caption);

  if (badges?.length) {
    const row = document.createElement("div");
    row.className = "badges";
    badges.forEach(b => {
      const span = document.createElement("span");
      span.className = "badge";
      span.textContent = b.text;
      span.style.color = `var(--${accentVar(b.accent)})`;
      row.appendChild(span);
    });
    wrap.appendChild(row);
  }

  return wrap;
}

function buildCard(c) {
  const card = document.createElement("article");
  card.className = `card card--${c.variant}`;
  card.dataset.area = c.area;
  card.dataset.accent = c.accent || "";

  if (c.variant === "glitch-banner") {
    const h1 = document.createElement("h1");
    h1.className = "glitch";
    h1.setAttribute("data-text", c.title);
    h1.textContent = c.title;
    card.appendChild(h1);
    if (c.subtitle) {
      const p = document.createElement("p");
      p.className = "hero__sub";
      p.textContent = c.subtitle;
      card.appendChild(p);
    }
    return card;
  }

  if (c.titleBar) card.appendChild(buildTitleBar(c.titleBar));

  const body = document.createElement("div");
  body.className = "card__body";

  switch (c.variant) {
    case "terminal":
      (c.lines || []).forEach(l => {
        const p = document.createElement("p");
        p.className = "term-line";
        p.innerHTML = `<span class="term-prompt">${escapeHtml(l.prompt)}</span>${escapeHtml(l.text)}`;
        body.appendChild(p);
      });
      break;

    case "stat-block":
      (c.stats || []).forEach(s => {
        const row = document.createElement("div");
        row.className = "stat-row";
        row.innerHTML = `<span class="stat-key">${escapeHtml(s.key)}</span><span class="stat-val">${escapeHtml(s.value)}</span>`;
        body.appendChild(row);
      });
      break;

    case "quote":
      card.classList.add("card--quote");
      body.innerHTML = `<p class="quote__text">${escapeHtml(c.text)}</p>` +
        (c.signature ? `<p class="quote__sig">${escapeHtml(c.signature)}</p>` : "");
      break;

    case "error-window":
      body.innerHTML = `
        <p class="error__msg">${escapeHtml(c.message)}</p>
        ${c.detail ? `<p class="error__detail">${escapeHtml(c.detail)}</p>` : ""}
        <div class="error__buttons">
          ${(c.buttons || []).map(b => `<span class="error__btn">${escapeHtml(b)}</span>`).join("")}
        </div>`;
      break;

    case "list": {
      const ul = document.createElement("ul");
      ul.className = "list";
      (c.items || []).forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
      });
      body.appendChild(ul);
      break;
    }

    case "links":
      card.classList.remove("card");
      card.className = "card--links";
      body.className = "";
      body.innerHTML = `
        <div class="links__row">
          ${(c.items || []).map(l => `<a class="links__item" href="${escapeAttr(l.url)}" target="_blank" rel="noopener">${escapeHtml(l.label)}</a>`).join("")}
        </div>
        ${c.copyright ? `<p class="copyright">${escapeHtml(c.copyright)}</p>` : ""}`;
      break;
  }

  card.appendChild(body);
  return card;
}

function buildTitleBar(title) {
  const bar = document.createElement("div");
  bar.className = "card__bar";
  bar.innerHTML = `
    <span class="dot dot--r"></span><span class="dot dot--y"></span><span class="dot dot--g"></span>
    <span class="card__bar-title">${escapeHtml(title)}</span>`;
  return bar;
}

function accentVar(name) {
  const map = {
    neonPink: "pink", neonCyan: "cyan", neonPurple: "purple",
    neonGreen: "green", neonYellow: "yellow"
  };
  return map[name] || "text-main";
}

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function escapeAttr(str = "") {
  return escapeHtml(str);
}
