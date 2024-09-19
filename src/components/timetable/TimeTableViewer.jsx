import { collection, doc, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import './TimeTableViewer.css';

function TimeTableViewer() {
  const [classes, setClasses] = useState([]); // State to store the fetched classes
  const [selectedClass, setSelectedClass] = useState('');
  const [setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');
  const [formExpanded, setFormExpanded] = useState(false); // State to manage form expansion
  const [timetableData, setTimetableData] = useState({}); // State to store the fetched timetable data

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots =  ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '12:30 PM', '1:30 PM', '2:30 PM'];

 // Function to fetch timetable data for the selected class
 const fetchTimeTableData = async (classId) => {
  const db = getFirestore();
  const classRef = doc(db, 'classes', classId);
  const timetableRef = collection(classRef, 'timetable');

  try {
    const timetableSnapshot = await getDocs(timetableRef);
    const timetableData = {};
    timetableSnapshot.forEach(doc => {
      const day = doc.id;
      const subjects = Object.values(doc.data());
      timetableData[day] = subjects;
    });
    setTimetableData(timetableData);
    setFormExpanded(true);
  } catch (error) {
    console.error('Error fetching timetable data:', error);
  }
};

// Handler for the "View" button click
const handleViewButtonClick = () => {
  if (!selectedClass) return;
  fetchTimeTableData(selectedClass);
};

// Fetch classes from Firestore when the component mounts
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

return (
  <div>
    <h1>View Time Table</h1>
    <div className="additional-options">
      <div className="choose-item">
        <label htmlFor="choose-class">Choose Class or Section:</label>
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
      <button className="button" onClick={handleViewButtonClick}>View</button>
    </div>
    {formExpanded && (
      <>
        <h2>All Days Time Table</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Day/Time</th>
                {timeSlots.map((time) => (
                  <th key={time}>{time}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {daysOfWeek.map((day) => (
                <tr key={day}>
                  <td>{day}</td>
                  {timetableData[day] ? (
                    timetableData[day][0].map((subject, index) => (
                      <td key={index}>{subject}</td>
                    ))
                  ) : (
                    <td>-</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    )}
  </div>
);
}

export default TimeTableViewer; 