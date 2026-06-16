const API_URL =
"https://script.google.com/macros/s/AKfycby4EO-QruH1ohw-H0NKAwcu2O_G-HdX9Q2-Scwpc9jWgRTvCnWiiXygZsmZd-Fw0kCreg/exec?action=summary";

document.addEventListener("DOMContentLoaded", loadDashboard);

async function loadDashboard() {

  try {

    const response = await fetch(API_URL);

    const data = await response.json();

    console.log(data);

    document.getElementById("totalVisitorsCard").innerText =
      data.grandTotal || 0;

    document.getElementById("menVisitors").innerText =
      data.menTotal || 0;

    document.getElementById("womenVisitors").innerText =
      data.womenTotal || 0;

    document.getElementById("childrenVisitors").innerText =
      data.childrenTotal || 0;

    document.getElementById("peakHour").innerText =
      "Coming Soon";

    document.getElementById("peakDay").innerText =
      "Coming Soon";

    document.getElementById("recentTable").innerHTML = `
      <tr>
        <td>10-11</td>
        <td>${data.menTotal}</td>
        <td>${data.womenTotal}</td>
        <td>${data.childrenTotal}</td>
        <td>${data.grandTotal}</td>
      </tr>
    `;

  }

  catch(error){

    console.error(error);

    document.getElementById("peakHour").innerText =
    "API Error";

  }

}

loadDashboard();

setInterval(loadDashboard,30000);
