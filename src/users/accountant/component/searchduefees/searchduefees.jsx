import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from 'react';

export default function SearchDueFees() {
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [feesGroups, setFeesGroups] = useState([]);
  const [feesData, setFeesData] = useState({
    feesGroup: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbInstance = getFirestore();

        // Fetch classes
        const classesSnapshot = await getDocs(collection(dbInstance, 'classes'));
        const classesData = Array.from(new Set(classesSnapshot.docs.map(doc => getClassSectionFromId(doc.id).class)));
        setClasses(classesData);

        // Fetch sections
        const sectionsSnapshot = await getDocs(collection(dbInstance, 'classes'));
        const sectionsData = Array.from(new Set(sectionsSnapshot.docs.map(doc => getClassSectionFromId(doc.id).section)));
        setSections(sectionsData);

        // Fetch fee groups
        const feesGroupCollection = collection(dbInstance, "feesGroup");
        const feesGroupSnapshot = await getDocs(feesGroupCollection);
        const feesGroupList = feesGroupSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFeesGroups(feesGroupList);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors appropriately
        
      }
    };

    fetchData();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeesData(prevState => ({
      ...prevState,
      [name]: name === "dueDate" ? new Date(value) : value,
    }));
    console.log(feesData)
  };

  const handleSearch = () => {
    // Implement search functionality
  };

    return (
      <div>
        <h3 style={{ fontFamily: 'Georgia, Times, serif', color: 'rgb(95, 88, 88)', marginBottom: '20px', fontSize: '30px', marginLeft: '10px', marginTop: '10px' }}>Fees Due</h3>
        <form style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', margin: '10px' }}>
            <h5 style={{ fontSize: '18px', marginBottom: '5px' }}>Fees Group</h5>
            <select
              id="feesGroup"
              name="feesGroup"
              onChange={handleChange}
              required
              style={{ width: '350px', height: '40px', padding: '5px', border: '1px solid #ccc', borderRadius: '4px', marginTop: '5px' }}
            >
              <option value="">Select</option>
              {feesGroups.map((group) => (
                <option
                  key={group.id}
                  value={group.id}
                >
                  {group.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ flex: '1', margin: '10px' }}>
            <h5 style={{ fontSize: '18px', marginBottom: '5px' }}>Class</h5>
            <select
              id="classField"
              value={selectedClass}
              onChange={handleClassChange}
              required
              style={{ width: '350px', height: '40px', padding: '5px', border: '1px solid #ccc', borderRadius: '4px', marginTop: '5px' }}
            >
              <option value="">Select</option>
              {classes.map((cls, index) => (
                <option key={index} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
  
          <div style={{ flex: '1', margin: '10px' }}>
            <h5 style={{ fontSize: '18px', marginBottom: '5px' }}>Section</h5>
            <select
              id="sectionField"
              value={selectedSection}
              onChange={handleSectionChange}
              required
              style={{ width: '350px', height: '40px', padding: '5px', border: '1px solid #ccc', borderRadius: '4px', marginTop: '5px' }}
            >
              <option value="">Select</option>
              {sections.map((sec, index) => (
                <option key={index} value={sec}>{sec}</option>
              ))}
            </select>
          </div>
  
          <div style={{ flex: '1', margin: '10px' }}>
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={handleSearch}
              required
              style={{ width: '8rem', height: '40px', backgroundColor: 'rgb(93, 93, 87)', marginTop: '2rem', marginLeft: '5px', fontSize: '18px', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '4px', outline: 'none', transition: 'background-color 0.3s ease', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}
            >
              Search
            </Button>
          </div>
        </form>
      </div>
    );
  }