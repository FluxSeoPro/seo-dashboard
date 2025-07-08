<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SEO Analytics Dashboard</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 20px;
      background: #f9fafb;
      color: #333;
    }
    h1 {
      text-align: center;
      margin-bottom: 30px;
    }
    #signin-button {
      text-align: center;
      margin-bottom: 20px;
    }
    .dashboard {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
      max-width: 1000px;
      margin: auto;
    }
    .card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
      text-align: center;
    }
    .metric {
      font-size: 1.5em;
      font-weight: 600;
      margin-bottom: 5px;
    }
    .label {
      font-size: 0.9em;
      color: #777;
    }
  </style>
  <script src="https://accounts.google.com/gsi/client" async defer></script>
</head>
<body>
  <h1>SEO Analytics Dashboard</h1>
  <div id="signin-button"></div>

  <div class="dashboard" id="dashboard" style="display:none;">
    <div class="card">
      <div class="metric" id="total-users">--</div>
      <div class="label">Total Users</div>
    </div>
    <div class="card">
      <div class="metric" id="top-country">--</div>
      <div class="label">Top Country</div>
    </div>
    <div class="card">
      <div class="metric" id="device-type">--</div>
      <di
