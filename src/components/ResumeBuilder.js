import React from 'react';
import { useLocation } from 'react-router-dom';
import Template1 from './Template1';
import Template2 from './Template2';
import './ResumeBuilder.css'; // Import the CSS file
import Template3 from './Template3';
import Template4 from './Template4';

const ResumeBuilder = () => {
    const location = useLocation();
    const { formData } = location.state || {};
    const templateId = location.pathname.split('/').pop();

    return (
        <div className="resume-builder-container">
            <h1 className="resume-builder-title">Resume Builder</h1>
            {templateId === 'template1' && <Template1 formData={formData} />}
            {templateId === 'template2' && <Template2 formData={formData} />}
            {templateId === 'template3' && <Template3 formData={formData} />}
            {templateId === 'template4' && <Template4 formData={formData} />}
        </div>
    );
};

export default ResumeBuilder;
