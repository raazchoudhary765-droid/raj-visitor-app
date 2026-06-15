let men = 0;
let women = 0;
let children = 0;

const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbwp7gDlNMbjeYBwTf11NAWvovy0mIgeuSwqtOixk_G_nOJWtCRUwDNzHly7F73muHd_/exec";
function addCount(type, value){

    if(type === "men"){
        men += value;
        document.getElementById("menCount").innerText = men;
    }

    if(type === "women"){
        women += value;
        document.getElementById("womenCount").innerText = women;
    }

    if(type === "children"){
        children += value;
        document.getElementById("childrenCount").innerText = children;
    }

    updateTotal();
}

function updateTotal(){

    const total = men + women + children;

    document.getElementById("totalVisitors").innerText = total;
}

function getCurrentSlot(){

    const now = new Date();

    let hour = now.getHours();

    let nextHour = hour + 1;

    const start =
        String(hour).padStart(2,'0');

    const end =
        String(nextHour).padStart(2,'0');

    return `${start}-${end}`;
}

function updateSlot(){

    document.getElementById("currentSlot")
    .innerText = getCurrentSlot();
}

updateSlot();

function saveSlot(){

    const total =
        men + women + children;

    if(total === 0){
        alert("No visitors counted.");
        return;
    }

    const today =
        new Date().toISOString().split('T')[0];

    const slot =
        getCurrentSlot();

    const url =
        WEB_APP_URL +
        `?date=${today}` +
        `&slot=${slot}` +
        `&men=${men}` +
        `&women=${women}` +
        `&children=${children}`;

    fetch(url)
    .then(response => response.text())
    .then(data => {

        alert("Slot Saved Successfully");

        men = 0;
        women = 0;
        children = 0;

        document.getElementById("menCount").innerText = 0;
        document.getElementById("womenCount").innerText = 0;
        document.getElementById("childrenCount").innerText = 0;
        document.getElementById("totalVisitors").innerText = 0;

    })
    .catch(error => {

        alert("Save Failed");

        console.error(error);

    });
}

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
}