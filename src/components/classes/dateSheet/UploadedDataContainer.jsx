import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const UploadedDataContainer = () => {
  const [uploadedData, setUploadedData] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedExamType, setSelectedExamType] = useState('');
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchUploadedData = async () => {
      try {
        const db = getFirestore();
        const classCollectionRef = collection(db, 'examSchedule');
        const classSnapshot = await getDocs(classCollectionRef);

        const data = [];

        // Iterate over each class document
        for (const classDoc of classSnapshot.docs) {
          // Iterate over each exam type
          const examTypes = ['Unit1', 'Unit2', 'Unit3', 'HalfYearly', 'Finals'];
          for (const examType of examTypes) {
            const query = collection(classDoc.ref, examType);
            const snapshot = await getDocs(query);
            snapshot.forEach(doc => {
              data.push({ class: classDoc.id, examType, date: doc.id, subject: doc.data().subject });
            });
          }
        }

        setUploadedData(data);
      } catch (error) {
        console.error('Error fetching uploaded data:', error);
      }
    };

    fetchUploadedData();
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const db = getFirestore();
        const classesCollection = collection(db, 'class');
        const snapshot = await getDocs(classesCollection);
        const classList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setClasses(classList);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  // Function to filter uploaded data based on selected class and exam type
  const filteredData = uploadedData.filter(item => {
    return (
      selectedClass !== '' &&
      selectedExamType !== '' &&
      item.class === selectedClass &&
      item.examType === selectedExamType
    );
  });

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Uploaded Data</h2>
      <div style={{ marginBottom: '20px' }}>
      <label htmlFor="classSelect">Select Class:</label>
<select
  id="classSelect"
  value={selectedClass}
  onChange={(e) => setSelectedClass(e.target.value)}
>
  <option value="">Select Class</option>
  {classes.map((classItem) => (
    <option key={classItem.id} value={classItem.className}>{classItem.className}</option>
  ))}
</select>

      </div>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="examTypeSelect" style={{ marginRight: '10px' }}>Select Exam Type:</label>
        <select id="examTypeSelect" value={selectedExamType} onChange={(e) => setSelectedExamType(e.target.value)} style={{ padding: '8px', borderRadius: '4px' }}>
          <option value="">Select Exam Type</option>
          <option value="Unit1">Unit1</option>
          <option value="Unit2">Unit2</option>
          <option value="Unit3">Unit3</option>
          <option value="HalfYearly">HalfYearly</option>
          <option value="Finals">Finals</option>
        </select>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#007bff', color: '#fff' }}>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #fff' }}>Class</th>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #fff' }}>Exam Type</th>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #fff' }}>Date</th>
            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #fff' }}>Subject</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f4f4f4' : '#fff' }}>
              <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{item.class}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{item.examType}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{item.date}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>{item.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UploadedDataContainer;
