import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import React, { useEffect, useMemo, useState } from 'react';
import './uploadTimeTable.css';

export default function UploadTimeTablePage() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState(() => {
    const initialSubjects = [];
    for (let i = 0; i < 6; i++) {
      initialSubjects.push(Array(8).fill(''));
    }
    return initialSubjects;
  });
  const [toastMessage, setToastMessage] = useState('');

  // Define daysOfWeek using useMemo
  const daysOfWeek = useMemo(() => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], []);

  useEffect(() => {
    const fetchClassesAndSections = async () => {
      const db = getFirestore();
      try {
        // Fetch classes
        const classesSnapshot = await getDocs(collection(db, 'classes'));
        const classesData = classesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setClasses(classesData);

        // Fetch sections
        const sectionsSnapshot = await getDocs(collection(db, 'classes'));
        const sectionsData = sectionsSnapshot.docs.map(doc => doc.data().classSection);
        setSections(sectionsData);
      } catch (error) {
        console.error('Error fetching classes and sections:', error);
      }
    };

    fetchClassesAndSections();
  }, [setSections]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const db = getFirestore();
      try {
        // Fetch all documents from the 'subjects' collection
        const subjectsSnapshot = await getDocs(collection(db, 'Subject'));
        const subjectsData = subjectsSnapshot.docs.map(doc => doc.data().Subjectname); // Extracting 'Subjectname' field

        // Set the fetched subject names in the state
        setSubjectOptions(subjectsData);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, []);

  const saveTimetable = async () => {
    if (!selectedClass) {
      setToastMessage('Please select a class.');
      return;
    }

    const db = getFirestore();
    const classDocRef = doc(db, 'classes', selectedClass);

    try {
      // Check if the class document already exists
      const classDocSnapshot = await getDoc(classDocRef);
      if (!classDocSnapshot.exists()) {
        setToastMessage('Selected class does not exist.');
        return;
      }

      const timetableRef = collection(classDocRef, 'timetable'); // Reference to the 'timetable' collection

      // Loop through the days (Monday to Saturday)
      for (let i = 0; i < daysOfWeek.length; i++) {
        const dayOfWeek = daysOfWeek[i];
        const subjects = selectedSubjects[i]; // Get selected subjects for the day

        // Save the subjects array for the day under the timetable collection
        await setDoc(doc(timetableRef, dayOfWeek), { subjects });
      }

      setToastMessage('Timetable saved successfully.');
    } catch (error) {
      console.error('Error saving timetable:', error);
      setToastMessage(`Error saving timetable: ${error.message}`);
    }
  };


  const handleSubjectChange = (dayIndex, slot, subject) => {
    const newSelectedSubjects = [...selectedSubjects];
    newSelectedSubjects[dayIndex][slot] = subject;
    setSelectedSubjects(newSelectedSubjects);
  };

  return (
    <div>
      <div className="timetable-container">
        <h1>Upload Time Table</h1>
        <div className="timetable">
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th>Day/Time</th>
                <th>8:00 AM</th>
                <th>9:00 AM</th>
                <th>10:00 AM</th>
                <th>11:00 AM</th>
                <th>12:00 PM</th>
                <th>12:30 PM</th>
                <th>1:30 PM</th>
                <th>2:30 PM</th>
              </tr>
            </thead>
            <tbody>
              {daysOfWeek.map((dayOfWeek, dayIndex) => (
                <tr key={dayIndex}>
                  <td>{dayOfWeek}</td>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(slot => (
                    <td key={slot}>
                      <select onChange={(event) => handleSubjectChange(dayIndex, slot - 1, event.target.value)}>
                        <option value="">Select</option>
                        {subjectOptions.map((subject, index) => (
                          <option key={index} value={subject}>{subject}</option>
                        ))}
                      </select>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="additional-options">
        <div className="choose-item">
          <label htmlFor="choose-class">Choose Class or Section:</label>
          {/* Select dropdown for choosing class or section */}
          <select
            id="choose-class"
            value={selectedClass || selectedSection}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              setSelectedSection(''); // Reset selectedSection when class changes
            }}
          >
            <option value="">Select</option>
            {/* Rendering classes */}
            {classes.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                {`${classItem.id}`} {/* Display class ID and name */}
              </option>
            ))}
          </select>
        </div>
        <button className="save-button" onClick={saveTimetable}>Save</button>
      </div>
      {/* Toast message */}
      {toastMessage && <div className="toast">{toastMessage}</div>}
    </div>
  );
}