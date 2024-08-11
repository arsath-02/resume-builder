import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResumeForm.css';

const ResumeForm = ({ resumeData }) => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    PhoneNumber: "",
    Location: "",
    GitHub: "",
    LinkedIn: "",
    CareerObjective: "",
    Education: [],
    Projects: [],
    ProgrammingLanguages: [],
    WebTechnologies: [],
    ToolsAndFrameworks: [],
    Databases: [],
    Hobbies: [],
    Achievements: []
  });

  useEffect(() => {
    if (resumeData) {
      setFormData({
        Name: resumeData.Name || "",
        Email: resumeData.Email || "",
        PhoneNumber: resumeData["Phone Number"] || "",
        Location: resumeData.Location || "",
        GitHub: resumeData.SocialMedia?.GitHub || "",
        LinkedIn: resumeData.SocialMedia?.LinkedIn || "",
        CareerObjective: resumeData["Career Objective"] || "",
        Education: resumeData.Education || [],
        Projects: resumeData.Projects || [],
        ProgrammingLanguages: Array.isArray(resumeData["Technical Skills"]?.["Programming Languages"]) ? resumeData["Technical Skills"]["Programming Languages"] : [],
        WebTechnologies: Array.isArray(resumeData["Technical Skills"]?.["Web Technologies"]) ? resumeData["Technical Skills"]["Web Technologies"] : [],
        ToolsAndFrameworks: Array.isArray(resumeData["Technical Skills"]?.["Tools and Frameworks"]) ? resumeData["Technical Skills"]["Tools and Frameworks"] : [],
        Databases: Array.isArray(resumeData["Technical Skills"]?.Databases) ? resumeData["Technical Skills"].Databases : [],
        Hobbies: Array.isArray(resumeData.Interests?.Hobbies) ? resumeData.Interests.Hobbies : [],
        Achievements: resumeData.Achievements || []
      });
    }
  }, [resumeData]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducation = [...formData.Education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [name]: value
    };
    setFormData((prevData) => ({
      ...prevData,
      Education: updatedEducation
    }));
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjects = [...formData.Projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [name]: value
    };
    setFormData((prevData) => ({
      ...prevData,
      Projects: updatedProjects
    }));
  };

  const handleAchievementChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAchievements = [...formData.Achievements];
    updatedAchievements[index] = {
      ...updatedAchievements[index],
      [name]: value
    };
    setFormData((prevData) => ({
      ...prevData,
      Achievements: updatedAchievements
    }));
  };

  const addEducation = () => {
    setFormData((prevData) => ({
      ...prevData,
      Education: [...prevData.Education, { Institution: "", Year: "", Degree: "", Results: "" }]
    }));
  };

  const addProject = () => {
    setFormData((prevData) => ({
      ...prevData,
      Projects: [...prevData.Projects, { "Project Name": "", Description: "" }]
    }));
  };

  const addAchievement = () => {
    setFormData((prevData) => ({
      ...prevData,
      Achievements: [...prevData.Achievements, { Award: "", Title: "", Event: "", Date: "" }]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/select-template', { state: { formData } }); // Navigate to TemplateSelectionPage with formData
  };

  return (
    
    <form className="resume-form" onSubmit={handleSubmit}>
      <h1>User Information</h1>
      <div className="form-group">
        <label>Name</label>
        <input type="text" name="Name" value={formData.Name || ""} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="Email" value={formData.Email || ""} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Phone Number</label>
        <input type="text" name="PhoneNumber" value={formData.PhoneNumber || ""} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Location</label>
        <input type="text" name="Location" value={formData.Location || ""} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>GitHub</label>
        <input type="text" name="GitHub" value={formData.GitHub || ""} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>LinkedIn</label>
        <input type="text" name="LinkedIn" value={formData.LinkedIn || ""} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Career Objective</label>
        <textarea name="CareerObjective" value={formData.CareerObjective || ""} onChange={handleChange}></textarea>
      </div>
      {formData.Education.map((edu, index) => (
        <div key={index} className="form-group">
          <label>Education {index + 1}</label>
          <input
            type="text"
            name="Institution"
            value={edu.Institution || ""}
            onChange={(e) => handleEducationChange(index, e)}
          />
          <input
            type="text"
            name="Year"
            value={edu.Year || ""}
            onChange={(e) => handleEducationChange(index, e)}
          />
          <input
            type="text"
            name="Degree"
            value={edu.Degree || ""}
            onChange={(e) => handleEducationChange(index, e)}
          />
          <input
            type="text"
            name="Results"
            value={edu.Results || ""}
            onChange={(e) => handleEducationChange(index, e)}
          />
        </div>
      ))}
      <button type="button" onClick={addEducation}>Add Education</button>
      {formData.Projects.map((project, index) => (
        <div key={index} className="form-group">
          <label>Project {index + 1}</label>
          <input
            type="text"
            name="Project Name"
            value={project["Project Name"] || ""}
            onChange={(e) => handleProjectChange(index, e)}
          />
          <textarea
            name="Description"
            value={project.Description || ""}
            onChange={(e) => handleProjectChange(index, e)}
          ></textarea>
        </div>
      ))}
      <button type="button" onClick={addProject}>Add Project</button>
      <div className="form-group">
        <label>Programming Languages</label>
        <input type="text" name="ProgrammingLanguages" value={formData.ProgrammingLanguages || ""} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Web Technologies</label>
        <input type="text" name="WebTechnologies" value={formData.WebTechnologies || ""} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Tools and Frameworks</label>
        <input type="text" name="ToolsAndFrameworks" value={formData.ToolsAndFrameworks || ""} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Databases</label>
        <input type="text" name="Databases" value={formData.Databases || ""} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Hobbies</label>
        <input type="text" name="Hobbies" value={formData.Hobbies || ""} onChange={handleChange} />
      </div>
      {formData.Achievements.map((achievement, index) => (
        <div key={index} className="form-group">
          <label>Achievement {index + 1}</label>
          <input
            type="text"
            name="Award"
            value={achievement.Award || ""}
            onChange={(e) => handleAchievementChange(index, e)}
          />
          <input
            type="text"
            name="Title"
            value={achievement.Title || ""}
            onChange={(e) => handleAchievementChange(index, e)}
          />
          <input
            type="text"
            name="Event"
            value={achievement.Event || ""}
            onChange={(e) => handleAchievementChange(index, e)}
          />
          <input
            type="text"
            name="Date"
            value={achievement.Date || ""}
            onChange={(e) => handleAchievementChange(index, e)}
          />
        </div>
      ))}
      <button type="button" onClick={addAchievement}>Add Achievement</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ResumeForm;
