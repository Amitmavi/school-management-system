import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import './TimeTableViewer.css';

function TimeTableViewer2({ setSelectedClassProp }) {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [timeTableData, setTimeTableData] = useState([]);
  const [formExpanded, setFormExpanded] = useState(false);

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

  const fetchTimeTableData = async () => {
    if (!selectedClass || !selectedDay) {
      console.error('Selected class or day is missing.');
      return;
    }

    const db = getFirestore();
    const classRef = doc(db, 'classes', selectedClass, 'timetable', selectedDay);

    try {
      const docSnapshot = await getDoc(classRef);
      const timeTableData = docSnapshot.data();

      if (!timeTableData) {
        console.error('No timetable data found for the selected day.');
        return;
      }

      console.log('Time Table Data:', timeTableData); // Log the time table data
      setTimeTableData(timeTableData);
      setFormExpanded(true);
    } catch (error) {
      console.log('Fetched Timetable Data:', timeTableData);
    }
  };

  const renderTimeTableRows = () => {
    let srNoCounter = 0; // Counter for SR No
    const selectedDayName = selectedDay; // Store the selected day name

    const timeSlots = [
      { time: '8:00 AM', slot: '1' },
      { time: '9:00 AM', slot: '2' },
      { time: '10:00 AM', slot: '3' },
      { time: '11:00 AM', slot: '4' },
      { time: '12:00 PM', slot: '5' },
      { time: '12:30 PM', slot: '6' },
      { time: '1:30 PM', slot: '7' },
      { time: '2:30 PM', slot: '8' },
    ];

    return timeSlots.map(({ time, slot }, index) => {
      // Increment SR No counter for each row
      srNoCounter++;

      // Extract the subject for the current time slot index
      const subject = timeTableData.subjects[index] || '';

      return (
        <tr key={slot}>
          <td>{srNoCounter}</td> {/* Display SR No */}
          <td>{selectedDayName}</td> {/* Display selected day name */}
          <td>{time}</td> {/* Display time slot */}
          <td>{subject}</td> {/* Display subject */}
        </tr>
      );
    });
  };

  const isViewButtonDisabled = () => {
    return !selectedClass || !selectedDay;
  };

  return (
    <div>
      <div className="additional-options">
        <div className="choose-item">
          <label htmlFor="choose-class">Choose Class or Section</label>
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
        <div className="choose-item">
          <label htmlFor="choose-day">Choose Day</label>
          <select 
            id="choose-day"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </select>
        </div>
      </div>
      <button className="button" style={{ width: '130px', height: '55px' }} onClick={fetchTimeTableData} disabled={isViewButtonDisabled()}>View Time Table</button>
      {formExpanded && (
        <>
          <h2>Time Table</h2>
          <table>
            <thead>
              <tr>
                <th>SR No</th>
                <th>Day Name</th>
                <th>Time</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>{renderTimeTableRows()}</tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default TimeTableViewer2;
