import React, { useState } from 'react';
import './studentattendance.css';

export default function MyClassComponent() {
  // State variables for class, section, and date
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // Dummy data for class options
  const classOptions = [ 'P.NC','L.K.G','U.K.G', 'I', 'II', 'III', 'IV','V','VI','VII','VIII','IX','X','XI','XII'];

  // Dummy data for section options
  const sectionOptions = ['A', 'B', 'C', 'D','E'];

  // Event handler for class selection
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  // Event handler for section selection
  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  // Event handler for date selection
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
   <div><h4> Student Attenence</h4>
   <div className="container">
      
      <div className="input-field">
        <label htmlFor="class">Select Class:</label>
        <select id="class" value={selectedClass} onChange={handleClassChange}>
          <option value="">Select a class</option>
          {classOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="input-field">
        <label htmlFor="section">Select Section:</label>
        <select
          id="section"
          value={selectedSection}
          onChange={handleSectionChange}
        >
          <option value="">Select a section</option>
          {sectionOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="input-field">
        <label htmlFor="date">Select Date:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
        />
     
      </div>
    </div><br />
    <button className='bt'>search</button>
    </div>
  );
}