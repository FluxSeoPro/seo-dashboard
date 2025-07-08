const CLIENT_ID = "37925044671-4dspu8brip9j6njgf1c31lkcg9eupkta.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/webmasters.readonly";

document.getElementById("login-button").addEventListener("click", () => {
  gapi.load("client:auth2", async () => {
    await gapi.auth2.init({ client_id: CLIENT_ID });
    gapi.auth2.getAuthInstance().signIn().then(() => {
      loadGSC();
    });
  });
});

function loadGSC() {
  gapi.client.load("webmasters", "v3", async () => {
    // Get verified sites
    const siteList = await gapi.client.webmasters.sites.list();
    const sites = siteList.result.siteEntry.filter(s => s.permissionLevel === "siteOwner");
    const siteUrl = sites[0].siteUrl;

    document.getElementById("site-url").innerText = siteUrl;
    document.getElementById("dashboard").style.display = "block";

    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    const res = await gapi.client.webmasters.searchanalytics.query({
      siteUrl,
      resource: {
        startDate: lastWeek.toISOString().slice(0, 10),
        endDate: today.toISOString().slice(0, 10),
        dimensions: ["query"],
        rowLimit: 10
      }
    });

    const rows = res.result.rows || [];

    // Fill table
    const tbody = document.getElementById("results");
    tbody.innerHTML = "";
    const labels = [];
    const clicks = [];

    rows.forEach(row => {
      const { keys, clicks: c, impressions, ctr } = row;
      labels.push(keys[0]);
      clicks.push(c);

      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${keys[0]}</td><td>${c}</td><td>${impressions}</td><td>${(ctr * 100).toFixed(2)}%</td>`;
      tbody.appendChild(tr);
    });

    // Render chart
    new Chart(document.getElementById("chart"), {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Clicks",
          data: clicks,
          backgroundColor: "rgba(66, 133, 244, 0.7)"
        }]
      }
    });
  });
}
