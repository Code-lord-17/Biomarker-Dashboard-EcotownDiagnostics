## Architecture Decisions

- **Frontend**: Static HTML, CSS, and JavaScript using Chart.js for interactive visualizations.
- **Backend**: Python Flask app to handle PDF uploads, OCR, and biomarker extraction.
- **OCR Engine**: Tesseract OCR via `pytesseract` for extracting text from lab reports.
- **PDF Handling**: `pdf2image` converts PDF pages to images for OCR.
- **Deployment**: Hosted using Ngrok for temporary secure access.
- **Data Format**: Extracted biomarker values are returned in JSON.
- **Responsiveness**: CSS grid layout ensures compatibility on both desktop and mobile.

## Clinical Reference Ranges

| Biomarker           | Normal Range          | Units     |
|---------------------|-----------------------|-----------|
| Total Cholesterol   | 125 – 200             | mg/dL     |
| LDL                 | 0 – 130               | mg/dL     |
| HDL                 | 40 – 60               | mg/dL     |
| Triglycerides       | 50 – 150              | mg/dL     |
| Creatinine          | 0.6 – 1.3             | mg/dL     |
| Vitamin D           | 20 – 50               | ng/mL     |
| Vitamin B12         | 200 – 900             | pg/mL     |
| HbA1c               | 4 – 5.6               | %         |

## Performance Benchmarks

- **PDF Upload and OCR**: ~15–25 seconds for standard lab reports (~2 pages).
- **Biomarker Extraction Accuracy**: ~85% on well-formatted reports.
- **Frontend Load Time**: ~1–2 seconds via Ngrok on average.
- **Memory Use**: Locally ~500MB during Tesseract OCR; Heroku exceeded 512MB leading to crash.

## Security Considerations

- File uploads are sanitized and saved with a static name to avoid arbitrary filename execution.
- Flask restricts uploads to PDFs only and validates presence.
- No user authentication required for demo; access restricted via Ngrok tunnel.
- No sensitive data is logged or stored beyond the session.
- CORS and HTTPS enforced via Ngrok during public demo.
