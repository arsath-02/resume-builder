import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DisplayPage.module.css'; // Import the enhanced CSS module

const DisplayPage = ({ resumeData }) => {
    const [formData, setFormData] = useState(() => ({
        Name: resumeData?.Name || '',
        Email: resumeData?.Email || '',
        PhoneNumber: resumeData?.PhoneNumber || '',
        GitHub: resumeData?.GitHub || '',
        LinkedIn: resumeData?.LinkedIn || '',
        CareerObjective: resumeData?.CareerObjective || '',
        Education: resumeData?.Education || [{ Institution: '', Year: '', Degree: '', Results: '' }],
        ProgrammingLanguages: Array.isArray(resumeData?.ProgrammingLanguages) ? resumeData.ProgrammingLanguages : resumeData?.ProgrammingLanguages ? [resumeData.ProgrammingLanguages] : [],
        WebTechnologies: Array.isArray(resumeData?.WebTechnologies) ? resumeData.WebTechnologies : resumeData?.WebTechnologies ? [resumeData.WebTechnologies] : [],
        ToolsandFrameworks: Array.isArray(resumeData?.ToolsandFrameworks) ? resumeData.ToolsandFrameworks : resumeData?.ToolsandFrameworks ? [resumeData.ToolsandFrameworks] : [],
        Databases: Array.isArray(resumeData?.Databases) ? resumeData.Databases : resumeData?.Databases ? [resumeData.Databases] : [],
        Experience: resumeData?.Experience || [{ Position: '', Company: '', Location: '', Dates: '', Description: '' }],
        Projects: resumeData?.Projects || [{ ProjectName: '', Description: '' }],
        Achievements: resumeData?.Achievements ? Object.values(resumeData.Achievements) : [],
        CareerLevel: resumeData?.CareerLevel || '',
        Certifications: resumeData?.Certifications || []
    }));

    const [newAchievement, setNewAchievement] = useState('');
    const [newProject, setNewProject] = useState({ ProjectName: '', Description: '' });
    const [newEducation, setNewEducation] = useState({ Institution: '', Year: '', Degree: '', Results: '' });
    const [newCertification, setNewCertification] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setFormData(prevData => ({
            ...prevData,
            ...resumeData,
            Achievements: resumeData?.Achievements ? Object.values(resumeData.Achievements) : [],
            ProgrammingLanguages: Array.isArray(resumeData?.ProgrammingLanguages) ? resumeData.ProgrammingLanguages : [resumeData?.ProgrammingLanguages],
            WebTechnologies: Array.isArray(resumeData?.WebTechnologies) ? resumeData.WebTechnologies : [resumeData?.WebTechnologies],
            ToolsandFrameworks: Array.isArray(resumeData?.ToolsandFrameworks) ? resumeData.ToolsandFrameworks : [resumeData?.ToolsandFrameworks],
            Databases: Array.isArray(resumeData?.Databases) ? resumeData.Databases : [resumeData?.Databases],
            Experience: resumeData?.Experience || [{ Position: '', Company: '', Location: '', Dates: '', Description: '' }],
            Projects: resumeData?.Projects || [{ ProjectName: '', Description: '' }],
            CareerLevel: resumeData?.CareerLevel || '',
            Certifications: resumeData?.Certifications || []
        }));
    }, [resumeData]);

    const handleInputChange = (e, key, section, index) => {
        const { value } = e.target;
        if (section) {
            const updatedArray = [...formData[section]];
            if (typeof updatedArray[index] === 'object') {
                updatedArray[index] = { ...updatedArray[index], [key]: value };
            } else {
                updatedArray[index] = value;
            }
            setFormData({ ...formData, [section]: updatedArray });
        } else {
            setFormData({ ...formData, [key]: value });
        }
    };

    const handleGenerateResume = () => {
        navigate('/template-selector', { state: { formData } });
    };

    const getDisplayValue = (field) => Array.isArray(field) ? field.join(', ') : field;

    const handleAddAchievement = () => {
        if (newAchievement.trim()) {
            setFormData(prevData => ({
                ...prevData,
                Achievements: [...prevData.Achievements, newAchievement]
            }));
            setNewAchievement('');
        }
    };

    const handleAddProject = () => {
        if (newProject.ProjectName.trim() && newProject.Description.trim()) {
            setFormData(prevData => ({
                ...prevData,
                Projects: [...prevData.Projects, newProject]
            }));
            setNewProject({ ProjectName: '', Description: '' });
        }
    };

    const handleAddEducation = () => {
        if (newEducation.Institution.trim() && newEducation.Year.trim() && newEducation.Degree.trim() && newEducation.Results.trim()) {
            setFormData(prevData => ({
                ...prevData,
                Education: [...prevData.Education, newEducation]
            }));
            setNewEducation({ Institution: '', Year: '', Degree: '', Results: '' });
        }
    };

    const handleAddCertification = () => {
        if (newCertification.trim()) {
            setFormData(prevData => ({
                ...prevData,
                Certifications: [...prevData.Certifications, newCertification]
            }));
            setNewCertification('');
        }
    };

    const handleRemoveEducation = (index) => {
        const updatedEducation = formData.Education.filter((_, i) => i !== index);
        setFormData({ ...formData, Education: updatedEducation });
    };

    const handleRemoveProject = (index) => {
        const updatedProjects = formData.Projects.filter((_, i) => i !== index);
        setFormData({ ...formData, Projects: updatedProjects });
    };

    const handleRemoveCertification = (index) => {
        const updatedCertifications = formData.Certifications.filter((_, i) => i !== index);
        setFormData({ ...formData, Certifications: updatedCertifications });
    };

    const handleRemoveAchievement = (index) => {
        const updatedAchievements = formData.Achievements.filter((_, i) => i !== index);
        setFormData({ ...formData, Achievements: updatedAchievements });
    };

    const handleCareerLevelChange = (e) => {
        setFormData({ ...formData, CareerLevel: e.target.value });
    };

    return (
        <div className={styles.displayPageContainer}>
            <h1 className={styles.displayPageHeader}>Resume Details</h1>
            
            {/* Personal Information */}
            <section className={styles.formSection}>
                <h2 className={styles.displayPageSubHeader}>Personal Information</h2>
                {['Name', 'Email', 'PhoneNumber', 'GitHub', 'LinkedIn'].map(field => (
                    <p className={styles.displayPageParagraph} key={field}>
                        <strong>{field}:</strong>
                        <input
                            type={field === 'Email' ? 'email' : 'text'}
                            className={styles.displayPageInput}
                            value={formData[field]}
                            onChange={(e) => handleInputChange(e, field)}
                            placeholder={`Enter your ${field.toLowerCase()}`}
                        />
                    </p>
                ))}
            </section>
            
            {/* Career Objective */}
            <section className={styles.formSection}>
                <h2 className={styles.displayPageSubHeader}>Career Objective</h2>
                <textarea
                    className={styles.displayPageTextarea}
                    value={formData.CareerObjective}
                    onChange={(e) => handleInputChange(e, 'CareerObjective')}
                    placeholder="Write your career objective"
                />
            </section>

            {/* Career Level */}
            <section className={styles.formSection}>
                <h2 className={styles.displayPageSubHeader}>Career Level</h2>
                <input
                    type="text"
                    className={styles.displayPageInput}
                    value={formData.CareerLevel}
                    onChange={handleCareerLevelChange}
                    placeholder="Enter your career level (e.g., Fresher, Beginner, Mid level, Senior level)"
                />
            </section>

            {/* Education Section */}
            <section className={styles.formSection}>
                <h2 className={styles.displayPageSubHeader}>Education</h2>

                {/* Existing Education Entries */}
                {formData.Education.map((edu, index) => (
                    <div key={index} className={styles.dynamicSection}>
                        {['Institution', 'Year', 'Degree', 'Results'].map(field => (
                            <p className={styles.displayPageParagraph} key={field}>
                                <strong>{field}:</strong>
                                <input
                                    type="text"
                                    className={styles.displayPageInput}
                                    value={edu[field]}
                                    onChange={(e) => handleInputChange(e, field, 'Education', index)}
                                    placeholder={`Enter ${field.toLowerCase()}`}
                                />
                            </p>
                        ))}
                        <button className={styles.displayPageButton} onClick={() => handleRemoveEducation(index)}>Remove Education</button>
                    </div>
                ))}

                {/* Add New Education Section */}
                <div className={styles.addEducationSection}>
                    {['Institution', 'Year', 'Degree', 'Results'].map(field => (
                        <input
                            key={field}
                            type="text"
                            placeholder={field}
                            value={newEducation[field]}
                            onChange={(e) => setNewEducation({ ...newEducation, [field]: e.target.value })}
                            className={styles.displayPageInput}
                        />
                    ))}
                    <button className={styles.displayPageButton} onClick={handleAddEducation}>Add Education</button>
                </div>
            </section>

            {/* Projects Section */}
            <section className={styles.formSection}>
                <h2 className={styles.displayPageSubHeader}>Projects</h2>

                {/* Existing Projects */}
                {formData.Projects.map((project, index) => (
                    <div key={index} className={styles.dynamicSection}>
                        {['ProjectName', 'Description'].map(field => (
                            <p className={styles.displayPageParagraph} key={field}>
                                <strong>{field.replace(/([A-Z])/g, ' $1')}:</strong>
                                {field === 'Description' ? (
                                    <textarea
                                        className={styles.displayPageTextarea}
                                        value={project[field]}
                                        onChange={(e) => handleInputChange(e, field, 'Projects', index)}
                                        placeholder={`Enter project ${field.toLowerCase()}`}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        className={styles.displayPageInput}
                                        value={project[field]}
                                        onChange={(e) => handleInputChange(e, field, 'Projects', index)}
                                        placeholder={`Enter project ${field.toLowerCase()}`}
                                    />
                                )}
                            </p>
                        ))}
                        <button className={styles.displayPageButton} onClick={() => handleRemoveProject(index)}>Remove Project</button>
                    </div>
                ))}

                {/* Add New Project Section */}
                <div className={styles.addProjectSection}>
                    {['ProjectName', 'Description'].map(field => (
                        <p key={field} className={styles.displayPageParagraph}>
                            <strong>{field.replace(/([A-Z])/g, ' $1')}:</strong>
                            {field === 'Description' ? (
                                <textarea
                                    placeholder={field.replace(/([A-Z])/g, ' $1')}
                                    value={newProject[field]}
                                    onChange={(e) => setNewProject({ ...newProject, [field]: e.target.value })}
                                    className={styles.displayPageTextarea}
                                />
                            ) : (
                                <input
                                    type="text"
                                    placeholder={field.replace(/([A-Z])/g, ' $1')}
                                    value={newProject[field]}
                                    onChange={(e) => setNewProject({ ...newProject, [field]: e.target.value })}
                                    className={styles.displayPageInput}
                                />
                            )}
                        </p>
                    ))}
                    <button className={styles.displayPageButton} onClick={handleAddProject}>Add Project</button>
                </div>
            </section>

            {/* Achievements Section */}
            <section className={styles.formSection}>
                <h2 className={styles.displayPageSubHeader}>Achievements</h2>
                <ul>
                    {formData.Achievements.length ? (
                        formData.Achievements.map((achievement, index) => (
                            <li key={index}>
                                {achievement}
                                <button className={styles.removeButton} onClick={() => handleRemoveAchievement(index)}>Remove</button>
                            </li>
                        ))
                    ) : (
                        <p>No achievements to display.</p>
                    )}
                </ul>
                <div className={styles.addAchievementSection}>
                    <textarea
                        placeholder="Enter your achievement"
                        value={newAchievement}
                        onChange={(e) => setNewAchievement(e.target.value)}
                        className={styles.displayPageTextarea}
                    />
                    <button className={styles.displayPageButton} onClick={handleAddAchievement}>Add Achievement</button>
                </div>
            </section>

            {/* Certifications Section */}
            <section className={styles.formSection}>
                <h2 className={styles.displayPageSubHeader}>Certifications</h2>
                <ul>
                    {formData.Certifications.length ? (
                        formData.Certifications.map((certification, index) => (
                            <li key={index}>
                                {certification}
                                <button className={styles.removeButton} onClick={() => handleRemoveCertification(index)}>Remove</button>
                            </li>
                        ))
                    ) : (
                        <p>No certifications to display.</p>
                    )}
                </ul>
                <div className={styles.addCertificationSection}>
                    <input
                        type="text"
                        placeholder="Enter certification"
                        value={newCertification}
                        onChange={(e) => setNewCertification(e.target.value)}
                        className={styles.displayPageInput}
                    />
                    <button className={styles.displayPageButton} onClick={handleAddCertification}>Add Certification</button>
                </div>
            </section>

            {/* Buttons */}
            <section className={styles.buttonSection}>
                <button className={styles.displayPageButton} onClick={handleGenerateResume}>Generate Resume</button>
            </section>
        </div>
    );
};

export default DisplayPage;
