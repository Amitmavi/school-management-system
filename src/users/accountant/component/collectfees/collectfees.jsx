import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { collection, getDocs,   } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import './collectfees.css';
import { db } from '../../../../utils/firebaseConfig';  

export default function CollectFees() {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
 
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classesSnapshot = await getDocs(collection(db, 'classes'));
        const classesData = Array.from(new Set(classesSnapshot.docs.map(doc => getClassSectionFromId(doc.id).class)));
        setClasses(classesData);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    const fetchSections = async () => {
      try {
        const sectionsSnapshot = await getDocs(collection(db, 'classes'));
        const sectionsData = Array.from(new Set(sectionsSnapshot.docs.map(doc => getClassSectionFromId(doc.id).section)));
        setSections(sectionsData);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    // Call functions to fetch data
    fetchClasses();
    fetchSections();
  }, []);

  const getClassSectionFromId = (id) => {
    const parts = id.split(' ');
    return {
      class: parts[0],
      section: parts[1]
    };
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };
  return (
    <div>
      <div className="fees-container">
        <h3 className="criteriaa-heading">Collect Fees</h3>       
        <form>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="classField">Class:</label>
            <select id="classField" value={selectedClass} onChange={handleClassChange} required style={{ width: '200px', height: '40px', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}>
              <option value="">Select Class</option>
              {classes.map((cls, index) => (
                <option key={index} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="sectionField">Section:</label>
            <select id="sectionField" value={selectedSection} onChange={handleSectionChange} required style={{ width: '200px', height: '40px', padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}>
              <option value="">Select Section</option>
              {sections.map((sec, index) => (
                <option key={index} value={sec}>{sec}</option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <h5>Search By Keyboard</h5>
            {/* Placeholder for search input */}
            <input type="text" placeholder='search...' style={{ width: '400px' ,marginTop:'10px',height:'40px' }} />
          </div>
          <div className="form-field">
  <Button 
    variant="contained" 
    startIcon={<SearchIcon />} 
    className="search-button"
    style={{ backgroundColor: 'green', color: 'white', fontWeight: 'bold',marginTop:'28px' }}
  >
    Search
  </Button>
</div>
          </div>   </form>
      </div>
    </div>
  );
}
