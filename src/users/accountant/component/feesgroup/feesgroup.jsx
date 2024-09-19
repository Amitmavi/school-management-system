import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../../utils/firebaseConfig";

const FeesGroupPage = () => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [feesGroups, setFeesGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "feesGroup"));
      const fetchedGroups = [];
      querySnapshot.forEach((doc) => {
        fetchedGroups.push({ id: doc.id, ...doc.data() });
      });
      setFeesGroups(fetchedGroups);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
        // Freeze the page by setting overflow to hidden when component mounts
        document.body.style.overflow = 'hidden';

        // Restore overflow when component unmounts
        return () => {
          document.body.style.overflow = ''; // Empty string restores default overflow behavior
        };
    
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!groupName || !groupDescription) return;
    try {
      await setDoc(doc(db, "feesGroup", groupName), {
        name: groupName,
        description: groupDescription,
        timestamp: serverTimestamp(),
      });
      setGroupName("");
      setGroupDescription("");

      // Fetch data again after saving to update feesGroups state
      fetchData();
    } catch (error) {
      console.error("Error adding document: ", error);
      setError(error);
    }
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleDeleteGroup = async (id) => {
    try {
      await deleteDoc(doc(db, "feesGroup", id));
      // After deleting, fetch and update fees groups
      fetchData();
    } catch (error) {
      console.error("Error deleting group: ", error);
      setError(error);
    }
  };

  return (
    <div style={{ display: 'flex', marginLeft: '60px' }}>
      {/* Fees Group List */}
      <div style={{ flex: 1, height: '610px', width: '40%', padding: '20px', border: '1px solid #ccc', borderRadius: '2px', backgroundColor: '#e0e0e0', marginRight: '10px', marginBottom: '20px', overflowY: 'auto', overflowX: 'hidden' }}>
        <h3 style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif', color: 'rgb(95, 88, 88)', marginBottom: '20px', fontSize: '30px' }}>Fees Group List</h3>
        <form style={{ width: '835px' }}>
          <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchQueryChange} style={{ width: '400px', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </form>
        {feesGroups.length === 0 && <p>No fees groups found.</p>}
        {error && <p>Error: {error.message}</p>}
        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#b1abab', color: '#1a0707' }}>Group Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#b1abab', color: '#1a0707' }}>Description</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#b1abab', color: '#1a0707' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {feesGroups
                .filter((group) => group.name.toLowerCase().includes(searchQuery))
                .map((group) => (
                  <tr key={group.id}>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{group.name}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{group.description}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                      <button onClick={() => handleDeleteGroup(group.id)} style={{ padding: '10px 20px', backgroundColor: '#000000', color: 'white', border: 'none', cursor: 'pointer' }}>Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fees Group Form */}
      <div style={{ flex: 1, marginRight: '10px', marginBottom: '20px' }}>
        <h3 style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif', color: 'rgb(95, 88, 88)', marginBottom: '20px', fontSize: '30px', marginTop: '10px', marginLeft: '60px' }}>Fees Group</h3>
        <div style={{ width: '400px' }}>
          <h5 style={{ marginLeft: '60px' }}>Name</h5>
          <input
            type="text"
            id="name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            style={{ width: 'calc(100% - 16px)', marginLeft: '60px', padding: '8px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <h5 style={{ marginLeft: '60px' }}>Description</h5>
          <textarea
            id="groupDescriptions"
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            style={{ width: '385px', marginLeft: '60px', height: '100px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <div>
          <button onClick={handleSave} style={{ width: '8rem', height: '40px', backgroundColor: 'rgb(93, 93, 87)', marginTop: '1rem', marginLeft: '60px', fontSize: '18px', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '4px', outline: 'none', transition: 'background-color 0.3s ease', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>SAVE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeesGroupPage;
