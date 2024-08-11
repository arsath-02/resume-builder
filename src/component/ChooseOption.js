import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ChooseOption.css';

const ChooseOption = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

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
      onFileUpload(response.data);
      setFile(null); // Clear the file input after successful upload
      navigate('/resume'); // Navigate to the resume form page
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  const handleBuildFromScratch = () => {
    navigate('/resume'); // Navigate to the form page
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
          <button className="btn" onClick={handleUpload} disabled={!file}>Upload Resume</button>
        </div>
        <div className="option">
          <div className="icon">
            <i className="fas fa-pen"></i>
          </div>
          <h3>Build From Scratch</h3>
          <p>Create a cover letter from scratch by providing your details and preferences.</p>
          <button className="btn" onClick={handleBuildFromScratch}>Build From Scratch</button>
        </div>
      </div>
    </div>
  );
};

export default ChooseOption;
