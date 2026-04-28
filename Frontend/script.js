const API = "http://127.0.0.1:5000";

async function getSystem() {
    let res = await fetch(API + "/system");
    let data = await res.json();
    display(data);
}

async function optimize() {
    let res = await fetch(API + "/optimize");
    let data = await res.json();
    display(data);
}

async function checkAntivirus() {
    let res = await fetch(API + "/antivirus");
    let data = await res.json();
    display(data);
}

async function checkNetwork() {
    let res = await fetch(API + "/network");
    let data = await res.json();
    display(data);
}

function display(data) {
    document.getElementById("output").textContent =
        JSON.stringify(data, null, 2);
}
{let chart;

    async function getSystem() {
        let res = await fetch(API + "/system");
        let data = await res.json();
    
        display(data);
        drawChart(data);
    }
    
    function drawChart(data) {
        const ctx = document.getElementById('cpuChart').getContext('2d');
    
        if (chart) {
            chart.destroy();
        }
    
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['CPU', 'RAM', 'Disk'],
                datasets: [{
                    label: 'Usage %',
                    data: [
                        data.cpu_usage,
                        data.ram_usage,
                        data.disk_usage
                    ]
                }]
            }
        });
    }
}
{setInterval(getSystem, 3000);}
