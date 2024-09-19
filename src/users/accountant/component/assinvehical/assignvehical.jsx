import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore'; 
import { db } from '../../../../utils/firebaseConfig';

export default function AssignVehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');
  const [transportData, setTransportData] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const vehicleSnapshot = await getDocs(collection(db, 'vehicle'));
        const vehicleList = vehicleSnapshot.docs.map(doc => doc.data().vehicleNo);
        setVehicles(vehicleList);
      } catch (error) {
        console.error('Error fetching vehicles: ', error);
      }
    };

    const fetchRoutes = async () => {
      try {
        const routeSnapshot = await getDocs(collection(db, 'routes'));
        const routeList = routeSnapshot.docs.map(doc => doc.data().title);
        setRoutes(routeList);
      } catch (error) {
        console.error('Error fetching routes: ', error);
      }
    };

    const fetchTransportData = async () => {
      try {
        const transportSnapshot = await getDocs(collection(db, 'transport'));
        const transportList = transportSnapshot.docs.map(doc => doc.data());
        setTransportData(transportList);
      } catch (error) {
        console.error('Error fetching transport data: ', error);
      }
    };

    fetchVehicles();
    fetchRoutes();
    fetchTransportData();
  }, []);

  const handleSave = async () => {
    try {
      if (selectedVehicle && selectedRoute) { // Check if both vehicle and route are selected
        await addDoc(collection(db, 'transport'), {
          vehicle: selectedVehicle,
          route: selectedRoute
        });
        alert('Route information saved successfully!');
      } else {
        alert('Please select both vehicle and route.');
      }
    } catch (error) {
      console.error('Error saving route information:', error);
      alert('Error saving route information. Please try again later.');
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ background: "white", width: "30rem" }}>
        <div>
          <h2 style={{ color: "black", marginLeft: "7px", marginTop: "5px" }}>Assign Vehicle On Route</h2>
          <hr />
          <h5 style={{ marginTop: "20px", marginLeft: "7px" }}>Vehicle</h5>
          <select
            style={{ width: "29rem" }}
            id="selectedVehicle"
            name="selectedVehicle"
            className="select-field"
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
          >
            <option value="">Select</option>
            {vehicles.map((vehicle, index) => (
              <option key={index} value={vehicle}>{vehicle}</option>
            ))}
          </select>
          <h5 style={{ marginTop: "20px", marginLeft: "7px" }}>Route</h5>
          <select
            style={{ width: "29rem" }}
            id="selectedRoute"
            name="selectedRoute"
            className="select-field"
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
          >
            <option value="">Select</option>
            {routes.map((route, index) => (
              <option key={index} value={route}>{route}</option>
            ))}
          </select>
          
          <button onClick={handleSave} style={{ marginLeft: "73%", marginBottom: "10px", width: "5.5rem", height: "30px", backgroundColor: "#0056b3", color: "white" }}>Save</button>
        </div>
      </div>
      <div style={{ marginLeft: "7px", backgroundColor: "white", width: "51rem" }}>
        <h2 style={{ color: "black", marginLeft: "7px", marginTop: "5px" }}>Vehicle Route List</h2>
        <hr />
        <div>
          <input style={{ width: "10rem", borderTop: "1px whitesmoke", marginLeft: "7px" }} type="search" placeholder="Search ..." />
        </div>
      
        <hr />
        <table style={{width:"50rem"}}>
          <thead>
            <tr>
              <th>Route</th>
              <th>Vehicle</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transportData.map((item, index) => (
              <tr key={index}>
                <td>{item.route}</td>
                <td>{item.vehicle}</td>
                <td>Edit / Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
