import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Template1 from './Template1';
import Template2 from './Template2';
import Template3 from './Template3';
import Template4 from './Template4';

const ResumeBuilder = () => {
    const { templateId } = useParams();
    const location = useLocation();
    const formData = location.state?.formData || {};

    console.log("Form Data:", formData);  

    const renderTemplate = () => {
        switch (templateId) {
            case '1':
                return <Template1 resumeData={formData} />;
            case '2':
                return <Template2 resumeData={formData} />;
            case '3':
                return <Template3 resumeData={formData} />;
            case '4':
                return <Template4 resumeData={formData} />;
            default:
                return <p>Invalid template selected.</p>;
        }
    };

    return (
        <div>
            <center>
                <h1>Resume Builder - Template {templateId}</h1>
            </center>
            {formData ? renderTemplate() : <p>No resume data available.</p>}
        </div>
    );
};

export default ResumeBuilder;
