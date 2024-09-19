import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../../utils/firebaseConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Expense() {
  const [expenseHead, setExpenseHead] = useState('');
  const [name, setName] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expenseHeadOptions, setExpenseHeadOptions] = useState([]);

  useEffect(() => {
    const fetchExpenseHeads = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'headExpenses'));
        const expenseHeadsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setExpenseHeadOptions(expenseHeadsData.map(head => head.name));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching expense heads: ', error);
      }
    };

    fetchExpenseHeads();
  }, []);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'expenses'));
        const expensesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setExpenses(expensesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching expenses: ', error);
      }
    };

    fetchExpenses();
  }, []);

  const handleSave = async () => {
    try {
      const expenseRef = await addDoc(collection(db, 'expenses'), {
        expenseHead,
        name,
        invoiceNo,
        date,
        amount,
        description
      });
      console.log('Expense added with ID: ', expenseRef.id);
      // Optionally, clear the form after saving
      setExpenseHead('');
      setName('');
      setInvoiceNo('');
      setDate('');
      setAmount('');
      setDescription('');
      // Add the new expense to the expenses state
      setExpenses([...expenses, { id: expenseRef.id, expenseHead, name, invoiceNo, date, amount, description }]);
      // Show toast message for success
      toast.success('Expense added successfully!');
    } catch (error) {
      console.error('Error adding expense: ', error);
      // Show toast message for error
      toast.error('Failed to add expense');
    }
  };

  const handleDelete = async (id) => {
    try {
      // Delete the document from Firestore
      await deleteDoc(doc(db, 'expenses', id));
      // Update the expenses state after deletion
      setExpenses(expenses.filter(expense => expense.id !== id));
      // Show toast message for success
      toast.success('Expense deleted successfully!');
    } catch (error) {
      console.error('Error deleting expense: ', error);
      // Show toast message for error
      toast.error('Failed to delete expense');
    }
  };

  const filteredExpenses = expenses.filter(expense => {
    return (
      expense.expenseHead.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.amount.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      {/* Add Expense Section */}
      <div style={{ background: 'white', width: '30rem', padding: '20px', marginRight: '20px' }}>
        <h2 style={{ color: 'black', marginTop: '5px' }}>Add Expense</h2><hr />
        <div>
          <h5>Expense Head</h5>
          <select
            style={{ width: '100%' }}
            value={expenseHead}
            onChange={e => setExpenseHead(e.target.value)}
          >
            <option value="">Select</option>
            {expenseHeadOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        {/* Other input fields */}
        {/* Name */}
        <div>
          <h5>Name</h5>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        {/* Invoice No */}
        <div>
          <h5>Invoice No</h5>
          <input
            type="text"
            value={invoiceNo}
            onChange={e => setInvoiceNo(e.target.value)}
          />
        </div>
        {/* Date */}
        <div>
          <h5>Date</h5>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        {/* Amount */}
        <div>
          <h5>Amount</h5>
          <input
            type="text"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>
        {/* Attach Document */}
        <div>
          <h5>Attach Document</h5>
          <input
            type="file"
            // Add onChange handler if needed
          />
        </div>
        {/* Description */}
        <div>
          <h5>Description</h5>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        {/* Save button */}
        <Button
          style={{ marginTop: '10px', width: '100%', height: '30px', backgroundColor: '#0056b3', color: 'white' }}
          onClick={handleSave}
          variant="contained"
        >
          Save
        </Button>
      </div>

      {/* Expense List Section */}
      <div style={{ background: 'white', width: '50rem', padding: '20px' }}>
        {/* Search input */}
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        {/* Table for displaying expenses */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Expense Head</th>
              <th>Name</th>
              <th>Description</th>
              <th>Invoice No</th>
              <th>Date</th>
              <th>Amount ($)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7">Loading expenses...</td></tr>
            ) : (
              filteredExpenses.map(expense => (
                <tr key={expense.id}>
                  <td>{expense.expenseHead}</td>
                  <td>{expense.name}</td>
                  <td>{expense.description}</td>
                  <td>{expense.invoiceNo}</td>
                  <td>{expense.date}</td>
                  <td>{expense.amount}</td>
                  <td>
                    <Button onClick={() => handleDelete(expense.id)} variant="contained" color="error">
                      Delete
                    </Button>
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
