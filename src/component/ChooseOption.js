import React, { useState } from 'react';
import axios from 'axios';
import './ChooseOption.css';

const ChooseOption = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Choose Your Option</h2>
      <div className="options">
        <div className="option">
          <div className="icon">
            <i className="fas fa-file-alt"></i>
          </div>
          <h3>Upload Resume</h3>
          <p>Upload your existing resume to generate a cover letter based on its content.</p>
          <input type="file" onChange={handleFileChange} />
          <button className="btn" onClick={handleUpload}>Upload Resume</button>
        </div>
        <div className="option">
          <div className="icon">
            <i className="fas fa-pen"></i>
          </div>
          <h3>Build From Scratch</h3>
          <p>Create a cover letter from scratch by providing your details and preferences.</p>
          <button className="btn">Build From Scratch</button>
        </div>
      </div>
      {result && (
        <div className="result">
          <h3>Parsed Resume Data:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ChooseOption;
