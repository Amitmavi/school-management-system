import React, { useState, useEffect } from 'react';
import { Button, Checkbox, FormControlLabel, Grid, Paper } from '@mui/material';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export default function Exporter() {
    const [selectedFields, setSelectedFields] = useState([]);
    const [exportedData, setExportedData] = useState(null);
    const [availableFields, setAvailableFields] = useState([]);

    // Fetch available fields from Firestore collection
    useEffect(() => {
        const fetchFields = async () => {
            const firestore = getFirestore();
            const querySnapshot = await getDocs(collection(firestore, 'students'));
            if (querySnapshot.empty) return;
            const fields = Object.keys(querySnapshot.docs[0].data());
            setAvailableFields(fields);
        };
        fetchFields();
    }, []);

    const handleFieldToggle = (fieldName) => {
        setSelectedFields((prevSelectedFields) =>
            prevSelectedFields.includes(fieldName)
                ? prevSelectedFields.filter((field) => field !== fieldName)
                : [...prevSelectedFields, fieldName]
        );
    };

    const fetchData = async () => {
        const firestore = getFirestore();
        const querySnapshot = await getDocs(collection(firestore, 'students'));
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });
        return data;
    };

    const exportToCSV = async () => {
        try {
            const data = await fetchData();
            const filteredData = data.map((student) =>
                Object.fromEntries(
                    Object.entries(student).filter(([key]) => selectedFields.includes(key))
                )
            );
            const csvRows = [
                selectedFields.join(','),
                ...filteredData.map((student) =>
                    selectedFields.map((field) => student[field] || '').join(',')
                )
            ];
            const csv = csvRows.join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            setExportedData(url);
        } catch (error) {
            console.error('Error exporting to CSV:', error);
        }
    };

    return (
        <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item xs={12} md={6}>
                <Paper sx={{ padding: 2 }}>
                    <h2>Select Fields to Export</h2>
                    {availableFields.map((field) => (
                        <FormControlLabel
                            key={field}
                            control={<Checkbox checked={selectedFields.includes(field)} onChange={() => handleFieldToggle(field)} />}
                            label={field}
                        />
                    ))}
                    <Button variant="contained" onClick={exportToCSV}>Export to CSV</Button>
                    {exportedData && (
                        <a href={exportedData} download="exported_data.csv">
                            Download exported data
                        </a>
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
}
