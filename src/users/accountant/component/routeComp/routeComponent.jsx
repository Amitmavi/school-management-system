import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, deleteDoc, setDoc } from 'firebase/firestore';

function RouteComponent() {
  const [routeTitle, setRouteTitle] = useState('');
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const db = getFirestore();
      const routesCollectionRef = collection(db, 'routes');
      const querySnapshot = await getDocs(routesCollectionRef);

      const routeData = [];
      querySnapshot.forEach(doc => {
        routeData.push({ id: doc.id, ...doc.data() });
      });

      setRoutes(routeData);
    } catch (error) {
      console.error('Error fetching routes:', error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      const db = getFirestore();
      const routesCollectionRef = collection(db, 'routes');

      // Create a new document with the route title
      await setDoc(doc(routesCollectionRef), { title: routeTitle });

      alert('Route information saved successfully!');
      setRouteTitle(''); // Clear input field after saving
      fetchRoutes(); // Refresh routes after creating a new one
    } catch (error) {
      console.error('Error saving route information:', error);
      alert('Error saving route information. Please try again later.');
    }
  };

  const handleUpdate = async (routeId, newTitle) => {
    try {
      const db = getFirestore();
      const routeDocRef = doc(db, 'routes', routeId);

      // Update the document with the new title
      await setDoc(routeDocRef, { title: newTitle }, { merge: true });

      alert('Route information updated successfully!');
      fetchRoutes(); // Refresh routes after updating
    } catch (error) {
      console.error('Error updating route information:', error);
      alert('Error updating route information. Please try again later.');
    }
  };

  const handleDelete = async (routeId) => {
    try {
      const db = getFirestore();
      const routeDocRef = doc(db, 'routes', routeId);

      // Delete the document
      await deleteDoc(routeDocRef);

      alert('Route deleted successfully!');
      fetchRoutes(); // Refresh routes after deleting
    } catch (error) {
      console.error('Error deleting route:', error);
      alert('Error deleting route. Please try again later.');
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Left Side */}
      <div style={{ flex: 1, marginRight: '10px', marginBottom: '20px' }}>
        <div>
          <h3 style={{ fontFamily: 'Georgia, Times, serif', color: 'rgb(95, 88, 88)', marginBottom: '20px', fontSize: '30px', marginLeft: '10px', marginTop: '10px' }}>Create Route</h3>
          <form onSubmit={handleCreate}>
            <div>
              <h3 style={{ marginLeft: "10px" }}>Route Title</h3>
              <input
                id="routeTitle"
                name="routeTitle"
                value={routeTitle}
                onChange={(e) => setRouteTitle(e.target.value)}
                style={{ width: "70%", padding: "8px", marginLeft: "10px", marginTop: "5px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
              />
            </div>
            <div>
              <button type="submit" style={{ width: '8rem', height: '40px', backgroundColor: 'rgb(93, 93, 87)', marginTop: '0rem', marginLeft: '8px', fontSize: '18px', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '4px', outline: 'none', transition: 'background-color 0.3s ease', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>SAVE</button>
            </div>
          </form>
        </div>
      </div>
      {/* Right Side */}
      <div style={{ flex: 1, height: "610px", width: "40%", padding: "20px", border: "1px solid #ccc", borderRadius: "2px", backgroundColor: "#e0e0e0", marginRight: "10px", marginBottom: "20px" }}>
        <h3 style={{ fontFamily: 'Georgia, Times, serif', color: 'rgb(95, 88, 88)', marginBottom: '20px', fontSize: '30px', marginLeft: '5px', marginTop: '10px' }}>Route List</h3>
        <form style={{ width: "100px" }}>
          <input type="text" placeholder="Search..." className="search-input" style={{ width: '400px' }} />
        </form >
        <div style={{ marginTop: "20px", width: "1020px" }}>
          <table style={{ width: "630px", borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ backgroundColor: '#b1abab', color: '#1a0707', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Route Title</th>
                <th style={{ backgroundColor: '#b1abab', color: '#1a0707', border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route, index) => (
                <tr key={index}>
                  <td>{route.title}</td>
                  <td>
                    <button onClick={() => handleUpdate(route.id, prompt("Enter new title"))}>Update</button>
                    <button onClick={() => handleDelete(route.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #ccc' }} />
        </div>
      </div>
    </div>
  );
}

export default RouteComponent;
