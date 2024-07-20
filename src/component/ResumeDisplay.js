// src/components/ResumeDisplay.js
import React from 'react';
import './ResumeDisplay.css';

const ResumeDisplay = ({ resumeData }) => {
  return (
    <div className="resume-container">
      <h1 className="resume-title">Resume Details</h1>
      <div className="resume-section">
        <h2>Personal Information</h2>
        <p><strong>Name:</strong> {resumeData.Name}</p>
        <p><strong>Email:</strong> {resumeData.Email}</p>
        <p><strong>Phone Number:</strong> {resumeData["Phone Number"]}</p>
        <p><strong>Location:</strong> {resumeData.Location}</p>
        <p><strong>GitHub:</strong> {resumeData.SocialMedia.GitHub}</p>
        <p><strong>LinkedIn:</strong> {resumeData.SocialMedia.LinkedIn}</p>
      </div>
      
      <div className="resume-section">
        <h2>Career Objective</h2>
        <p>{resumeData["Career Objective"] || "Not Provided"}</p>
      </div>
      
      <div className="resume-section">
        <h2>Education</h2>
        <ul>
          {resumeData.Education.map((edu, index) => (
            <li key={index}>
              <strong>Institution:</strong> {edu.Institution}<br />
              <strong>Degree:</strong> {edu.Degree}<br />
              <strong>Year:</strong> {edu.Year}<br />
              <strong>Results:</strong> {edu.Results}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="resume-section">
        <h2>Projects</h2>
        <ul>
          {resumeData.Projects.map((project, index) => (
            <li key={index}>
              <strong>Project Name:</strong> {project["Project Name"]}<br />
              <strong>Description:</strong> {project.Description}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="resume-section">
        <h2>Technical Skills</h2>
        <ul>
          <li><strong>Programming Languages:</strong> {resumeData["Technical Skills"].ProgrammingLanguages.join(', ')}</li>
          <li><strong>Web Technologies:</strong> {resumeData["Technical Skills"].WebTechnologies.join(', ')}</li>
          <li><strong>Tools and Frameworks:</strong> {resumeData["Technical Skills"].ToolsAndFrameworks.join(', ')}</li>
          <li><strong>Databases:</strong> {resumeData["Technical Skills"].Databases.join(', ')}</li>
        </ul>
      </div>
      
      <div className="resume-section">
        <h2>Interests</h2>
        <ul>
          {resumeData.Interests.Hobbies.map((hobby, index) => (
            <li key={index}>{hobby}</li>
          ))}
        </ul>
      </div>
      
      <div className="resume-section">
        <h2>Achievements</h2>
        <ul>
          {resumeData.Achievements.map((achievement, index) => (
            <li key={index}>
              <strong>Award:</strong> {achievement.Award}<br />
              <strong>Title:</strong> {achievement.Title}<br />
              <strong>Event:</strong> {achievement.Event}<br />
              <strong>Date:</strong> {achievement.Date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResumeDisplay;
