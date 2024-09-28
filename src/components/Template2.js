import React from 'react';
import jsPDF from 'jspdf';
import './Template2.css';

const Template2 = ({ formData }) => {
    const generatePDF = () => {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4'
        });

        const content = document.getElementById('resume-template-2');

        doc.html(content, {
            callback: function (pdf) {
                pdf.save('resume.pdf');
            },
            margin: [20, 20, 20, 20], // Margin for the document
            autoPaging: 'text',
            html2canvas: { scale: 0.6 }, // Adjust scaling for better fitting
            x: 20,
            y: 20
        });
    };

    const renderSection = (title, content) => {
        if (!content || content.length === 0) return null;

        if (title === 'Education') {
            return (
                <div className="section">
                    <div className="section-heading">{title}</div>
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
                                {content.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.Institution}</td>
                                        <td>{item.Year}</td>
                                        <td>{item.Degree}</td>
                                        <td>{item.Results}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        } else if (['Certifications', 'Languages', 'Hobbies', 'Areas of Interest', 'Achievements', 'Leadership Qualities'].includes(title)) {
            return (
                <div className="section">
                    <div className="section-heading">{title}</div>
                    <ul>
                        {content.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return (
                <div className="section">
                    <div className="section-heading">{title}</div>
                    {content.map((item, index) => (
                        <div key={index}>
                            {Object.entries(item).map(([key, value]) => (
                                typeof value === 'object' ? (
                                    Object.entries(value).map(([nestedKey, nestedValue]) => (
                                        nestedValue ? <p key={nestedKey}><strong>{nestedKey}:</strong> {nestedValue}</p> : null
                                    ))
                                ) : value ? (
                                    <p key={key}><strong>{key}:</strong> {value}</p>
                                ) : null
                            ))}
                        </div>
                    ))}
                </div>
            );
        }
    };

    const renderResume = () => {
        const { CareerLevel } = formData;

        if (CareerLevel === 'Fresher') {
            return (
                <>
                    {formData.CareerObjective && (
                        <div className="section">
                            <div className="section-heading">Career Objective</div>
                            <p>{formData.CareerObjective}</p>
                        </div>
                    )}
                    {renderSection('Education', formData.Education)}
                    {renderSection('Skills', [
                        { 'Programming Languages': formData.ProgrammingLanguages.join(', ') },
                        { 'Web Technologies': formData.WebTechnologies.join(', ') },
                        { 'Tools and Frameworks': formData.ToolsandFrameworks.join(', ') },
                        { 'Databases': formData.Databases.join(', ') }
                    ])}
                    {renderSection('Experience', formData.Experience)}
                    {renderSection('Projects', formData.Projects)}
                    {renderSection('Certifications', formData.Certifications)}
                    {renderSection('Languages', formData.Languages)}
                    {renderSection('Hobbies', formData.Hobbies)}
                    {renderSection('Achievements', formData.Achievements)}
                    {renderSection('Areas of Interest', formData.AreasOfInterest)}
                    {renderSection('Leadership Qualities', formData.LeadershipQualities)}
                </>
            );
        }
        return <p>Career Level not specified</p>;
    };

    return (
        <div className="resume-container">
            <div id="resume-template-2">
                <div className="header">
                    <div className="contact-info">
                        <p className="name">{formData.Name || ''}</p>
                        {formData.CareerLevel && <p className="details">{formData.CareerLevel}</p>}
                        {formData.Email && <p>Email: <a href={`mailto:${formData.Email}`}>{formData.Email}</a></p>}
                        {formData.PhoneNumber && <p>Phone: {formData.PhoneNumber}</p>}
                        {formData.GitHub && <p>GitHub: <a href={formData.GitHub} target="_blank" rel="noopener noreferrer">{formData.GitHub}</a></p>}
                        {formData.LinkedIn && <p>LinkedIn: <a href={formData.LinkedIn} target="_blank" rel="noopener noreferrer">{formData.LinkedIn}</a></p>}
                    </div>
                </div>
                <div className="resume-divider"></div>
                {renderResume()}
            </div>
            <button className="pdf-download-button" onClick={generatePDF}>Download as PDF</button>
        </div>
    );
};

export default Template2;
