import React, { useState } from 'react';
import jsPDF from 'jspdf';
import './Template3.css';

const Template3 = ({ formData }) => {
    const [pdfUrl, setPdfUrl] = useState('');

    const generatePDF = () => {
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4'
        });

        // Get the HTML content for the resume
        const content = document.getElementById('resume-template-3');

        pdf.html(content, {
            callback: (pdf) => {
                // Save the PDF to a Blob
                const pdfBlob = pdf.output('blob');
                // Create a URL for the Blob
                const pdfUrl = URL.createObjectURL(pdfBlob);
                setPdfUrl(pdfUrl);
                // Automatically download the PDF
                pdf.save('resume-template3.pdf');
            },
            margin: [20, 20, 20, 20], // Margin for the document
            autoPaging: 'text',       // Automatically add pages for long content
            html2canvas: { scale: 0.8 }, // Adjust scale for better fitting
            x: 20,                    // X position in the PDF
            y: 20                     // Y position in the PDF
        });
    };

    const copyPdfUrl = () => {
        navigator.clipboard.writeText(pdfUrl).then(() => {
            alert('PDF URL copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy PDF URL: ', err);
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
                                    <tr key={index} className={index % 2 === 0 ? 'row-even' : ''}>
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

    const safeJoin = (array) => {
        return Array.isArray(array) && array.length > 0 ? array.join(', ') : '';
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
                        { 'Programming Languages': safeJoin(formData.ProgrammingLanguages) },
                        { 'Web Technologies': safeJoin(formData.WebTechnologies) },
                        { 'Tools and Frameworks': safeJoin(formData.ToolsandFrameworks) },
                        { 'Databases': safeJoin(formData.Databases) },
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
        } else if (CareerLevel === 'Beginner') {
            return (
                <>
                    {formData.CareerObjective && (
                        <div className="section">
                            <div className="section-heading">Career Objective</div>
                            <p>{formData.CareerObjective}</p>
                        </div>
                    )}
                    {renderSection('Experience', formData.Experience)}
                    {renderSection('Projects', formData.Projects)}
                    {renderSection('Certifications', formData.Certifications)}
                    {renderSection('Languages', formData.Languages)}
                    {renderSection('Achievements', formData.Achievements)}
                    {renderSection('Leadership Qualities', formData.LeadershipQualities)}
                </>
            );
        } else if (CareerLevel === 'Mid level') {
            return (
                <>
                    {formData.CareerObjective && (
                        <div className="section">
                            <div className="section-heading">Career Objective</div>
                            <p>{formData.CareerObjective}</p>
                        </div>
                    )}
                    {renderSection('Experience', formData.Experience)}
                    {renderSection('Projects', formData.Projects)}
                    {renderSection('Certifications', formData.Certifications)}
                    {renderSection('Languages', formData.Languages)}
                    {renderSection('Achievements', formData.Achievements)}
                    {renderSection('Leadership Qualities', formData.LeadershipQualities)}
                </>
            );
        } else if (CareerLevel === 'Senior level') {
            return (
                <>
                    {formData.CareerObjective && (
                        <div className="section">
                            <div className="section-heading">Career Objective</div>
                            <p>{formData.CareerObjective}</p>
                        </div>
                    )}
                    {renderSection('Experience', formData.Experience)}
                    {renderSection('Projects', formData.Projects)}
                    {renderSection('Certifications', formData.Certifications)}
                    {renderSection('Languages', formData.Languages)}
                    {renderSection('Achievements', formData.Achievements)}
                    {renderSection('Leadership Qualities', formData.LeadershipQualities)}
                </>
            );
        } else {
            return (
                <p>Career Level not specified</p>
            );
        }
    };

    return (
        <div className="resume-container">
            <div id="resume-template-3">
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
            {pdfUrl && (
                <div>
                    <button className="pdf-download-button" onClick={copyPdfUrl}>Copy PDF URL</button>
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer">Open PDF in new tab</a>
                </div>
            )}
        </div>
    );
};

export default Template3;