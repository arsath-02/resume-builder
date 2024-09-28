import React from 'react';
import jsPDF from 'jspdf';
import './Template1.css';

const Template1 = ({ formData }) => {
    const generatePDF = () => {
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4'
        });

        // Get the HTML content for the resume
        const content = document.getElementById('resume-template-1');
        
        // Add content to the PDF using the html method of jsPDF
        pdf.html(content, {
            callback: (pdf) => {
                pdf.save('resume.pdf');
            },
            margin: [20, 20, 20, 20], // Margin for the document
            autoPaging: true,         // Auto page handling for long content
            html2canvas: { scale: 0.6 }, // Reduces size to fit better in PDF
            x: 20,                    // X position
            y: 20                     // Y position
        });
    };

    return (
        <div>
            <div id="resume-template-1" className="resume-container">
                <header className="resume-header">
                    <div className="name-section">
                        <h1>{formData.Name}</h1>
                        <div className="links-section">
                            {formData.LinkedIn && <a href={formData.LinkedIn}>LinkedIn</a>}
                            {formData.GitHub && <a href={formData.GitHub}>GitHub</a>}
                        </div>
                    </div>
                    <div className="contact-info">
                        <p>{formData.Location}</p>
                        <p>Email: <a href={`mailto:${formData.Email}`}>{formData.Email}</a></p>
                        <p>Phone: {formData.PhoneNumber}</p>
                    </div>
                </header>

                <section className="career-objective-section">
                    <h2 className="subtopic-header">FULL STACK DEVELOPER</h2>
                    <div className="subtopic-divider"></div>
                    <p>{formData.CareerObjective}</p>
                </section>

                <section className="technical-skills-section">
                    <h2 className="subtopic-header">TECHNICAL SKILLS</h2>
                    <div className="subtopic-divider"></div>
                    <ul>
                        <li><strong>Programming Languages: </strong>{formData.ProgrammingLanguages.join(', ')}</li>
                        <li><strong>Web Technologies: </strong>{formData.WebTechnologies.join(', ')}</li>
                        <li><strong>Tools and Frameworks: </strong>{formData.ToolsandFrameworks.join(', ')}</li>
                        <li><strong>Databases: </strong>{formData.Databases.join(', ')}</li>
                    </ul>
                </section>

                <section className="experience-section">
                    <h2 className="subtopic-header">EXPERIENCE</h2>
                    <div className="subtopic-divider"></div>
                    {formData.Experience.map((job, index) => (
                        <div key={index} className="job">
                            <h3>{job.Position}</h3>
                            <p>{job.Company} | {job.Location}</p>
                            <p>{job.Dates}</p>
                            <p>{job.Description}</p>
                        </div>
                    ))}
                </section>

                <section className="education-section">
                    <h2 className="subtopic-header">EDUCATION</h2>
                    <div className="subtopic-divider"></div>
                    {formData.Education.map((edu, index) => (
                        <div key={index} className="education-item">
                            <h3>{edu.Institution}</h3>
                            <p>{edu.Degree} | {edu.Year}</p>
                        </div>
                    ))}
                </section>

                <section className="projects-section">
                    <h2 className="subtopic-header">PROJECTS</h2>
                    <div className="subtopic-divider"></div>
                    {formData.Projects.map((project, index) => (
                        <div key={index} className="project-item">
                            <h3>{project.ProjectName}</h3>
                            <p>{project.Description}</p>
                        </div>
                    ))}
                </section>

                <section className="certifications-section">
                    <h2 className="subtopic-header">CERTIFICATIONS</h2>
                    <div className="subtopic-divider"></div>
                    <ul>
                        {formData.Certifications.map((cert, index) => (
                            <li key={index}>{cert}</li>
                        ))}
                    </ul>
                </section>
            </div>

            <button className="pdf-download-button" onClick={generatePDF}>Download as PDF</button>
        </div>
    );
};

export default Template1;
