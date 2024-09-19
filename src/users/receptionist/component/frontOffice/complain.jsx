import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, FormControl, Grid, MenuItem, Select, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from "../../../../utils/firebaseConfig";


const AddComplaintForm = () => {
    const [userData, setUserData] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
        const [complainTypes, setComplainTypes] = useState([]);
        const [selectedComplainType, setSelectedComplainType] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        // Freeze the page by setting overflow to hidden when component mounts
        document.body.style.overflowX = 'hidden';

        // Restore overflow when component unmounts
        return () => {
          document.body.style.overflowX = ''; // Empty string restores default overflow behavior
        };
    
  }, []);

   
 
 

    useEffect(() => {
        const fetchComplainTypes = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "complainType"));
                const types = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setComplainTypes(types);
                console.log('hell')
            } catch (error) {
                console.error("Error fetching complain types:", error);
            }
        };

        fetchComplainTypes();
    }, []);

    const handleComplainTypeChange = (event) => {
        setSelectedComplainType(event.target.value);
    };
 
  

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <div style={{ display: "flex", marginLeft: "1px", width: "700px" }}>
                    <div style={{ flex: 1, height: "530px", width: "50%", padding: "20px", border: "1px solid #ccc", borderRadius: "2px", backgroundColor: "#e0e0e0", marginRight: "10px", marginBottom: "20px", overflowY: "auto", overflowX: "hidden" }}>
                        <h3 style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif', color: "rgb(95, 88, 88)", marginBottom: "20px", fontSize: "30px" }}>Complain List</h3>
                        <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchQueryChange} style={{ width: "400px", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} />
                        <form style={{ width: "835px"}}>
                        </form>
                        <div>
                            <table style={{ width: '650px', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#b1abab', color: '#1a0707' }}>Complain #</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#b1abab', color: '#1a0707' }}>Complaint Type</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#b1abab', color: '#1a0707' }}>Name</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#b1abab', color: '#1a0707' }}>Phone</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#b1abab', color: '#1a0707' }}>Date</th>
                                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#b1abab', color: '#1a0707' }}>Action</th>
                                    </tr>
                                </thead>
                            </table>
                            <br />
                            <hr />
                        </div>
                    </div>
                </div>
            </Grid>
            
            <Grid item xs={6}>
                    <h3 style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif', color: "rgb(95, 88, 88)", marginBottom: "20px", fontSize: "30px", marginLeft:'120px', width: '450px', }}>Add Complain</h3>
                    <h5 style={{marginLeft:'120px', width: '450px'}}>Complain Type </h5>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small"style={{marginLeft:'120px', width: '450px'}}>
                    <Select
                        style={{ width: '400px' }}
                        value={selectedComplainType}
                        onChange={handleComplainTypeChange}
                    >
                        {complainTypes.map((type) => (
                            <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                    
                    <h5 style={{marginLeft:'120px', width: '450px'}}>Source</h5>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" style={{marginLeft:'120px', width: '450px'}}>
                        <Select style={{ width: '400px' }}>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <h5 style={{marginLeft:'120px', width: '450px'}}>Complain By</h5>
                    <Box
                    style={{marginLeft:'112px', width: '450px'}}
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField style={{ width: '400px' }} size="small" />
                    </Box>
                    <h5 style={{marginLeft:'120px', width: '450px'}}>Phone</h5>
                    <Box
                    style={{marginLeft:'112px', width: '450px'}}
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField style={{ width: '400px' }} size="small" />
                    </Box>
                    <h5 style={{marginLeft:'120px', width: '450px'}}>Date</h5>
                    <input type="date" id="dob" name="dob" required value={userData.dob} onChange={handleChange} style={{ marginLeft:'120px', width: '385px', height: '30px', marginBottom: '4px', marginTop: '4px' }} />
                    <h5 style={{marginLeft:'120px', width: '450px'}}>Description</h5>
                    <div>
                        <textarea id="groupDescriptions" style={{marginLeft:'120px', width: "57%", padding: "20px", marginTop: "5px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }} />
                    </div>
                    <h5 style={{marginLeft:'120px', width: '450px'}}>Action Taken</h5>
                    <Box
                    style={{marginLeft:'112px', width: '400px'}}
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField style={{ width: '400px' }} size="small" />
                    </Box>
                    <h5 style={{marginLeft:'120px', width: '400px'}}>Assigned</h5>
                    <Box
                    style={{marginLeft:'112px', width: '450px'}}
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField style={{ width: '400px' }} size="small" />
                    </Box>
                    <h5 style={{marginLeft:'120px', width: '450px'}}>Note</h5>
                    <div>
                    <textarea id="note" style={{marginLeft:'120px', width: "57%", padding: "20px", marginTop: "5px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "4px" }} />
                    </div>
                    <h5 style={{marginLeft:'120px', width: '450px'}}>Attach Document</h5><br />
                    <Button style={{marginLeft:'120px', width: '400px'}}component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Drag and drop a file here on click
                        <input type="file" id="studentDocument" name="studentDocument" accept="image/*" hidden />
                    </Button>
                    <Button
    variant="contained"
    style={{ height: '40px', marginBottom: '1.5rem', marginTop:'1rem', marginLeft: '440px', width: '5rem', backgroundColor: 'rgb(93, 93, 87)', fontSize: '18px', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '4px', outline: 'none', transition: 'background-color 0.3s ease', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}
  >
    Save
  </Button>
            </Grid>
        </Grid>
    );
};

export default AddComplaintForm;