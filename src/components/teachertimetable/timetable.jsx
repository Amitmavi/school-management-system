  import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import React, { useEffect, useMemo, useState } from 'react';

  import './timetable.css';

  export default function UploadTimeTablePage() {
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [subjectOptions, setSubjectOptions] = useState([]);
    const [classOptions, setClassOptions] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState(() => {
      const initialSubjects = [];
      const initialClasses = [];
      for (let i = 0; i < 6; i++) {
        const daySubjects = [];
        const dayClasses = [];
        for (let j = 0; j < 8; j++) {
          daySubjects.push(""); //add empty if not selected
          dayClasses.push("");  //add empty if not selected
        }
        initialSubjects.push(daySubjects);
        initialClasses.push(dayClasses);
      }
      return { subjects: initialSubjects, classes: initialClasses };
    });
    const [toastMessage, setToastMessage] = useState('');

    const daysOfWeek = useMemo(() => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], []);

    useEffect(() => {

      const fetchData = async () => {
        const db = getFirestore();
        try {
          const teachersSnapshot = await getDocs(collection(db, 'teachers'));
          const teachersData = teachersSnapshot.docs.map(doc => {
            const data = doc.data();
            return { id: doc.id, fullName: `${data.firstName} ${data.lastName}` };
          });
          setTeachers(teachersData);

          const subjectsSnapshot = await getDocs(collection(db, 'Subject'));
          const subjectsData = subjectsSnapshot.docs.map(doc => doc.data().Subjectname);
          setSubjectOptions(subjectsData);

          const classesSnapshot = await getDocs(collection(db, 'classes'));
          const classesData = classesSnapshot.docs.map(doc => doc.id);
          setClassOptions(classesData);
          

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
      fetchData();
    }, []);

    const saveTimetable = async () => {
      if (!selectedTeacher) {
        setToastMessage('Please select a teacher.');
        return;
      }
    
      const db = getFirestore();
      const teacherRef = doc(db, 'teachers', selectedTeacher);
    
      try {
        const teacherDocSnapshot = await getDoc(teacherRef);
        if (!teacherDocSnapshot.exists()) {
          setToastMessage('Selected teacher does not exist.');
          return;
        }
    
        // Reference to the timetable collection under the selected teacher's document
        const timetableRef = collection(teacherRef, 'timeTable');
    
        // Loop through each day of the week
        for (const dayOfWeek of daysOfWeek) {
          // Generate the document ID using the day name
          const dayDocRef = doc(timetableRef, dayOfWeek);
    
          const subjects = selectedSubjects.subjects[daysOfWeek.indexOf(dayOfWeek)];
          const classes = selectedSubjects.classes[daysOfWeek.indexOf(dayOfWeek)];
    
          // Replace undefined values with empty strings
          const sanitizedSubjects = subjects.map(subject => subject || '');
          const sanitizedClasses = classes.map(className => className || '');
    
          // Add document to the timetable collection with Firestore generating the unique document ID
          await setDoc(dayDocRef, {
            subjects: sanitizedSubjects,
            classes: sanitizedClasses
          });
        }
    
        setToastMessage('Timetable saved successfully.');
      } catch (error) {
        console.error('Error saving timetable:', error);
        setToastMessage(`Error saving timetable: ${error.message}`);
      }
    };
    
    
    const handleSubjectChange = (dayIndex, slot, subject) => {
      const newSelectedSubjects = { ...selectedSubjects };
      newSelectedSubjects.subjects[dayIndex][slot] = subject;
      setSelectedSubjects(newSelectedSubjects);
    };

    const handleClassChange = (dayIndex, slot, selectedClass) => {
      const newSelectedSubjects = { ...selectedSubjects };
      newSelectedSubjects.classes[dayIndex][slot] = selectedClass;
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
                        <div>
                          <select onChange={(event) => handleSubjectChange(dayIndex, slot - 1, event.target.value)}>
                            <option value="">Select Subject</option>
                            {subjectOptions.map((subject, index) => (
                              <option key={index} value={subject}>{subject}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <select onChange={(event) => handleClassChange(dayIndex, slot - 1, event.target.value)}>
                            <option value="">Select Class</option>
                            {classOptions.map((className, index) => (
                              <option key={index} value={className}>{className}</option>
                            ))}
                          </select>
                        </div>
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
            <label htmlFor="choose-teacher">Choose Teacher:</label>
            <select 
              id="choose-teacher" 
              value={selectedTeacher} 
              onChange={(e) => setSelectedTeacher(e.target.value)}
            >
              <option value="">Select</option>
              {teachers.map((teacher, index) => (
                <option key={index} value={teacher.id}>{teacher.fullName}</option>
              ))}
            </select>
          </div>
          <button className="save-button" onClick={saveTimetable}>Save</button>
        </div>
        {toastMessage && <div className="toast">{toastMessage}</div>}
      </div>
    );
  }
