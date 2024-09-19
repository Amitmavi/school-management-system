import React, { useState, useEffect } from 'react';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { doc, getDoc, collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../../utils/firebaseConfig';
import PrintIcon from '@mui/icons-material/Print';
import MoneyIcon from '@mui/icons-material/Money';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import CollectFeesPopper from './collectFeesPopper';
import Checkbox from '@mui/material/Checkbox';

function StudentFeesPopper({ studentId, anchorEl, handleClose }) {
    const [studentData, setStudentData] = useState(null);
    const [currentDate, setCurrentDate] = useState('');
    const [feesGroups, setFeesGroups] = useState([]);
    const [collectFeesPopperOpen, setCollectFeesPopperOpen] = useState(false);
    const [selectedFeesCode, setSelectedFeesCode] = useState('');
    const [selectedGroupName, setSelectedGroupName] = useState('');
    const [selectedFeeCodes, setSelectedFeeCodes] = useState([]);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const studentDocRef = doc(db, 'students', studentId);
                const studentDocSnapshot = await getDoc(studentDocRef);
                if (studentDocSnapshot.exists()) {
                    setStudentData(studentDocSnapshot.data());
                    fetchFeesGroups(studentDocSnapshot.data().class); // Pass appropriate argument
                } else {
                    console.error('Student document does not exist');
                }
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };

        const fetchFeesGroups = async (studentClassId) => {
            try {
                const feesQuery = query(collection(db, 'classes', studentClassId, 'fees'));
                const feesSnapshot = await getDocs(feesQuery);
                const fetchedGroups = [];
                await Promise.all(feesSnapshot.docs.map(async (feeDoc) => {
                    const groupId = feeDoc.id;
                    const feesMasterRef = collection(db, 'classes', studentClassId, 'fees', groupId, 'feesMaster');
                    const feesMasterSnapshot = await getDocs(feesMasterRef);
                    const feeCodes = await Promise.all(feesMasterSnapshot.docs.map(async (doc) => {
                        const feeCodeId = doc.id;
                        const { amount, dueDate, fixedAmount, percentage, status } = doc.data();
                        const formattedDueDate = dueDate ? new Date(dueDate.toDate()).toLocaleString() : '';
                        const fine = calculateFine(amount, percentage, fixedAmount);
                        const balance = amount + fine; // Calculate balance
                        return {
                            feeCodeId,
                            amount,
                            dueDate: formattedDueDate,
                            status,
                            fine,
                            balance
                        };
                    }));
                    fetchedGroups.push({ feesGroupId: groupId, feeCodes });
                }));
                setFeesGroups(fetchedGroups);
            } catch (error) {
                console.error('Error fetching fee groups:', error);
            }
        };

        if (studentId) {
            fetchStudentData();
        }

        setCurrentDate(getFormattedDate(new Date()));
    }, [studentId]);

    const getFormattedDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const calculateFine = (amount, percentage, fixedAmount) => {
        if (percentage) {
            return (amount * percentage) / 100;
        } else if (fixedAmount) {
            return fixedAmount;
        } else {
            return 0;
        }
    };

    const handleCollectFeesClick = () => {
        if (selectedFeeCodes.length > 0) {
            const selectedGroup = feesGroups.find(group => group.feesGroupId === selectedFeeCodes[0].feesGroupId);
            if (selectedGroup) {
                setSelectedGroupName(selectedGroup.feesGroupId);
                setSelectedFeesCode(selectedFeeCodes[0].feeCodeId);
                setCollectFeesPopperOpen(true);
            }
        } else {
            console.log("No fee code selected.");
        }
    };

    const handleCloseCollectFeesPopper = () => {
        setCollectFeesPopperOpen(false);
    };

    const handleAddButtonClick = (groupName, feeCode) => {
        console.log("Group Name:", groupName);
        console.log("Fee Code:", feeCode);
        setSelectedGroupName(groupName);
        setSelectedFeesCode(feeCode);
        setCollectFeesPopperOpen(true);
    };


    const handleCheckboxChange = (groupIndex, codeIndex) => (event) => {
        const isChecked = event.target.checked;

        // Update state of individual checkbox
        setFeesGroups((prevGroups) =>
            prevGroups.map((group, gIndex) => ({
                ...group,
                feeCodes: group.feeCodes.map((code, cIndex) => ({
                    ...code,
                    selected: gIndex === groupIndex && cIndex === codeIndex ? isChecked : code.selected,
                })),
            }))
        );

        // Update selectedFeeCodes
        const updatedSelectedFeeCodes = [...selectedFeeCodes];
        if (isChecked) {
            updatedSelectedFeeCodes.push({
                feesGroupId: feesGroups[groupIndex].feesGroupId,
                feeCodeId: feesGroups[groupIndex].feeCodes[codeIndex].feeCodeId,
            });
        } else {
            updatedSelectedFeeCodes.splice(
                updatedSelectedFeeCodes.findIndex(
                    (feeCode) =>
                        feeCode.feesGroupId === feesGroups[groupIndex].feesGroupId &&
                        feeCode.feeCodeId === feesGroups[groupIndex].feeCodes[codeIndex].feeCodeId
                ),
                1
            );
        }
        setSelectedFeeCodes(updatedSelectedFeeCodes);
    };

    //Print part---------------->

    const handlePrintSelected = () => {
        // Check if any checkbox is selected
        const anyCheckboxSelected = feesGroups.some(group => group.feeCodes.some(code => code.selected));
    
        // If no checkbox is selected, return without printing
        if (!anyCheckboxSelected) {
            console.log("No checkbox is selected.");
            return;
        }
    
        // Filter the fee groups to get only the selected fee codes
        const selectedFeeCodes = feesGroups.flatMap(group => group.feeCodes.filter(code => code.selected));
    
        // Generate a printable representation of the selected fee codes
        const printableContent = selectedFeeCodes.map(code => {
            return `
                <div class="fee-code">
                    <p><strong>Fees Group:</strong> ${code.groupId}</p>
                    <p><strong>Fees Code:</strong> ${code.feeCodeId}</p>
                    <p><strong>Due Date:</strong> ${code.dueDate}</p>
                    <p><strong>Status:</strong> ${code.status ? 'Paid' : 'Unpaid'}</p>
                    <p><strong>Amount($):</strong> ${code.amount}</p>
                    <p><strong>Discount:</strong> ${code.discount}</p>
                    <p><strong>Fine:</strong> ${code.fine}</p>
                    <p><strong>Balance:</strong> ${parseFloat(code.amount) + parseFloat(code.fine)}</p>
                </div>
            `;
        }).join('');
    
        // Create a new window with the printable content
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Selected Fee Codes</title>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        .fee-code {
                            margin-bottom: 20px;
                            border: 1px solid #ccc;
                            padding: 10px;
                            border-radius: 5px;
                        }
                        .fee-code p {
                            margin: 5px 0;
                        }
                        .fee-code strong {
                            font-weight: bold;
                        }
                    </style>
                </head>
                <body>
                    <h1>Selected Fee Codes</h1>
                    <div class="fee-codes">${printableContent}</div>
                </body>
            </html>
        `);
    
        // Print the content
        printWindow.print();
    };
    

    return (
        <div>
            <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="right-start" transition>
                <Paper
                    style={{
                        width: '1318px',
                        padding: '20px',
                        position: 'relative',
                        maxHeight: '600px',
                        overflowY: 'auto',
                    }}
                >
                    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        <Button onClick={handleClose} color="secondary" variant="contained">
                            Close
                        </Button>
                    </div>
                    <h2 style={{ marginBottom: '20px' }}>Student Fees</h2>

                    {/*Student details part------->*/}

                    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ marginRight: '20px' }}>
                                <img
                                    src={studentData?.profilePicture}
                                    alt="Profile"
                                    style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                                />
                            </div>
                            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 2fr', gap: '20px' }}>
                                    <div>
                                        <p><strong>Name</strong></p>
                                        <p><strong>Father</strong></p>
                                        <p><strong>Mother</strong></p>
                                        <p><strong>Class</strong></p>
                                    </div>
                                    <div>
                                        <p>{studentData ? `${studentData.firstName} ${studentData.lastName}` : null}</p>
                                        <p>{studentData?.fatherName}</p>
                                        <p>{studentData?.motherName}</p>
                                        <p>{studentData?.class}</p>
                                    </div>
                                    <div>
                                        <p><strong>Roll No</strong></p>
                                        <p><strong>Academic Year</strong></p>
                                        <p><strong>Address</strong></p>
                                        <p><strong>Admission No</strong></p>
                                    </div>
                                    <div>
                                        <p>{studentData?.rollNo}</p>
                                        <p>{studentData?.academicYear}</p>
                                        <p>{studentData?.address}</p>
                                        <p>{studentData?.admissionNumber}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Two Command buttons part------->*/}

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', alignItems: 'center' }}>
                        <div style={{ display: 'flex' }}>
                            <Button style={{ backgroundColor: 'yellow', marginRight: '10px' }} startIcon={<PrintIcon />} onClick={handlePrintSelected}>
                                Print Selected
                            </Button>
                            <Button style={{ backgroundColor: 'orange', marginRight: '10px' }} startIcon={<MoneyIcon />} onClick={() => handleCollectFeesClick(selectedGroupName)}>
                                Collect Fee
                            </Button>
                        </div>
                        <div>Date: {currentDate}</div>
                    </div>
                    <br></br>

                    {/*Table part------->*/}

                    <div className="overflow-y-auto max-h-table mt-20">
                        <table className="w-full border-collapse" style={{ borderSpacing: '0', borderRadius: '8px', overflow: 'hidden' }}>
                            <thead>
                                <tr className="bg-gray-200">
                                    <th style={{ padding: '12px 8px', fontWeight: 'bold', fontSize: '16px', color: '#374151' }}>CheckBox</th>
                                    <th style={{ padding: '12px 8px', fontWeight: 'bold', fontSize: '16px', color: '#374151' }}>Fees Group</th>
                                    <th style={{ padding: '12px 8px', fontWeight: 'bold', fontSize: '16px', color: '#374151' }}>Fees Code</th>
                                    <th style={{ padding: '12px 8px', fontWeight: 'bold', fontSize: '16px', color: '#374151' }}>Due Date</th>
                                    <th style={{ padding: '12px 8px', fontWeight: 'bold', fontSize: '16px', color: '#374151' }}>Status</th>
                                    <th style={{ padding: '12px 8px', fontWeight: 'bold', fontSize: '16px', color: '#374151' }}>Amount($)</th>
                                    <th style={{ padding: '12px 8px', fontWeight: 'bold', fontSize: '16px', color: '#374151' }}>Mode</th>
                                    <th style={{ padding: '12px 8px', fontWeight: 'bold', fontSize: '16px', color: '#374151' }}>Date</th>
                                    <th style={{ padding: '12px 8px', fontWeight: 'bold', fontSize: '16px', color: '#374151' }}>Discount</th>
                                    <th style={{ padding: '12px 8px', fontWeight: 'bold', fontSize: '16px', color: '#374151' }}>Fine</th>
                                    <th style={{ padding: '12px 8px', fontWeight: 'bold', fontSize: '16px', color: '#374151' }}>Paid</th>
                                    <th style={{ padding: '12px 8px', fontWeight: 'bold', fontSize: '16px', color: '#374151' }}>Balance</th>
                                    <th style={{ padding: '12px 8px', fontWeight: 'bold', fontSize: '16px', color: '#374151' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feesGroups.map((group, groupIndex) => (
                                    group.feeCodes.map((code, codeIndex) => (
                                        <tr key={`${group.feesGroupId}-${code.feeCodeId}`} className="rounded-lg overflow-hidden shadow-md mb-4" style={{ backgroundColor: (groupIndex + codeIndex) % 2 === 0 ? '#B3E5FC' : '#fcb3c1 ' }}>
                                            <td style={{ padding: '12px 8px', color: '#b3c1fc ' }}>
                                                {/* Individual checkboxes in table rows */}
                                                <Checkbox
                                                    color="primary"
                                                    checked={code.selected}
                                                    onChange={handleCheckboxChange(groupIndex, codeIndex)}
                                                />
                                            </td>
                                            <td style={{ padding: '12px 8px', color: '#374151' }}>{codeIndex === 0 ? group.feesGroupId : ''}</td>
                                            <td style={{ padding: '12px 8px', color: '#374151' }}>{code.feeCodeId}</td>
                                            <td style={{ padding: '12px 8px', color: '#374151' }}>{code.dueDate}</td>
                                            <td style={{ padding: '12px 8px', color: '#374151', backgroundColor: code.status ? '#10B981' : '#EF4444', borderRadius: '4px', textAlign: 'center', fontWeight: code.status ? 'bold' : 'normal', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px', width: '80px' }}>{code.status ? <strong>Paid</strong> : <strong>Unpaid</strong>}</td>
                                            <td style={{ padding: '12px 8px', color: '#374151' }}>{code.amount}</td>
                                            <td style={{ padding: '12px 8px', color: '#374151' }}>{/*Mode  here */}</td>
                                            <td style={{ padding: '12px 8px', color: '#374151' }}>{/*Date here */}</td>
                                            <td style={{ padding: '12px 8px', color: '#374151' }}>{code.discount}</td>
                                            <td style={{ padding: '12px 8px', color: '#374151' }}>{code.fine}</td>
                                            <td style={{ padding: '12px 8px', color: '#374151' }}>{/*Paid here*/}</td>
                                            <td style={{ padding: '12px 8px', color: '#374151' }}>{parseFloat(code.amount) + parseFloat(code.fine)}</td>
                                            <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                                                <IconButton aria-label="Print" onClick={handlePrintSelected} style={{ color: '#374151' }}>
                                                    <PrintIcon />
                                                </IconButton>

                                                <IconButton aria-label="Add" onClick={() => handleAddButtonClick(group.feesGroupId, code.feeCodeId)} style={{ color: '#374151' }}>
                                                    <AddIcon />
                                                </IconButton>

                                            </td>
                                        </tr>
                                    ))
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Paper>
            </Popper>
            {collectFeesPopperOpen && selectedGroupName && (
                 <CollectFeesPopper
                 open={collectFeesPopperOpen}
                 handleClose={handleCloseCollectFeesPopper}
                 selectedGroupName={selectedGroupName}
                 selectedFeesCode={selectedFeesCode}
                 studentUId={studentData?.uid} // Assuming student ID is stored in studentData with the key 'id'
             />
            )}
        </div>
    );
}

export default StudentFeesPopper;
