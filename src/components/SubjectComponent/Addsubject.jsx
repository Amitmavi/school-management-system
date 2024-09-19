import React, { useState } from 'react';
import { addDoc, collection, getFirestore } from 'firebase/firestore'; // Import firestore functions
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddSubject() { // Renamed component to follow convention (camelCase)
  const [subjectName, setSubjectName] = useState('');
  const [subjectType, setSubjectType] = useState('');
  const [subjectCode, setSubjectCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (!subjectName || !subjectType || !subjectCode) {
      toast.error('Please fill in all fields');
      return;
    }

    const db = getFirestore();
    const subjectsCollection = collection(db, 'subjects');  
    try {
      // Add document to Firestore
      await addDoc(subjectsCollection, {
        subjectName: subjectName,
        subjectCode: subjectCode,
        subjectType: subjectType
      });

      // Clear input fields after successful submission
      setSubjectName('');
      setSubjectType('');
      setSubjectCode('');

      toast.success('Data saved successfully!');
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('Error saving data.');
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div className="app1" style={{ flex: 1 }}>
        <h1>Add Subject</h1>
        <label htmlFor="subjectType" style={{ marginBottom: '10px' }}>Subject Type</label>
        <br />
        <select
          id="subjectType"
          value={subjectType}
          onChange={(e) => setSubjectType(e.target.value)}
          style={{ width: '84%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
        >
          <option value="">Select Subject Type</option> {/* Empty option to prompt selection */}
          <option value="Theory">Theory</option>
          <option value="Practical">Practical</option>
        </select>
        
        {/* Used consistent naming conventions for labels and inputs */}
        <div className="form-field">
          <label htmlFor="subjectName">Subject Name</label>
          <input
            type="text"
            id="subjectName"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
          />
        </div>

        <div className="form-field">
          <label htmlFor="subjectCode">Subject Code</label>
          <input
            type="text"
            id="subjectCode"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '8px', boxSizing: 'border-box' }}
          />
        </div>
        
        <button className="button" style={{ width: '120px', height: '40px' }} onClick={handleSubmit}>ADD</button>
      </div>
      <div style={{ flex: 1 }}>
        {/* Optionally, you can display any additional content here */}
      </div>
    </div>
  );
}
