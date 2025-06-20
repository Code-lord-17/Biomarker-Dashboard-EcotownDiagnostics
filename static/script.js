console.log("✅ script.js is loading...");

const chartInstances = {}; // 🧠 holds all active charts by canvas ID

// Register the annotation plugin
Chart.register(window['chartjs-plugin-annotation']);

document.getElementById('uploadForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const status = document.getElementById('uploadStatus');
  const spinner = document.getElementById('spinner');

  if (status) status.textContent = 'Uploading...';
  if (spinner) spinner.style.display = 'inline-block';

  try {
    const res = await fetch('/upload', {
      method: 'POST',
      body: formData
    });

    const result = await res.json();
    console.log('✅ Upload response:', result);

    if (result && typeof result === 'object') {
      if (status) status.textContent = '✅ Upload successful!';
      renderCharts(result); // Update the dashboard
    } else {
      if (status) status.textContent = '❌ Invalid response';
    }

  } catch (err) {
    console.error('❌ Upload error:', err);
    if (status) status.textContent = '❌ Upload failed.';
  } finally {
    if (spinner) spinner.style.display = 'none';
  }
});



function renderCharts(entry) {
  const label = entry.date || 'Report';
  document.getElementById("reportDate").textContent = `Report Date: ${label}`;

  createChart('totalCholesterolChart', 'totalCholesterolCard', 'Total Cholesterol (mg/dL)', entry.total_cholesterol, 'blue', 100, 300, 125, 200);
  createChart('ldlChart', 'ldlCard', 'LDL (mg/dL)', entry.ldl, 'red', 50, 200, 0, 130);
  createChart('hdlChart', 'hdlCard', 'HDL (mg/dL)', entry.hdl, 'green', 20, 80, 40, 60);
  createChart('triglyceridesChart', 'triglyceridesCard', 'Triglycerides (mg/dL)', entry.triglycerides, 'orange', 50, 250, 50, 150);
  createChart('creatinineChart', 'creatinineCard', 'Creatinine (mg/dL)', entry.creatinine, 'brown', 0, 2, 0.6, 1.3);
  createChart('vitaminDChart', 'vitaminDCard', 'Vitamin D (ng/mL)', entry.vitamin_d, 'teal', 10, 80, 20, 50);
  createChart('vitaminB12Chart', 'vitaminB12Card', 'Vitamin B12 (pg/mL)', entry.vitamin_b12, 'purple', 100, 1200, 200, 900);
  createChart('hba1cChart', 'hba1cCard', 'HbA1c (%)', entry.hba1c, 'pink', 4, 10, 4, 5.6);
}

function createChart(canvasId, cardId, label, value, color, suggestedMin, suggestedMax, clinicalMin, clinicalMax) {
  const canvas = document.getElementById(canvasId);
if (!canvas) {
  console.warn(`⚠️ Canvas not found: ${canvasId}`);
  return;
}
const ctx = canvas.getContext('2d');


  // Destroy existing chart if exists
  if (chartInstances[canvasId]) {
    chartInstances[canvasId].destroy();
  }

  // Add alert style if value is out of range
  if (value < clinicalMin || value > clinicalMax) {
    document.getElementById(cardId).classList.add('alert');
  } else {
    document.getElementById(cardId).classList.remove('alert');
  }

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [document.getElementById("reportDate").textContent.replace('Report Date: ', '')],
      datasets: [{
        label: label,
        data: [value],
        borderColor: color,
        borderWidth: 2,
        fill: false,
        tension: 0.3,
        pointBackgroundColor: value < clinicalMin || value > clinicalMax ? 'red' : color,
        pointRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `${label} Over Time`
        },
        annotation: {
          annotations: {
            range: {
              type: 'box',
              yMin: clinicalMin,
              yMax: clinicalMax,
              backgroundColor: 'rgba(0, 255, 0, 0.1)',
              borderWidth: 0
            }
          }
        }
      },
      scales: {
        y: {
          suggestedMin: suggestedMin,
          suggestedMax: suggestedMax
        }
      }
    }
  });

  chartInstances[canvasId] = chart;
}
