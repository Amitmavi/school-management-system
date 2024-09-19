import React, { useState, useEffect } from 'react';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { db } from '../../../utils/firebaseConfig'; // Import your Firebase config
import { collection, getDocs } from 'firebase/firestore';
import axios from 'axios'; // Import Axios for making HTTP requests


function CollectFeesPopper({ open, handleClose, selectedGroupName, selectedFeesCode,studentUId }) {
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [discountGroup, setDiscountGroup] = useState('');
    
    const [note, setNote] = useState('');
    const [fine, setFine] = useState('');

    const [discountGroups, setDiscountGroups] = useState([]);
    const [fixedAmount, setFixedAmount] = useState('');

    useEffect(() => {
        const fetchDiscountGroups = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'feesDiscount'));
                const groups = [];
                querySnapshot.forEach((doc) => {
                    groups.push({
                        id: doc.id,
                        name: doc.data().name,
                        fixAmount: doc.data().fixAmount
                    });
                });
                setDiscountGroups(groups);
            } catch (error) {
                console.error('Error fetching discount groups:', error);
            }
        };

        fetchDiscountGroups();
    }, []);

    useEffect(() => {
        // Update discount amount when discount group changes
        const selectedGroup = discountGroups.find(group => group.id === discountGroup);
        if (selectedGroup) {
            setFixedAmount(selectedGroup.fixAmount || '');
        }
    }, [discountGroup, discountGroups]);

    const initiatePayment = async () => {
        try {
            const payload = {
                merchantId: "PGTESTPAYUAT",
                merchantTransactionId: "MT7850590068188104", // Replace with a unique identifier for the transaction
                merchantUserId: "MU933037302229373", // Replace with the user ID associated with the transaction
                amount: parseFloat(amount),
                callbackUrl: "https://webhook.site/callback-url", // Replace with your callback URL
                mobileNumber: "9999999999", // Replace with the customer's mobile number
                deviceContext: {
                    deviceOS: "ANDROID" // Specify the device OS if needed
                },
                paymentInstrument: {
                    type: "UPI_INTENT", // Specify the payment instrument type
                    targetApp: "com.phonepe.app" // Specify the target app for UPI payment
                },
                date: date,
                discountGroup: discountGroup,
                fixedAmount: parseFloat(fixedAmount),
                fine: parseFloat(fine),
                note: note
            };
    
            // Make an HTTP POST request to the UAT Pay API URL
            const response = await axios.post('https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay', payload);
    
            // Handle the response
            console.log('Payment initiated successfully:', response.data);
            // You can perform further actions here if needed
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };
    



    return (
        <Popper open={open} transition style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999 }}>
            <Paper style={{ padding: '20px', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', backgroundColor: '#abdbe3' }}>
                <h2>Collect Fees</h2>
                <h3>Group Name: {selectedGroupName}</h3>
                <h3>Fee Code: {selectedFeesCode}</h3>
                <h3>Student ID: {studentUId}</h3>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ position: 'relative' }}>
                <TextField
                    label="Date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    margin="normal"
                    style={{ flex: 1 }}
                />
                <TextField
                    label="Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    fullWidth
                    margin="normal"
                    style={{ flex: 1 }}
                />
</div>
</div>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ position: 'relative' }}>
                        <label htmlFor="discountGroup" style={{ fontFamily: 'Roboto', fontSize: '16px', marginBottom: '8px' }}>Discount Group</label>
                        <select
                            id="discountGroup"
                            value={discountGroup}
                            onChange={(e) => setDiscountGroup(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ced4da',
                                borderRadius: '4px',
                                backgroundColor: '#fff',
                                fontFamily: 'Roboto',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
                            }}
                        >
                            <option value="">Select a group</option>
                            {discountGroups.map((group) => (
                                <option key={group.id} value={group.id}>{group.name}</option>
                            ))}
                        </select>
                    </div>
                    <TextField
                        label="Discount"
                        type="number"
                        value={fixedAmount}
                        onChange={(e) => setFixedAmount(e.target.value)}
                        fullWidth
                        margin="normal"
                        style={{ flex: 1 }}
                    />
                    <TextField
                        label="Fine"
                        type="number"
                        value={fine}
                        onChange={(e) => setFine(e.target.value)}
                        fullWidth
                        margin="normal"
                        style={{ flex: 1 }}
                    />
                </div>

                <TextField
                    label="Note (Discount & Fine)"
                    multiline
                    rows={2}
                       value={note}
                    onChange={(e) => setNote(e.target.value)}
                    fullWidth
                    margin="normal"
                />
               
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <Button onClick={handleClose} color="secondary" variant="contained">
                        Cancel
                    </Button>
                    <Button onClick={initiatePayment} color="primary" variant="contained">
                        Initiate Payment
                    </Button>
                </div>

               
            </Paper>
        </Popper>
    );
}

export default CollectFeesPopper;
