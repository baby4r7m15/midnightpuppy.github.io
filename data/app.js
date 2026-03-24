fetch("/middaypuppy/data.json")
  .then(res => res.json())
  .then(data => {

    document.getElementById("name").textContent = data.name;
    document.getElementById("tagline").textContent = data.tagline;
    document.getElementById("pfp").src = data.avatar;

    const bioEl = document.getElementById("bio");
    bioEl.innerHTML = data.bio.map(line => `<div>${line}</div>`).join("");

    const statsEl = document.getElementById("stats");
    statsEl.innerHTML = data.stats.map(s => `
      <div class="stat">
        <strong>${s.label}</strong><br>${s.value}
      </div>
    `).join("");

  });
