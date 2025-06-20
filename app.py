from flask import Flask, request, jsonify, render_template
import os
import subprocess
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'

# Ensure upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# 🧠 Serve your HTML dashboard
@app.route('/')
def home():
    return render_template('index.html')  # make sure templates/index.html exists

# 🧪 Handle PDF upload + biomarker extraction
@app.route('/upload', methods=['POST'])
def upload():
    if 'report' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['report']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    filename = secure_filename('report.pdf')
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    try:
        result = subprocess.run(
            ['python', 'extract_biomarkers.py', filepath],  # Use 'python3' if needed
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout, 200, {'Content-Type': 'application/json'}
    except subprocess.CalledProcessError as e:
     print("🔴 OCR/Extraction Failed:")
     print(e.stderr)
     return jsonify({"error": "Extraction failed", "details": e.stderr}), 500
    except Exception as e:
     print("🔴 Unexpected error:")
     print(str(e))
    return jsonify({"error": "Unexpected error", "details": str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)
