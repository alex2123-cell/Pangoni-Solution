// Relative API calls (same origin)
const API = "";

let chart;

// Fetch system data
async function getSystem() {
    try {
        let res = await fetch(API + "/system");
        if (!res.ok) throw new Error("Failed to fetch system info");
        let data = await res.json();

        display(data);
        drawChart(data);
    } catch (err) {
        console.error(err);
        display({ error: String(err) });
    }
}

// POST to optimize (state change)
async function optimize() {
    try {
        let res = await fetch(API + "/optimize", { method: "POST" });
        let data = await res.json();
        display(data);
    } catch (err) {
        console.error(err);
    }
}

async function checkAntivirus() {
    try {
        let res = await fetch(API + "/antivirus");
        let data = await res.json();
        display(data);
    } catch (err) {
        console.error(err);
    }
}

async function checkNetwork() {
    try {
        let res = await fetch(API + "/network");
        let data = await res.json();
        display(data);
    } catch (err) {
        console.error(err);
    }
}

// Display output
function display(data) {
    document.getElementById("output").textContent =
        typeof data === "string" ? data : JSON.stringify(data, null, 2);
}

// Draw chart using backend values if present, otherwise random
function drawChart(data) {
    const ctx = document.getElementById('cpuChart').getContext('2d');

    if (chart) {
        chart.destroy();
    }

    const cpu = (data && data.cpu_usage) ? data.cpu_usage : Math.round(Math.random() * 100);
    const ram = (data && data.ram_usage) ? data.ram_usage : Math.round(Math.random() * 100);
    const disk = (data && data.disk_usage) ? data.disk_usage : Math.round(Math.random() * 100);

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['CPU', 'RAM', 'Disk'],
            datasets: [{
                label: 'Usage %',
                data: [cpu, ram, disk],
                backgroundColor: ['#4e79a7', '#59a14f', '#f28e2b']
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, max: 100 }
            }
        }
    });
}

// Auto refresh every 3 seconds
setInterval(getSystem, 3000);
getSystem();
