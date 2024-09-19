// FeesMasterForm.jsx
import React, { useEffect, useState } from "react";
import { fetchClasses, fetchFeesGroups, fetchFeesTypes, handleChange } from "./feesMasterFunction";
import './feesmaster.css';

function FeesMasterForm() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [feesGroups, setFeesGroups] = useState([]);
  const [feesTypes, setFeesTypes] = useState([]);
  const [feesData, setFeesData] = useState({
    feesGroup: "",
    feesType: "",
    dueDate: "",
    amount: "",
    amountType: "",
    percentage: "",
    fixedAmount: "",
  });

  useEffect(() => {
    fetchClasses(setClasses);
    fetchFeesGroups(setFeesGroups);
    fetchFeesTypes(setFeesTypes);
    // Freeze the page by setting overflow to hidden when component mounts
    document.body.style.overflow = 'hidden';

    // Restore overflow when component unmounts
    return () => {
      document.body.style.overflow = ''; // Empty string restores default overflow behavior
    };
  }, []);

  return (
    <div style={{ display: 'flex', marginLeft: '60px' }}>
    {/* Fees Group List */}
    <div style={{ flex: 1, height: '610px', width: '40%', padding: '20px', border: '1px solid #ccc', borderRadius: '2px', backgroundColor: '#e0e0e0', marginRight: '10px', marginBottom: '20px', overflowY: 'auto', overflowX: 'hidden' }}>
        <h3 style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif', color: "rgb(95, 88, 88)", marginBottom: "20px", fontSize: "30px" }}>Fees Master List: 2023-24</h3>
        <form style={{ width: "850px"}}>
          <input type="text" placeholder="Search..." style={{ width: "400px" }} />
        </form>
        <div style={{ marginTop: "20px" }}>
          <table style={{ width: "610px", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ backgroundColor: "#b1abab", color: "#1a0707", border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Fees Group</th>
                <th style={{ backgroundColor: "#b1abab", color: "#1a0707", border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Fees Code</th>
                <th style={{ backgroundColor: "#b1abab", color: "#1a0707", border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Amount</th>
                <th style={{ backgroundColor: "#b1abab", color: "#1a0707", border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Your table body content */}
            </tbody>
          </table>
          <hr style={{ margin: "20px 0", border: "none", borderTop: "1px solid #ccc" }} />
          <div style={{ flex: '1', margin: '10px' }}>
  
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ marginRight: "10px", marginBottom: "20px" }}>
          <div>
            <h3 style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif', color: "rgb(95, 88, 88)", marginBottom: "20px", fontSize: "30px", marginLeft: "60px", marginTop: "10px" }}>Fees Master: 2023-24</h3>
            <div>
              <h5 style={{marginLeft: "60px"}}>Select Class </h5>
              <select
                id="selectedClass"
                name="selectedClass"
                style={{ width: "90%", marginLeft: "60px", padding: "8px", marginTop: "5px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Select</option>
                {classes.map((item, index) => (
                  <option key={index} value={item.id}>{item.className}</option>
                ))}
              </select>
            </div>
            <div>
              <h5 style={{marginLeft: "60px"}}>Fees Group</h5>
              <select
                id="feesGroup"
                name="feesGroup"
                style={{ width: "90%", marginLeft: "60px", padding: "8px", marginTop: "5px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                value={feesData.feesGroup}
                onChange={(e) => handleChange(e, setFeesData, feesData)}
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
            <div>
              <h5 style={{marginLeft: "60px"}}>Fees Type</h5>
              <select
                id="feesType"
                name="feesType"
                style={{ width: "90%", padding: "8px", marginLeft: "60px", marginTop: "5px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                value={feesData.feesType}
                onChange={(e) => handleChange(e, setFeesData, feesData)}
              >
                <option value="">Select</option>
                {feesTypes.map((type) => (
                  <option
                    key={type.id}
                    value={type.id}
                  >
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h5 style={{marginLeft: "60px"}}>Due Date</h5>
              <input 
                type="date" 
                id="due-date" 
                name="dueDate" 
                style={{ width: " 90%", padding: "8px", marginLeft: "60px", marginTop: "5px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                value={feesData.dueDate}
                onChange={(e) => handleChange(e, setFeesData, feesData)}
              />
            </div>
            <div>
              <h5 style={{marginLeft: "60px"}}>Amount ($)</h5>
              <input
                id="amount"
                name="amount"
                type="number"
                style={{ width: "90%", padding: "8px", marginLeft: "60px", marginTop: "5px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                value={feesData.amount}
                onChange={(e) => handleChange(e, setFeesData, feesData)}
              />
            </div>
            <div>
              <h5 style={{marginLeft: "60px"}}>Fine Type</h5>
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px", marginTop: "20px" }}>
                <label htmlFor="amountTypeNone" style={{marginLeft: "60px"}}>None</label>
                <input
                  type="radio"
                  id="amountTypeNone"
                  name="amountType"
                  value="none"
                  style={{ marginRight: "40px", marginLeft: "10px"}}
                  onChange={(e) => handleChange(e, setFeesData, feesData)}
                />
                <label htmlFor="amountTypePercentage" style={{marginLeft: "10px"}}>Percentage</label>
                <input
                  type="radio"
                  id="amountTypePercentage"
                  name="amountType"
                  value="percentage"
                  style={{ marginRight: "40px", marginLeft: "10px" }}
                  onChange={(e) => handleChange(e, setFeesData, feesData)}
                />
                <label htmlFor="amountTypeFixedAmount" style={{marginLeft: "1px"}}>Fixed Amount</label>
                <input
                  type="radio"
                  id="amountTypeFixedAmount"
                  name="amountType"
                  value="fixedAmount"
                  style={{ marginRight: "40px", marginLeft: "10px" }}
                  onChange={(e) => handleChange(e, setFeesData, feesData)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="percentage" style={{marginLeft: "60px"}}>Percentage (%)</label> <br></br>
              <input
                id="percentage"
                name="percentage"
                style={{ width: "90%", padding: "8px", marginLeft: "60px", marginTop: "5px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                value={feesData.percentage}
                onChange={(e) => handleChange(e, setFeesData, feesData)}
                disabled={feesData.amountType === "none" || feesData.amountType === "fixedAmount"}
              />
            </div>
            <div>
              <label htmlFor="fixedAmount" style={{marginLeft: "60px"}}>Fixed Amount ($)</label> <br></br>
              <input
                id="fixedAmount"
                name="fixedAmount"
                style={{ width: "90%", padding: "8px", marginTop: "5px", marginLeft: "60px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                value={feesData.fixedAmount}
                onChange={(e) => handleChange(e, setFeesData, feesData)}
                disabled={feesData.amountType === "none" || feesData.amountType === "percentage"}
              />
              <div style={{ marginTop: "10px" }}>
                <button style={{ width: '8rem', height: '40px', backgroundColor: 'rgb(93, 93, 87)', marginTop: '-1rem', marginLeft: '60px', fontSize: '18px', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '4px', outline: 'none', transition: 'background-color 0.3s ease', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>SAVE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

  export default FeesMasterForm;