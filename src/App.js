import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadPage from './components/UploadPage';
import DisplayPage from './components/DisplayPage';
import TemplateSelector from './components/TemplateSelector';
import ResumeBuilder from './components/ResumeBuilder';

function App() {
    const [resumeData, setResumeData] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<UploadPage setResumeData={setResumeData} />} />
                <Route path="/display" element={<DisplayPage resumeData={resumeData} />} />
                <Route path="/template-selector" element={<TemplateSelector resumeData={resumeData} />} />
                <Route path="/resume-builder/:templateId" element={<ResumeBuilder />} />
            </Routes>
        </Router>
    );
}

export default App;
