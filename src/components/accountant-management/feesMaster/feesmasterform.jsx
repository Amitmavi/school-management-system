import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, addDoc,doc, setDoc, serverTimestamp } from "firebase/firestore";
import "./feesmasterform.css";

function FeesMasterForm() {
  const [students, setStudents] = useState([]);
  const [feesData, setFeesData] = useState({
    feesGroup: "",
    feesType: "",
    dueDate: "",
    amount: "",
    student: "", // Add a new state for selected student
    amountType: "", // Add a new state for selected fine type
    percentage: "", // Add a new state for percentage
    fixAmount: "", // Add a new state for fix amount
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const db = getFirestore();
      const studentsCollection = collection(db, "students");
      const studentsSnapshot = await getDocs(studentsCollection);
      const studentList = [];
      studentsSnapshot.forEach((doc) => {
        studentList.push({ id: doc.id, ...doc.data() });
      });
      setStudents(studentList);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amountType") {
      if (value === "none") {
        setFeesData((prevState) => ({
          ...prevState,
          percentage: "",
          fixAmount: "",
          [name]: value,
        }));
      } else if (value === "percentage") {
        const today = new Date().toISOString().split("T")[0];
        setFeesData((prevState) => ({
          ...prevState,
          dueDate: today,
          [name]: value,
        }));
      } else {
        setFeesData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else {
      setFeesData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const db = getFirestore();
      const studentRef = doc(db, "students", feesData.student);
  
      // Ensure the "fees" collection exists under the selected student's document, if not create it
      await setDoc(studentRef, {}, { merge: true });
  
      // Create or get the fees type document under the "fees" collection based on the selected fees type
      const feesTypeDocRef = doc(studentRef, "fees", feesData.feesType);
  
      // Add additional details along with the fees data
      const feesDataToAdd = {
        feesType: feesData.feesType, // Use the selected fees type directly
        groupName: feesData.feesGroup, // Assuming feesData.feesGroup contains the group name
        dueDate: feesData.dueDate, // Assuming feesData.dueDate contains the due date
        amount: feesData.amount,
        timestamp: serverTimestamp() // Add server timestamp for date and time
      };
  
      // Save the fees data directly under the fees type document
      await setDoc(feesTypeDocRef, feesDataToAdd, { merge: true });
  
      // If a fine is selected, add fine data to the "fine" collection within the selected fees type document
      if (feesData.amountType !== "none") {
        const fineDataToAdd = {
          amountType: feesData.amountType,
          amount: feesData.amountType === "percentage" ? feesData.percentage : feesData.fixAmount,
          timestamp: serverTimestamp() // Add server timestamp for date and time
        };
        const fineCollectionRef = collection(feesTypeDocRef, "fine");
        await addDoc(fineCollectionRef, fineDataToAdd);
      }
  
      console.log("Fee and fine data saved successfully!");
    } catch (error) {
      console.error("Error saving fee and fine data:", error);
    }
  };
  

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "1", marginRight: "10px" }}>
        <h2>Add Fees Master: 2023-24</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <h5>Select Student</h5>
            <select
              id="student"
              name="student"
              value={feesData.student}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {students.map((student) => (
                <option
                  key={student.id}
                  value={student.id} 
                >
                  {student.firstName} {student.lastName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h5>Fees Group</h5>
            <select id="feesGroup" name="feesGroup" onChange={handleChange}>
              <option value="">Select</option>
              <option value="group1">Group 1</option>
              <option value="group2">Group 2</option>
              <option value="group3">Group 3</option>
            </select>
          </div>
          <div>
            <h5>Fees Type</h5>
            <select id="feesType" name="feesType" onChange={handleChange}>
              <option value="">Select</option>
              <option value="type1">Tution Fee</option>
              <option value="type2">Transport Fee</option>
              <option value="type3">Practical Fee</option>
              <option value="type4">Examination Fee</option>
            </select>
          </div>
          <div>
            <h5>Due Date</h5>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={feesData.dueDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <h5>Amount ($)</h5>
            <input
              type="text"
              id="amount"
              name="amount"
              value={feesData.amount}
              onChange={handleChange}
            />
          </div>
          <div>
            <h5>Fine Type</h5>
            <div className="label">
              <label htmlFor="amountTypeNone">None</label>
              <input
                type="radio"
                id="amountTypeNone"
                name="amountType"
                value="none"
                onChange={handleChange}
              />
              <label htmlFor="amountTypePercentage">Percentage</label>
              <input
                type="radio"
                id="amountTypePercentage"
                name="amountType"
                value="percentage"
                onChange={handleChange}
              />
              <label htmlFor="amountTypeFixAmount">Fix Amount</label>
              <input
                type="radio"
                id="amountTypeFixAmount"
                name="amountType"
                value="fixAmount"
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="percentage">Percentage (%)</label>
            <input
              type="text"
              id="percentage"
              name="percentage"
              value={feesData.percentage}
              onChange={handleChange}
              disabled={feesData.amountType === "none" || feesData.amountType === "fixAmount"}
            />
          </div>
          <div>
            <label htmlFor="fixAmount">Fix Amount ($)</label>
            <input
              type="text"
              id="fixAmount"
              name="fixAmount"
              value={feesData.fixAmount}
              onChange={handleChange}
              disabled={feesData.amountType === "none" || feesData.amountType === "percentage"}
            />
          </div>
          <button style={{ margin: "10px" }}>Save</button>
        </form>
      </div>
      <div
        style={{
          flex: "1",
          overflowY: "scroll",
          overflowX: "hidden",
          height: "calc(100vh - 100px)",
        }}
      >
        <h2>Fees Master List: 2023-24</h2>
        <form>
          <input type="text" placeholder="Search..." />
        </form>
        <div className="card-list">
          <table style={{ height: "15px" }}>
            <thead>
              <tr style={{ backgroundColor: "white", color: "black" }}>
                <th>Fees Group</th>
                <th>Fees Code</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Group 1</td>
                <td>Code 001</td>
                <td>$100</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <div>
            <hr />
          </div>
          <h2>Fees</h2>
          <h2>Fees</h2>
          <h2>Fees</h2>
          <h2>Fees</h2>
          <h2>Fees</h2>
          <h2>Fees</h2>
          <h2>Fees</h2>
          <h2>Fees</h2>
          <h2>Fees</h2>
          <h2>Fees</h2>
          <h2>Fees</h2>
          <h2>Fees</h2>
          <h2>Fees</h2>
          <h2>Fees</h2>
          <h2>Fees</h2>
          <h2>Fees</h2>
          <h2>Fees</h2>
        </div>
      </div>
    </div>
  );
}

export default FeesMasterForm;
