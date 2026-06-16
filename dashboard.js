const API_URL =
"https://script.google.com/macros/s/AKfycbwp7gD1NMbjeYBwTf11NAWvovy0mIgeuSwqtOixk_G_nOJWtCRUwDNzHly7F73muHd_/exec?action=summary";
document.addEventListener("DOMContentLoaded", loadDashboard);

async function loadDashboard() {

    try {

        const response = await fetch(API_URL);
        const data = await response.json();

        document.getElementById("totalVisitorsCard").innerText =
            data.totalVisitors || 0;

        document.getElementById("menVisitors").innerText =
            data.men || 0;

        document.getElementById("womenVisitors").innerText =
            data.women || 0;

        document.getElementById("childrenVisitors").innerText =
            data.children || 0;

        document.getElementById("peakHour").innerText =
            data.peakHour || "No Data";

        document.getElementById("peakDay").innerText =
            data.peakDay || "No Data";

        const table =
            document.getElementById("recentTable");

        table.innerHTML = "";

        if (data.recentSlots && data.recentSlots.length > 0) {

            data.recentSlots.forEach(row => {

                table.innerHTML += `
                <tr>
                    <td>${row.slot}</td>
                    <td>${row.men}</td>
                    <td>${row.women}</td>
                    <td>${row.children}</td>
                    <td>${row.total}</td>
                </tr>
                `;

            });

        } else {

            table.innerHTML =
            `<tr><td colspan="5">No Data Yet</td></tr>`;

        }

    } catch (error) {

        console.error(error);

        document.getElementById("peakHour").innerText =
            "API Error";

    }

}
