import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { getDocs, collection, getFirestore } from "firebase/firestore";
import ClassSelector from '../../../../components/common/classSelector';

export default function FeesReminder() {
  const [feesGroups, setFeesGroups] = useState([]);
  const [feesTypes, setFeesTypes] = useState([]);

  useEffect(() => {
    fetchFeesGroups(setFeesGroups);
    fetchFeesTypes(setFeesTypes);
  }, []);

  const fetchFeesGroups = async (setFeesGroups) => {
    try {
      const db = getFirestore();
      const feesGroupCollection = collection(db, "feesGroup");
      const feesGroupSnapshot = await getDocs(feesGroupCollection);
      const feesGroupList = feesGroupSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFeesGroups(feesGroupList);
    } catch (error) {
      console.error("Error fetching fees group:", error);
    }
  };

  const fetchFeesTypes = async (setFeesTypes) => {
    try {
      const db = getFirestore();
      const feesTypesCollection = collection(db, "feesTypes");
      const feesTypesSnapshot = await getDocs(feesTypesCollection);
      const feesTypesList = feesTypesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFeesTypes(feesTypesList);
    } catch (error) {
      console.error("Error fetching fees types:", error);
    }
  };
  
  return (
    <div style={{ padding: '10px', margin: '0 auto', maxWidth: '800px' }}>
      <h3 style={{ fontFamily: 'Georgia, Times, serif', color: 'rgb(95, 88, 88)', marginBottom: '20px', fontSize: '30px', marginLeft: '0.5px', marginTop: '0.5px' }}>Fees Reminder</h3>
      <form style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ margin: '10px' }}>
          <h5 style={{ fontSize: '18px', marginBottom: '5px' }}>Class</h5>
          <ClassSelector style={{ width: '200px' }}></ClassSelector>
        </div>

        <div style={{ margin: '10px' }}>
          <h5 style={{ fontSize: '18px', marginBottom: '5px' }}>Group</h5>
          <select style={{ width: '400px' }}>
            <option value="">Select</option>
            {feesGroups.map(group => (
              <option key={group.id} value={group.id}>{group.name}</option>
            ))}
          </select>
        </div>

        <div style={{ margin: '10px' }}>
          <h5 style={{ fontSize: '18px', marginBottom: '5px' }}>Fees Type</h5>
          <select id="fees-type" name="fees-type" style={{ width: '400px' }}>
            <option value="">Select</option>
            {feesTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>

        <div style={{ margin: '10px' }}>
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            style={{ width: '8rem', height: '40px', backgroundColor: 'rgb(93, 93, 87)', marginTop: '0rem', marginLeft: 'auto', fontSize: '18px', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '4px', outline: 'none', transition: 'background-color 0.3s ease', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
}
