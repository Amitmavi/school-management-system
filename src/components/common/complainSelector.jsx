import { Button, FormControl, Grid, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from "../../../../utils/firebaseConfig";

const AddComplaintForm = () => {
    const [complainTypes, setComplainTypes] = useState([]);
    const [selectedComplainType, setSelectedComplainType] = useState('');

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
                <h3>Add Complain</h3>
                
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
                
                {/* Your existing code for other form fields */}
            </Grid>
        </Grid>
    );
};

export default AddComplaintForm;
