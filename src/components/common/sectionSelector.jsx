import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { db } from "../../utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function SectionSelector({ onSelect }) {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'sections'));
        const fetchedSections = querySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().sectionName
        }));
        setSections(fetchedSections);
      } catch (error) {
        console.error("Error Fetching Sections", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  const handleChange = (event) => {
    const sectionId = event.target.value;
    setSelectedSection(sectionId);
    onSelect(sectionId); // Pass the selected section ID to the parent component
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="section-selector-label">Section</InputLabel>
        <Select
          labelId="section-selector-label"
          id="section-selector"
          value={selectedSection}
          onChange={handleChange}
          autoWidth
          label="Section"
        >
          {sections.map((section) => (
            <MenuItem key={section.id} value={section.id}>
              {section.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}