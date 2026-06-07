const API = "https://your-app.onrender.com";
// If using Codespaces, replace with your https://xxxx-3000.app.github.dev

let chart;

// Fetch system data
async function getSystem() {
    try {
        let res = await fetch(API + "/system");
        let data = await res.json();

        display(data);
        drawChart(data);
    } catch (err) {
        console.error(err);
    }
}

// Other actions
async function optimize() {
    let res = await fetch(API + "/optimize");
    let data = await res.text();
    display(data);
}

async function checkAntivirus() {
    let res = await fetch(API + "/antivirus");
    let data = await res.text();
    display(data);
}

async function checkNetwork() {
    let res = await fetch(API + "/network");
    let data = await res.text();
    display(data);
}

// Display output
function display(data) {
    document.getElementById("output").textContent =
        typeof data === "string" ? data : JSON.stringify(data, null, 2);
}

// Draw chart (safe version)
function drawChart(data) {
    const ctx = document.getElementById('cpuChart').getContext('2d');

    if (chart) {
        chart.destroy();
    }

    // Dummy values (since backend doesn't provide real usage yet)
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['CPU', 'RAM', 'Disk'],
            datasets: [{
                label: 'Usage %',
                data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                ]
            }]
g        }
    });
}

// Auto refresh every 3 seconds
setInterval(getSystem, 3000);
