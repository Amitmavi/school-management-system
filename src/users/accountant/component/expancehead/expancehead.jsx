import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../../utils/firebaseConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ExpenseHead() {
  const [expenseHeadName, setExpenseHeadName] = useState('');
  const [expenseHeadDescription, setExpenseHeadDescription] = useState('');
  const [expenseHeads, setExpenseHeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchExpenseHeads = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'headExpenses'));
      const expenseHeadsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setExpenseHeads(expenseHeadsData);
      setLoading(false);
    };

    fetchExpenseHeads();
  }, []);

  const handleSave = async () => {
    try {
      const expenseHeadRef = await addDoc(collection(db, 'headExpenses'), {
        name: expenseHeadName,
        description: expenseHeadDescription
      });
      console.log('Expense head added with ID: ', expenseHeadRef.id);
      // Optionally, clear the form after saving
      setExpenseHeadName('');
      setExpenseHeadDescription('');
      // Show toast message for success
      toast.success('Expense head added successfully!');
    } catch (error) {
      console.error('Error adding expense head: ', error);
      // Show toast message for error
      toast.error('Failed to add expense head');
    }
  };

  const handleDelete = async (id) => {
    try {
      // Delete the document from Firestore
      await deleteDoc(doc(db, 'headExpenses', id));
      // Update the expense heads state after deletion
      setExpenseHeads(expenseHeads.filter(expenseHead => expenseHead.id !== id));
      // Show toast message for success
      toast.success('Expense head deleted successfully!');
    } catch (error) {
      console.error('Error deleting expense head: ', error);
      // Show toast message for error
      toast.error('Failed to delete expense head');
    }
  };

  const filteredExpenseHeads = expenseHeads.filter(expenseHead =>
    expenseHead.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex' }}>
      {/* Add Expense Head Section */}
      <div style={{ background: 'white', width: '30rem', padding: '20px', marginRight: '20px' }}>
        <h2 style={{ color: 'black', marginTop: '5px' }}>Add Expense Head</h2><hr />
        <div>
          <h5>Expense Head Name</h5>
          <input
            type="text"
            value={expenseHeadName}
            onChange={e => setExpenseHeadName(e.target.value)}
          />
        </div>
        <div>
          <h5>Description</h5>
          <input
            type="text"
            value={expenseHeadDescription}
            onChange={e => setExpenseHeadDescription(e.target.value)}
          />
        </div>
        <button
          style={{ marginTop: '10px', width: '100%', height: '30px', backgroundColor: '#0056b3', color: 'white' }}
          onClick={handleSave}
        >
          Save
        </button>
      </div>

      {/* Expense Head List Section */}
      <div style={{ background: 'white', width: '40rem', padding: '20px' }}>
        <h2 style={{ color: 'black', marginTop: '5px' }}>Expense Head List</h2><hr />
        <div>
          <input
            style={{ width: '10rem', borderTop: '1px whitesmoke', marginLeft: '7px' }}
            type="search"
            placeholder="Search ..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', marginTop: '10px' }}>
          <h5 style={{ marginLeft: '5px', width: '15rem' }}>Expense Head</h5>
          <h5 style={{ marginLeft: '5rem', width: '15rem' }}>Description</h5>
          <h5 style={{ marginLeft: '5rem', width: '10rem' }}>Action</h5>
        </div><hr/>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {loading ? (
              <tr><td colSpan="3">Loading expense heads...</td></tr>
            ) : (
              filteredExpenseHeads.map(expenseHead => (
                <tr key={expenseHead.id}>
                  <td style={{ width: '15rem' }}>{expenseHead.name}</td>
                  <td style={{ width: '15rem' }}>{expenseHead.description}</td>
                  <td style={{ width: '10rem' }}>
                    <button onClick={() => handleDelete(expenseHead.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
