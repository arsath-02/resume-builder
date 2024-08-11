import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Template4.css';

const Template4 = ({ resumeData }) => {
    const {
        Name = 'N/A',
        Email = 'N/A',
        "Phone Number": phoneNumber = 'N/A',
        Location = 'N/A',
        "Social Media": {
            GitHub = 'N/A',
            LinkedIn = 'N/A'
        } = {},
        CareerObjective: careerObjective = 'N/A',
        Education = [],
        Projects = [],
        TechnicalSkills: {
            ProgrammingLanguages =[],
            WebTechnologies = [],
            "Tools and Frameworks": toolsAndFrameworks = [],
            Databases = []
        } = {},
        Interests: {
            Hobbies = []
        } = {},
        Achievements = []
    } = resumeData;

    const resumeRef = useRef();

    const generatePDF = () => {
        const downloadButton = document.querySelector('.pdf-download-button');
        downloadButton.style.display = 'none'; // Hide the download button

        html2canvas(resumeRef.current, {
            scale: 2,
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

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('resume.pdf');

            downloadButton.style.display = 'block'; // Show the download button again
        });
    };

    return (
        <div className="template4" ref={resumeRef}>
            <header>
                <h1>{resumeData.Name}</h1>
                <p>{resumeData.Email} | {resumeData.PhoneNumber} | {resumeData.Location}</p>
                <p>{resumeData.Github} | {resumeData.Linkedin}</p>
            </header>

            <section>
                <h2>Career Objective</h2>
                <p>{resumeData.CareerObjective}</p>
            </section>

            <section>
                <h2>Education</h2>
                <ul>
                    {resumeData.Education.length > 0 ? resumeData.Education.map((edu, index) => (
                        <li key={index}>
                            {edu.institution}, {edu.degree} ({edu.year}) - CGPA: {edu.cgpa || 'N/A'}
                        </li>
                    )) : <li>No education details available.</li>}
                </ul>
            </section>

            <section>
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

            <section>
                <h2>Technical Skills</h2>
                <p> {resumeData.ProgrammingLanguages || 'N/A'}</p>
                <p>{resumeData.WebTechnologies || 'N/A'}</p>
                <p>{resumeData.ToolsAndFrameworks || 'N/A'}</p>
                <p>{resumeData.Databases || 'N/A'}</p>
            </section>

            <section>
                <h2>Interests</h2>
                <p>Soft Skills: {resumeData.SoftSkills || 'N/A'}</p>
                <p>Field of Interest: {resumeData.FieldOfInterest || 'N/A'}</p>
                <p>Hobbies: {resumeData.Hobbies || 'N/A'}</p>
            </section>

            <section>
                <h2>Achievements</h2>
                <ul>
                    {resumeData.Achievements.length > 0 ? resumeData.Achievements.map((ach, index) => (
                        <li key={index}>
                            {ach.award} - {ach.title} ({ach.event}), {ach.date}
                        </li>
                    )) : <li>No achievements available.</li>}
                </ul>
            </section>

          {/* <section>
                <h2>Positions of Responsibility</h2>
                <ul>
                    {resumeData.PositionsOfResponsibility.length > 0 ? resumeData.PositionsOfResponsibility.map((pos, index) => (
                        <li key={index}>
                            {pos.position} at {pos.organization} ({pos.dates}) <br />
                            Responsibilities: {pos.responsibilities}
                        </li>
                    )) : <li>No positions of responsibility available.</li>}
                </ul>
            </section>*/}

            <button className="pdf-download-button" onClick={generatePDF}>Download PDF</button>
        </div>
    );
};

export default Template4;
