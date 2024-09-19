import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UploadedDataContainer from './UploadedDataContainer';

const DatesheetComponent = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedExamType, setSelectedExamType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

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

    const fetchSubjects = async () => {
      try {
        const db = getFirestore();
        const subjectsCollection = collection(db, 'subjects');
        const snapshot = await getDocs(subjectsCollection);
        const subjectList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSubjects(subjectList);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchClasses();
    fetchSubjects();
  }, []);

  const handleSaveButtonClick = async () => {
    try {
      const db = getFirestore();
      const examScheduleCollection = collection(db, 'examSchedule');

      // Use selectedClass directly as the document ID
      const classDocRef = doc(examScheduleCollection, selectedClass);
      const examTypeCollectionRef = collection(classDocRef, selectedExamType);

      const [year, month, day] = selectedDate.split('-').map(part => parseInt(part, 10));
      const formattedDate = `${month}-${day}-${year}`;

      const documentTitle = `${formattedDate}`;

      const dateDocRef = doc(examTypeCollectionRef, documentTitle);

      await setDoc(dateDocRef, { subject: selectedSubject });

      toast.success('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
      toast.error('Error saving data. Please try again later.');
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Date Sheet Data Uploader</h2>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="classSelect" style={{ marginRight: '10px' }}>Select Class:</label>
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} style={{ padding: '8px', borderRadius: '4px' }}>
            <option value="">Select Class</option>
            {classes.map((classItem) => (
              <option key={classItem.id} value={classItem.className.toString()}>{classItem.className}</option>
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
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="datePicker" style={{ marginRight: '10px' }}>Select Date:</label>
          <input type="date" id="datePicker" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={{ padding: '8px', borderRadius: '4px' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="subjectSelect" style={{ marginRight: '10px' }}>Select Subject:</label>
          <select id="subjectSelect" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} style={{ padding: '8px', borderRadius: '4px' }}>
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.subjectName}>{subject.subjectName}</option>
            ))}
          </select>
        </div>
        <button onClick={handleSaveButtonClick} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
      <UploadedDataContainer /> {/* Include UploadedDataContainer component */}
    </div>

  );
};

export default DatesheetComponent;
