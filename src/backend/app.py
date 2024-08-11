from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
import json
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# MongoDB setup
client = MongoClient('mongodb://localhost:27017/')  # Update with your MongoDB URI if needed
db = client['resume_database']
collection = db['resumes']

# Directory for uploaded files
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    # Save the file
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    try:
        file.save(file_path)
    except Exception as e:
        return jsonify({"error": f"Failed to save file: {str(e)}"}), 500

    # Prepare file for API request
    try:
        with open(file_path, 'rb') as f:
            files = {'chatgpt_resume': f}
            headers = {'Authorization': 'f3c0f729-e798-42b4-b79a-ca378bc4ac8d'}
            response = requests.post(
                url="https://www.docsaar.com/api/chatgpt_resume_parsing",
                headers=headers,
                files=files
            )
            response.raise_for_status()  # Check if request was successful
    except requests.RequestException as e:
        return jsonify({"error": f"API request failed: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"Failed to prepare or send API request: {str(e)}"}), 500

    # Parse response
    try:
        data = response.json()
    except json.JSONDecodeError:
        return jsonify({"error": "Failed to parse response from API"}), 500

    if 'output' not in data:
        return jsonify({"error": "Invalid response from API"}), 500

    # Helper function to safely extract field values
    def get_value(field, default=None):
        return data["output"].get(field, {}).get("value", default)

    # Extract information
    summary = get_value("Summary")
    achievements = get_value("achievements", [])
    address = get_value("address")
    education = get_value("education", [])
    email = get_value("email")
    github = get_value("github", "Username not mentioned")
    hobbies = get_value("hobbies", [])
    linkedin = get_value("linked_in", "Username not mentioned")
    name = get_value("name")
    objective = get_value("objective")
    phone = get_value("phone")
    projects = get_value("projects", [])
    skills = get_value("skills", [])

    # Format the data into the required JSON structure
    resume_data = {
        "Name": name if name else "xxxxxx",
        "Email": email if email else "abc@gmail.com",
        "Phone Number": phone if phone else "+91 99999 99999",
        "Location": address if address else "abc",
        "Social Media": {
            "GitHub": github,
            "LinkedIn": linkedin
        },
        "Career Objective": objective,
        "Education": [
            {
                "Institution": edu.get('university', {}).get('value', 'Unknown'),
                "Year": edu.get('dates', {}).get('value', 'Unknown'),
                "Degree": edu.get('degree', {}).get('value', 'Unknown'),
                "Results": edu.get('results', {}).get('value', 'Unknown')
            } for edu in education
        ],
        "Projects": [
            {
                "Project Name": project.get('title', {}).get('value', 'Unknown'),
                "Description": project.get('description', {}).get('value', 'Unknown')
            } for project in projects
        ],
        "Technical Skills": {
            "Programming Languages": [skill for skill in skills if "Programming Languages" in skill],
            "Web Technologies": [skill for skill in skills if "Web Technologies" in skill],
            "Tools and Frameworks": [skill for skill in skills if "Tools and Frameworks" in skill],
            "Databases": [skill for skill in skills if "Databases" in skill]
        },
        "Interests": {
            "Hobbies": hobbies
        },
        "Achievements": [
            {
                "Award": achievement.split(":")[0],
                "Title": achievement.split(":")[1] if ":" in achievement else "",
                "Event": achievement.split(" at ")[1].split(".")[0] if " at " in achievement else "",
                "Date": achievement.split(".")[-1].strip() if "." in achievement else ""
            } for achievement in achievements
        ]
    }
    print(resume_data)
    return jsonify(resume_data)

if __name__ == '__main__':
    app.run(debug=True)
