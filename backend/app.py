import os
import sys
from flask import Flask, request, jsonify
from pypdf import PdfReader
import json
from resumeparsermain import parserfn
from flask_cors import CORS

sys.path.insert(0, os.path.abspath(os.getcwd()))

# Set the upload directory path
UPLOAD_DIR = os.path.join(os.getcwd(), 'upload')

# Create the upload directory if it doesn't exist
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/process', methods=['POST'])
def ats():
    # Get the uploaded file from the request
    doc = request.files['pdf_doc']

    # Define the path to save the file in the 'upload' directory
    file_path = os.path.join(UPLOAD_DIR, doc.filename)

    # Save the uploaded file to the specified directory
    doc.save(file_path)

    # Extract the text from the saved PDF file
    data = _read_file_from_path(file_path)
    
    # Process the extracted text (generate cover letter)
    data = parserfn(data)
    print("Parsed data:", data)  # Debug print statement
    
    # Try to parse the result as JSON and return it
    try:
        json_data = json.loads(data)
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        return jsonify({"error": "Failed to parse JSON data"}), 400
    
    # Return the JSON response
    return jsonify(json_data)

def _read_file_from_path(path):
    # Use PyPDF to extract text from the uploaded PDF file
    reader = PdfReader(path)
    data = ""
    for page_no in range(len(reader.pages)):
        page = reader.pages[page_no]
        data += page.extract_text()
    return data

if __name__ == "__main__":
    app.run(port=8000, debug=True)
