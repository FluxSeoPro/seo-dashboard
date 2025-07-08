async function getAnalyticsData(token) {
  const propertyId = "475548618"; // 👈 Replace with your real property ID

  const response = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
        dimensions: [{ name: "country" }],
        metrics: [{ name: "activeUsers" }],
      }),
    }
  );

  const data = await response.json();
  document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}
