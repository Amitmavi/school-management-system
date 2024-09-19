import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { collection, deleteDoc, doc, getDocs, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const FeesTypePage = () => {
  const [name, setName] = useState("");
  const [feesCode, setFeesCode] = useState("");
  const [description, setDescription] = useState("");
  const [feesTypes, setFeesTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const db = getFirestore();

  // Fetch fees types from Firestore
  useEffect(() => {
    const fetchFeesTypes = async () => {
      const querySnapshot = await getDocs(collection(db, "feesTypes"));
      const types = [];
      querySnapshot.forEach((doc) => {
        types.push({ id: doc.id, ...doc.data() });
      // Freeze the page by setting overflow to hidden when component mounts
    document.body.style.overflow = 'hidden';

    // Restore overflow when component unmounts
    return () => {
      document.body.style.overflow = ''; // Empty string restores default overflow behavior
    };
      });
      setFeesTypes(types);
    };
    fetchFeesTypes();
  }, [db]);

  // Handle form submission to add a fees type
  const handleAddFeesType = async (e) => {
    e.preventDefault();
    if (!name || !feesCode || !description) return;
    try {
      await setDoc(doc(db, "feesTypes", name), {
        name: name,
        feesCode: feesCode,
        description: description,
        timestamp: serverTimestamp(),
      });
      // Clear form fields after adding
      setName("");
      setFeesCode("");
      setDescription("");
    } catch (error) {
      console.error("Error adding fees type: ", error);
    }
  };

  // Handle deletion of a fees type
  const handleDeleteFeesType = async (id) => {
    try {
      await deleteDoc(doc(db, "feesTypes", id));
      // After deleting, fetch and update fees types
      const querySnapshot = await getDocs(collection(db, "feesTypes"));
      const updatedTypes = [];
      querySnapshot.forEach((doc) => {
        updatedTypes.push({ id: doc.id, ...doc.data() });
      });
      setFeesTypes(updatedTypes);
    } catch (error) {
      console.error("Error deleting fees type: ", error);
    }
  };

  // Handle editing of a fees type
  const handleEditFeesType = (type) => {
    setName(type.name);
    setFeesCode(type.feesCode);
    setDescription(type.description);
  };

  // Handle search query change
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div style={{ display: "flex", marginLeft: "60px" }}>
      {/* Fees Type List */}
      <div style={{ flex: 1, height: "600px", width: "40%", padding: "20px", border: "1px solid #ccc", borderRadius: "2px", backgroundColor: "#e0e0e0", marginRight: "10px", marginBottom: "20px", overflowY: "auto", overflowX: "hidden" }}>
        <h3 style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif', color: "rgb(95, 88, 88)", marginBottom: "20px", fontSize: "30px" }}>Fees Type List</h3>
        <form style={{ width: "835px"}}>
          <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchQueryChange} style={{ width: "400px", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} />
        </form>
        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }} >
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#b1abab', color: '#1a0707' }}>Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#b1abab', color: '#1a0707' }}>Fees Group</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#b1abab', color: '#1a0707' }}>Edit</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#b1abab', color: '#1a0707' }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {feesTypes
                .filter((type) => type.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((type) => (
                  <tr key={type.id}>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{type.name}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{type.feesCode}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                      <IconButton aria-label="edit" onClick={() => handleEditFeesType(type)}>
                        <EditIcon />
                      </IconButton>
                    </td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                      <IconButton aria-label="delete" onClick={() => handleDeleteFeesType(type.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <br />
          <hr />
        </div>
      </div>

      {/* Fees Type Form */}
      <div style={{ flex: 1, marginRight: "10px", marginBottom: "20px" }}>
        <h3 style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif', color: "rgb(95, 88, 88)", marginBottom: "20px", fontSize: "30px", marginTop: "10px", marginLeft: "60px" }}>Fees Type</h3>
        <div style={{ width: '400px' }}>
          <div>
            <h5 style={{marginLeft: "60px"}}>Name</h5>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "calc(100% - 10px)", padding: "8px", marginBottom: "10px", marginLeft: "60px" }}
            />
          </div>
          <div>
            <h5 style={{marginLeft: "60px"}}>Fees Code</h5>
            <input
              type="text"
              id="feesCode"
              value={feesCode}
              onChange={(e) => setFeesCode(e.target.value)}
              style={{ width: "calc(100% - 10px)", padding: "8px", marginBottom: "10px", marginLeft: "60px" }}
            />
          </div>
          <div>
            <h5 style={{marginLeft: "60px"}}>Description</h5>
            <label htmlFor="groupDescriptions"></label>
            <textarea
              id="groupDescriptions"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "calc(100% - 10px)", padding: "20px", marginBottom: "10px", marginLeft: "60px" }}
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <button onClick={handleAddFeesType} style={{ width: '8rem', height: '40px', backgroundColor: 'rgb(93, 93, 87)', marginTop: '-1rem', marginLeft: '60px', fontSize: '18px', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '4px', outline: 'none', transition: 'background-color 0.3s ease', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>SAVE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeesTypePage;