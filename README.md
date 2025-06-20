# 🧪 Biomarker Dashboard – Ecotown Diagnostics

This web application allows users to upload biomarker reports (PDFs), extract clinical values using OCR, and visualize them in an interactive, responsive dashboard.

## 🌐 Hosted App
🔗 [Live Demo on Heroku](https://biomarker-dashboard-hemanth-e6d2203c015f.herokuapp.com/)

## 📸 Features

- 📊 Time-series visualizations for multiple biomarkers
- 🚦 Clinical range indicators (normal/abnormal)
- 📱 Fully mobile-responsive UI
- ⬆️ PDF upload with OCR and value extraction
- ✅ Built with Flask, JavaScript (Chart.js), Tesseract OCR

## ⚙️ Technologies Used

- **Frontend:** HTML, CSS, JavaScript, Chart.js
- **Backend:** Python Flask
- **OCR Engine:** Tesseract
- **PDF to Image:** `pdf2image`
- **Deployment:** Heroku + Ngrok (for local dev)

## 🗂 Project Structure

Biomarker-Dashboard/
│
├── app.py # Flask backend
├── extract_biomarkers.py # PDF processing + OCR
├── requirements.txt
├── Procfile # For Heroku deployment
├── runtime.txt
│
├── static/
│ ├── style.css
│ └── script.js
│
├── templates/
│ └── index.html
│
└── uploads/
└── report.pdf # Sample PDF

## 🚀 Setup Instructions

1. Clone the repo  
   ```bash
   git clone https://github.com/Code-lord-17/Biomarker-Dashboard-EcotownDiagnostics.git
   cd Biomarker-Dashboard-EcotownDiagnostics
Create virtual environment (optional but recommended)

bash
Copy
Edit
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
Install dependencies

bash
Copy
Edit
pip install -r requirements.txt
Run the server

bash
Copy
Edit
python app.py
Visit http://localhost:5000 to use the app.

## 🧠 Clinical Biomarkers Supported
Total Cholesterol

LDL / HDL

Triglycerides

Creatinine

Vitamin D / B12

HbA1c
## 📄 License

This project is for demonstration and evaluation purposes only.

