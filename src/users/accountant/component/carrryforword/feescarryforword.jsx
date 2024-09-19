import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from 'react';

export default function Feescarryforword() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");

  useEffect(() => {
    const fetchClassesAndSections = async () => {
      const db = getFirestore();
      try {
        // Fetch classes
        const classesSnapshot = await getDocs(collection(db, 'classes'));
        const classesData = classesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setClasses(classesData);

        // Fetch sections
        const sectionsSnapshot = await getDocs(collection(db, 'sections'));
        const sectionsData = sectionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSections(sectionsData);
      } catch (error) {
        console.error('Error getting data:', error);
      }
    };

    fetchClassesAndSections();

    // Freeze the page by setting overflow to hidden when component mounts
    document.body.style.overflow = 'hidden';

    // Restore overflow when component unmounts
    return () => {
      document.body.style.overflow = ''; // Empty string restores default overflow behavior
    };
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h3 style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif', color: "rgb(95, 88, 88)", marginBottom: "20px", fontSize: "30px", marginRight: "660px", marginTop: "10px" }}>Fees Carry Forward</h3>
      </div>
      <form style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "25px", padding: "10px", margin: "0 auto" }}>
        <div style={{ margin: "10px", width: "400px" }}>
          <h5 style={{ marginLeft: "-2%" }}>Class</h5>
          <select
            id="Class"
            name="Class"
            style={{ width: '400px', fontSize: "16px",  marginLeft: "-2%" }}
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select</option>
            {classes.map((item) => (
              <option key={item.id} value={item.id}>{item.className}</option>
            ))}
          </select>
        </div>
        <div style={{ margin: "0px", width: "400px", marginTop: "-0%" }}>
          <h5 style={{ marginLeft: "-2%" }}>Section</h5>
          <select
            id="Section"
            name="Section"
            style={{ width: '400px', fontSize: "16px",  marginLeft: "-2%" }}
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="">Select</option>
            {sections.map((item) => (
              <option key={item.id} value={item.id}>{item.sectionName}</option>
            ))}
          </select>
        </div>
        <div style={{ margin: "10px" }}>
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            style={{ height: '40px', marginTop: '1.5rem', width: "8rem", backgroundColor: "rgb(93, 93, 87)", fontSize: "18px", border: "none", color: "#fff", cursor: "pointer", borderRadius: "4px", outline: "none", transition: "background-color 0.3s ease", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
}
