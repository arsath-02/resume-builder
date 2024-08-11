import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Template2.css';

const Template2 = ({ resumeData }) => {
    // Destructuring resumeData with correct property names
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
        });
    };

    return (
        <div className="resume-container" ref={resumeRef}>
            <header className="header">
                <div className="contact-info">
                    <p className="name">{Name}</p>
                    <p className="details">{Email} | {phoneNumber} | {Location}</p>
                    <p className="details">GitHub: {GitHub} | LinkedIn: {LinkedIn}</p>
                </div>
            </header>

            <section className="section">
                <div className="section-heading">Career Objective</div>
                <p>{careerObjective}</p>
            </section>

            <section className="section">
                <div className="section-heading">Education</div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Institution</th>
                                <th>Year</th>
                                <th>Degree</th>
                                <th>Results</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Education.length > 0 ? Education.map((edu, index) => (
                                <tr key={index}>
                                    <td>{edu.Institution || 'N/A'}</td>
                                    <td>{edu.Year || 'N/A'}</td>
                                    <td>{edu.Degree || 'N/A'}</td>
                                    <td>{edu.Results || 'N/A'}</td>
                                </tr>
                            )) : <tr><td colSpan="4">No education details available.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="section">
                <div className="section-heading">Projects</div>
                <ul>
                    {Projects.length > 0 ? Projects.map((project, index) => (
                        <li key={index}>
                            <strong>{project["Project Name"] || 'N/A'}</strong>: {project.Description || 'N/A'}
                        </li>
                    )) : <li>No project details available.</li>}
                </ul>
            </section>

            <section className="section">
                <div className="section-heading">Technical Skills</div>
                <p>Programming Languages: {resumeData.ProgrammingLanguages || 'N/A'}</p>
                <p>Web Technologies: {resumeData.WebTechnologies || 'N/A'}</p>
                <p>Tools and Frameworks: {toolsAndFrameworks || 'N/A'}</p>
                <p>Databases: {resumeData.Databases || 'N/A'}</p>
            </section>

            <section className="section">
                <div className="section-heading">Interests</div>
                <p>Hobbies: {resumeData.Hobbies || 'N/A'}</p>
            </section>

            <section className="section">
                <div className="section-heading">Achievements</div>
                <ul>
                    {Achievements.length > 0 ? Achievements.map((ach, index) => (
                        <li key={index}>
                            {ach.Award} - {ach.Title} at {ach.Event}, {ach.Date}
                        </li>
                    )) : <li>No achievements available.</li>}
                </ul>
            </section>

            <button onClick={generatePDF}>Download PDF</button>
        </div>
    );
};

export default Template2;
