import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChooseOption from './component/ChooseOption';
import ResumeForm from './component/ResumeForm';
import TemplateSelectionPage from './component/TemplateSelectionPage';
import ResumeBuilder from './component/ResumeBuilder';

import './App.css';

const App = () => {
  const [resumeData, setResumeData] = useState(null);

  const handleFileUpload = (data) => {
    setResumeData(data);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChooseOption onFileUpload={handleFileUpload} />} />
        <Route path="/resume" element={<ResumeForm resumeData={resumeData} />} />
        <Route path="/select-template" element={<TemplateSelectionPage resumeData={resumeData} />} />
        <Route path="/build/:templateId" element={<ResumeBuilder resumeData={resumeData} />} />
      </Routes>
    </Router>
  );
};

export default App;
