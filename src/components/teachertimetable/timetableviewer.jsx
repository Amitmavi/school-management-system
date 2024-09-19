import { collection, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

export default function SelectTeacherPage() {
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [subjectsAndClasses, setSubjectsAndClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const db = getFirestore();
      const teachersCollection = collection(db, 'teachers');
      try {
        const querySnapshot = await getDocs(teachersCollection);
        const teacherData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return { id: doc.id, fullName: `${data.firstName} ${data.lastName}` };
        });
        setTeachers(teacherData);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);


  useEffect(() => {
    const fetchTimetable = async () => {
      if (!selectedTeacher) return;
    
      const db = getFirestore();
      const teacherRef = collection(db, 'teachers').doc(selectedTeacher);
      const timetableCollection = collection(teacherRef, 'timetable');

      try {
        const querySnapshot = await getDocs(timetableCollection);
        const data = [];
        querySnapshot.forEach(doc => {
          const timetableData = doc.data();
          Object.values(timetableData).forEach(dayData => {
            data.push({ day: doc.id, subjects: dayData.subjects, classes: dayData.classes });
          });
        });
        setSubjectsAndClasses(data);
      } catch (error) {
        console.error('Error fetching timetable:', error);
      }
    };

    fetchTimetable();
  }, [selectedTeacher]);

  const handleViewTimetable = () => {
    if (!selectedTeacher) {
      console.error('Please select a teacher.');
      return;
    }
  };

  return (
    <div>
      <h1>Select Teacher</h1>
      <div>
        <label htmlFor="teacherSelect">Select Teacher:</label>
        <select 
          id="teacherSelect" 
          value={selectedTeacher} 
          onChange={(e) => setSelectedTeacher(e.target.value)}
        >
          <option value="">Select</option>
          {teachers.map((teacher, index) => (
            <option key={index} value={teacher.id}>{teacher.fullName}</option>
          ))}
        </select>
        <button  className="button" style={{ width: '120px', height: '60px' }} onClick={handleViewTimetable}>View Timetable</button>
      </div>

      {subjectsAndClasses.length > 0 && (
        <div>
          <h2>Timetable for {selectedTeacher}</h2>
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Subjects</th>
                <th>Classes</th>
              </tr>
            </thead>
            <tbody>
              {subjectsAndClasses.map(({ day, subjects, classes }, index) => (
                <tr key={index}>
                  <td>{day}</td>
                  <td>{subjects.filter(subject => subject !== '').join(', ')}</td>
                  <td>{classes.filter(className => className !== '').join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
