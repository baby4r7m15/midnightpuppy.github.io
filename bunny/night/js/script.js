/* Midnight Bunny — loads midnightbunny.json and builds the page from it.
   The whole page is one fixed-size "poster" (#canvas) that gets uniformly
   scaled with CSS to exactly fit the viewport — that's what guarantees no
   scrolling on any screen. Edit midnightbunny.json to change colors, text,
   the background photo, or where each card sits — no HTML editing needed. */

const DATA_URL = "/bunny/night/data/midnightbunny.json";

let DATA = null;
let currentLayout = null; // "desktop" | "mobile"
let canvasEl = null;
let resizeTimer = null;

init();

async function init() {
  const viewport = document.getElementById("viewport");
  try {
    const res = await fetch(DATA_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`Could not load ${DATA_URL} (${res.status})`);
    DATA = await res.json();
    applyTheme(DATA.theme);
    document.title = DATA.site?.title || document.title;
    await resolveBackground(DATA.character);
    buildPoster(viewport);
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
  } catch (err) {
    viewport.innerHTML = `
      <div class="loading" style="flex-direction:column;gap:10px;">
        <div>⚠ profile.exe failed to load</div>
        <div style="font-family:var(--f-mono);font-size:0.8rem;color:var(--text-dim);">${escapeHtml(err.message)}</div>
      </div>`;
    console.error(err);
  }
}

/* ---------- theme ---------- */
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

/* Test-load the character photo; fall back to a generated look if missing
   so the poster never ends up with a broken background. */
function resolveBackground(character) {
  return new Promise(resolve => {
    const src = character?.portrait || "";
    const img = new Image();
    img.onload = () => {
      document.documentElement.style.setProperty("--bg-url", `url("${src}")`);
      resolve();
    };
    img.onerror = () => {
      // no portrait yet — fall back to a neon gradient so layout still works
      document.documentElement.style.setProperty(
        "--bg-url",
        "radial-gradient(circle at 30% 20%, #2a1a44, #050308 70%)"
      );
      resolve();
    };
    img.src = src;
  });
}

/* ---------- layout selection ---------- */
function pickLayout() {
  return window.innerWidth <= window.innerHeight ? "mobile" : "desktop";
}

function buildPoster(viewport) {
  currentLayout = pickLayout();
  viewport.innerHTML = "";

  const dims = DATA.canvas?.[currentLayout] || { width: 1500, height: 950 };

  canvasEl = document.createElement("div");
  canvasEl.id = "canvas";
  canvasEl.style.width = dims.width + "px";
  canvasEl.style.height = dims.height + "px";
  canvasEl.style.marginLeft = -(dims.width / 2) + "px";
  canvasEl.style.marginTop = -(dims.height / 2) + "px";

  const bgLayer = document.createElement("div");
  bgLayer.className = "bg-layer";
  const pulse = document.createElement("div");
  pulse.className = "glitch-pulse";
  bgLayer.appendChild(pulse);
  canvasEl.appendChild(bgLayer);

  (DATA.cards || []).forEach(c => canvasEl.appendChild(buildCard(c, currentLayout)));
  (DATA.badges || []).forEach(b => canvasEl.appendChild(buildBadge(b, currentLayout)));

  viewport.appendChild(canvasEl);
  applyScale();
}

function applyScale() {
  if (!canvasEl) return;
  const dims = DATA.canvas?.[currentLayout] || { width: 1500, height: 950 };
  const scale = Math.min(
    window.innerWidth / dims.width,
    window.innerHeight / dims.height
  ) * 0.94;
  canvasEl.style.setProperty("--scale", scale);
}

function onResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const newLayout = pickLayout();
    if (newLayout !== currentLayout) {
      buildPoster(document.getElementById("viewport")); // orientation actually flipped — rebuild with the other coordinate set
    } else {
      applyScale();
    }
  }, 120);
}

/* ---------- element builders ---------- */
function positionEl(el, pos, extraWidth) {
  el.style.position = "absolute";
  el.style.left = pos.left + "%";
  el.style.top = pos.top + "%";
  if (extraWidth && pos.width != null) el.style.width = pos.width + "%";
  el.style.setProperty("--rot", (pos.rotate || 0) + "deg");
  if (pos.z != null) el.style.zIndex = pos.z;
}

function buildBadge(b, layout) {
  const span = document.createElement("span");
  span.className = "badge";
  span.textContent = b.text;
  span.dataset.accent = b.accent || "";
  positionEl(span, b.pos[layout], false);
  return span;
}

function buildCard(c, layout) {
  const card = document.createElement("article");
  card.className = `card card--${c.variant}`;
  card.dataset.accent = c.accent || "";
  positionEl(card, c.pos[layout], true);

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

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function escapeAttr(str = "") {
  return escapeHtml(str);
}
