// src/App.js
import React, { useState } from 'react';
import ChooseOption from './component/ChooseOption';
import ResumeDisplay from './component/ResumeDisplay';
import './App.css';

const App = () => {
  const [resumeData, setResumeData] = useState(null);

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResumeData(data);
      } else {
        console.error('Error uploading file:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="App">
      <ChooseOption onFileUpload={handleFileUpload} />
      {resumeData && <ResumeDisplay resumeData={resumeData} />}
    </div>
  );
};

export default App;
