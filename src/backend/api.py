import numpy as np
import os
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
import PyPDF2
import uvicorn
from fastapi import FastAPI, Body, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import ngrok

# Initialize FastAPI
app = FastAPI()

# Middleware for CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"], 
)

# Load the tokenizer and model
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen-VL-Chat", trust_remote_code=True) 
llm_model = AutoModelForCausalLM.from_pretrained("sanjay-29-29/GreenAI", trust_remote_code=True, device_map='auto') 
history = None

# ngrok setup
ngrok.set_auth_token("2a1iGE4Q5SDAF4mhdAVXeNptwJd_2GBcW2ACMaj2JoAJy8Gtt")
listener = ngrok.forward("127.0.0.1:5000", authtoken_from_env=True, domain="apparent-wolf-obviously.ngrok-free.app")

# Helper functions for different tasks

def analyze_resume_with_qwen(resume_text):
    prompt = f"Please analyze the following resume and provide a summary of the career objective, work experience, and skills: {resume_text}"
    response, _ = llm_model.chat(tokenizer, query=prompt, history=None)
    return response

def enhance_career_objective(objective_text):
    prompt = f"Rewrite the following career objective to make it more impactful: {objective_text}"
    response, _ = llm_model.chat(tokenizer, query=prompt, history=None)
    return response

def generate_new_resume_with_qwen(resume_data):
    prompt = f"Create a new resume based on the following data: {resume_data}"
    response, _ = llm_model.chat(tokenizer, query=prompt, history=None)
    return response

def advanced_analysis(resume_text):
    prompt = f"Analyze the resume to understand the candidate's career path, and provide recommendations for improvement. Also, compare the resume with standard job descriptions for similar roles."
    response, _ = llm_model.chat(tokenizer, query=prompt, history=None)
    return response

# API Endpoints

@app.post("/generate_cover_letter")
async def generate_cover_letter(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No selected file")
    
    text = ""
    if file.content_type == 'application/pdf':
        try:
            reader = PyPDF2.PdfReader(file.file)
            for page in reader.pages:
                text += page.extract_text()
        except Exception as e:
            raise HTTPException(status_code=500, detail="Error processing PDF")
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type")
    
    analysis = analyze_resume_with_qwen(text)
    enhanced_objective = enhance_career_objective(text)  # Assuming objective is part of the text
    new_resume = generate_new_resume_with_qwen(text)
    detailed_analysis = advanced_analysis(text)
    
    response = {
        "analysis": analysis,
        "enhanced_objective": enhanced_objective,
        "new_resume": new_resume,
        "detailed_analysis": detailed_analysis
    }
    
    return response

if __name__ == "__main__":
    public_url = ngrok.connect(5000)
    print(f"Public URL: {public_url}")
    uvicorn.run(app, host="0.0.0.0", port=5000)
