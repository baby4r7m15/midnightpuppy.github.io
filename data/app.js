fetch("/data/middaypuppy.json")
.then(r=>r.json())
.then(data=>{

  document.getElementById("profileName").textContent = data.profile.name;
  document.getElementById("profileMeta").innerHTML = data.profile.meta;

  document.getElementById("bioLogList").innerHTML =
    data.bio.map(e=>`<li>${e}</li>`).join("");

  document.getElementById("vibesList").innerHTML =
    data.vibes.map(v=>`<span class="chip">${v}</span>`).join("");

  document.getElementById("statusReportList").innerHTML =
    data.status.map(s=>`<li>${s}</li>`).join("");

  document.getElementById("systemLogLines").innerHTML =
    data.logs.map(l=>`<div>${l}</div>`).join("");

});
