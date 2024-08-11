import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './TemplateSelectionPage.css';

// Import template images
import template1Img from './images/template1.jpeg';
import template2Img from './images/template2.jpeg';
import template3Img from './images/template3.jpeg';
import template4Img from './images/template4.jpeg';

const TemplateSelectionPage = () => {
    const location = useLocation();
    const formData = location.state?.formData;// Ensure formData exists
    console.log("Form Data:", formData);
    return (
        <div className="template-selection-page">
            <h1>Select a Resume Template</h1>
            <div className="template-options">
                <div className="template-option">
                    <Link to="/build/1" state={{ formData }}>
                        <img src={template1Img} alt="Template 1" />
                        <p>Template 1</p>
                    </Link>
                </div>
                <div className="template-option">
                    <Link to="/build/2" state={{ formData }}>
                        <img src={template2Img} alt="Template 2" />
                        <p>Template 2</p>
                    </Link>
                </div>
                <div className="template-option">
                    <Link to="/build/3" state={{ formData }}>
                        <img src={template3Img} alt="Template 3" />
                        <p>Template 3</p>
                    </Link>
                </div>
                <div className="template-option">
                    <Link to="/build/4" state={{ formData }}>
                        <img src={template4Img} alt="Template 4" />
                        <p>Template 4</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TemplateSelectionPage;
