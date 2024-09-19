import React, { useState, useEffect } from 'react';
import { db } from '../../../../utils/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default function Vehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    driverName: '',
    chasisNumber: '',
    vehicleModel: '',
    vehicleNo: '',
    yearModel: '',
    registrationNo: '',
    maxCapacity: '',
    driverContact: '',
    vehicleType:'',
    driverLicense: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const transportRef = collection(db, 'vehicle');
      const snapshot = await getDocs(transportRef);
      const vehicleData = snapshot.docs.map(doc => doc.data());
      setVehicles(vehicleData);
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add a new document with the newVehicle data
      await addDoc(collection(db, 'vehicle'), newVehicle);
      console.log('New vehicle added successfully');
    } catch (error) {
      console.error('Error adding document: ', error);
    }

    // Reset the form and hide it
    setNewVehicle({
      driverName: '',
      chasisNumber: '', 
      vehicleModel: '',
      vehicleNo: '',
      yearModel: '',
      registrationNo: '',
      maxCapacity: '',
      driverContact: '',
      vehicleType:'',
      driverLicense: ''
    });
    setShowForm(false);
  };

  return (
    <div>
      <div style={{ background: "white" }}>
        <h2 style={{ marginLeft: "7px", fontFamily: "sans-serif" }}>Vehicle List</h2>
        <button
          style={{ background: "#0056b3", marginLeft: "75.6rem", marginRight: "7px", width: "5.5rem", height: "30px", backgroundColor: "#0056b3", color: "white" }}
          onClick={() => setShowForm(true)}
        >
          Add
        </button>
        {showForm && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '80%', background: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}>
            <form onSubmit={handleSubmit} style={{ width: '80%', margin: '10% auto', background: '#fff', padding: '20px', borderRadius: '10px', maxHeight: '80%', overflowY: 'auto' }}>
              <button
                style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '20px' }}
                onClick={() => setShowForm(false)}
              >
                Close
              </button>
              <div>
                <label>Vehicle No:</label>
                <input
                  type="text"
                  name="vehicleNo"
                  value={newVehicle.vehicleNo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Vehicle Model:</label>
                <input
                  type="text"
                  name="vehicleModel"
                  value={newVehicle.vehicleModel}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Year Model:</label>
                <input
                  type="text"
                  name="yearModel"
                  value={newVehicle.yearModel}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Registration No:</label>
                <input
                  type="text"
                  name="registrationNo"
                  value={newVehicle.registrationNo}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label>Chasis Number:</label>
                <input
                  type="text"
                  name="chasisNumber"
                  value={newVehicle.chasisNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label>Driver Name:</label>
                <input
                  type="text"
                  name="driverName"
                  value={newVehicle.driverName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Driver Licence:</label>
                <input
                  type="text"
                  name="driverLicense"
                  value={newVehicle.driverLicense}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Driver Contact:</label>
                <input
                  type="text"
                  name="driverContact"
                  value={newVehicle.driverContact}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Vehicle Type:</label>
                <input
                  type="text"
                  name="vehicleType"
                  value={newVehicle.vehicleType}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Max Sheet Capacity:</label>
                <input
                  type="text"
                  name="maxCapacity"
                  value={newVehicle.maxCapacity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit"  style={{ background: "#0056b3", width: "5.5rem", height: "30px", backgroundColor: "#0056b3", color: "white" }}>Save</button>
              <button   
                style={{ background: "#0056b3", marginLeft: "2rem", width: "5.5rem", height: "30px", backgroundColor: "#0056b3", color: "white" }}
                onClick={() => {
                  if (window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
                    setNewVehicle({
                      driverName: '',
                      chasisNumber: '',
                      vehicleModel: '',
                      vehicleNo: '',
                      yearModel: '',
                      registrationNo: '',
                      maxCapacity: '',
                      driverContact: '',
                      vehicleType:'',
                      driverLicense: ''
                    });
                    setShowForm(false);
                  }
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        )}
        <div>
          <input style={{ width: "10rem", borderTop: "1px whitesmoke", marginLeft: "7px" }}
            type="search"
            placeholder="Search ..."
          />
        </div>
        <hr />
        <div>
          <table style={{width:"79.5rem"}}>
            <thead>
              <tr>
                <th>VehicleNo</th>
                <th>Vehicle Model</th>
                <th>Year Model</th>
                <th>Registration No</th>
                <th>Chasis Number</th>
                <th>Driver Name</th>
                <th>Driver Licence</th>
                <th>Driver Contact</th>
                <th>vehicle Type</th>
                <th>Max Setting Capacity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle, index) => (
                <tr key={index}>
                  <td>{vehicle.vehicleNo}</td>
                  <td>{vehicle.vehicleModel}</td>
                  <td>{vehicle.yearModel}</td>
                  <td>{vehicle.registrationNo}</td>
                  <td>{vehicle.chasisNumber}</td>
                  <td>{vehicle.driverName}</td>
                  <td>{vehicle.driverLicense}</td>
                  <td>{vehicle.driverContact}</td>
                  <td>{vehicle.vehicleType}</td>
                  <td>{vehicle.maxCapacity}</td>
                  <td>
                    <button>Edit</button>
                    <button style={{marginLeft:"7px"}}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
