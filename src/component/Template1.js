import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Template1.css';

const Template1 = ({ resumeData }) => {
    const {
        name = '',
        email = '',
        phoneNumber = '',
        location = '',
        github = '',
        linkedin = '',
        careerObjective = '',
        education = [],
        projects = [],
        technicalSkills = {
            programmingLanguages: '',
            webTechnologies: '',
            toolsAndFrameworks: '',
            databases: ''
        },
        interests = {
            softSkills: '',
            fieldOfInterest: '',
            hobbies: ''
        },
        achievements = [],
        positionsOfResponsibility = []
    } = resumeData;

    const resumeRef = useRef();
    console.log(resumeData);
    const generatePDF = () => {
        const downloadButton = document.querySelector('.pdf-download-button');
        downloadButton.style.display = 'none'; // Hide the download button

        html2canvas(resumeRef.current, {
            scale: 2, // Increase scale for better quality
            useCORS: true,
            windowWidth: resumeRef.current.scrollWidth,
            windowHeight: resumeRef.current.scrollHeight
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            // Center the image on the PDF page
            const xOffset = (pdfWidth - pdfWidth) / 2;
            const yOffset = (pdf.internal.pageSize.height - pdfHeight) / 2;

            pdf.addImage(imgData, 'PNG', xOffset, yOffset, pdfWidth, pdfHeight);
            pdf.save('resume.pdf');

            downloadButton.style.display = 'block'; // Show the download button again
        });
    };

    return (
        <div className="resume-container" ref={resumeRef}>
            <header className="resume-header">
                <h1>{resumeData.Name}</h1>
                <p className="contact-info">{resumeData.Email} | {resumeData.PhoneNumber} | {resumeData.Location}</p>
                <p className="contact-info">{github} | {linkedin}</p>
            </header>

            <div className="resume-divider"></div>

            <section className="current-position">
                <h2>Career Objective</h2>
                <p>{resumeData.CareerObjective}</p>
            </section>

            <section className="education-section">
                <h2>Education</h2>
                <ul>
                    {resumeData.Education.length > 0 ? resumeData.Education.map((edu, index) => (
                        <li key={index}>
                            {edu.institution}, {edu.degree} ({edu.year}) - CGPA: {edu.cgpa || 'N/A'}
                        </li>
                    )) : <li>No education details available.</li>}
                </ul>
            </section>

            <section className="research-section">
                <h2>Projects</h2>
                <ul>
                    {resumeData.Projects.length > 0 ? resumeData.Projects.map((project, index) => (
                        <li key={index}>
                            <strong>{project.projectName}</strong>: {project.description} <br />
                            Technologies: {project.technologies ? project.technologies.split(',').join(', ') : 'N/A'} <br />
                            Functionality: {project.functionality || 'N/A'}
                        </li>
                    )) : <li>No project details available.</li>}
                </ul>
            </section>

            <section className="skills-section">
                <h2>Technical Skills</h2>
                <p>Programming Languages: {resumeData.ProgrammingLanguages || 'N/A'}</p>
                <p>Web Technologies: {resumeData.WebTechnologies || 'N/A'}</p>
                <p>Tools and Frameworks: {resumeData.ToolsAndFrameworks || 'N/A'}</p>
                <p>Databases: {resumeData.Databases || 'N/A'}</p>
            </section>

            <section className="interests-section">
                <h2>Interests</h2>
                <p>Soft Skills: {resumeData.SoftSkills || 'N/A'}</p>
                <p>Field of Interest: {resumeData.FieldOfInterest || 'N/A'}</p>
                <p>Hobbies: {resumeData.Hobbies || 'N/A'}</p>
            </section>

            <section className="achievements-section">
                <h2>Achievements</h2>
                <ul>
                    {resumeData.Achievements.length > 0 ? resumeData.Achievements.map((ach, index) => (
                        <li key={index}>
                            {ach.award} - {ach.title} ({ach.event}), {ach.date}
                        </li>
                    )) : <li>No achievements available.</li>}
                </ul>
            </section>

            
            <button className="pdf-download-button" onClick={generatePDF}>Download PDF</button>
        </div>
    );
};

export default Template1;
