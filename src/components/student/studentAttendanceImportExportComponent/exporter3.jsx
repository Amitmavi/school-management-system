import React, { useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { DatePicker, Space, Button } from 'antd';

const Exporter3 = () => {
    const [className, setClassName] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleExport = async () => {
        if (!className || !startDate || !endDate) {
            console.error('Please select class name and date range');
            return;
        }

        const firestore = getFirestore();
        const attendanceRef = collection(firestore, 'classes', className, 'attendance');
        const q = query(attendanceRef, where('date', '>=', startDate), where('date', '<=', endDate));
        const querySnapshot = await getDocs(q);

        const data = [];
        querySnapshot.forEach((doc) => {
            const attendanceData = doc.data().attendance;
            Object.entries(attendanceData).forEach(([uid, status]) => {
                data.push({ date: doc.id, uid, status });
            });
        });

        if (data.length === 0) {
            console.error('No attendance data found for the selected class and date range');
            return;
        }

        const csvContent = generateCSV(data);
        downloadCSV(csvContent, `${className}_${startDate}_${endDate}_attendance.csv`);
    };


    const generateCSV = (data) => {
        let csvContent = 'Date,UID,Status\n';
        data.forEach((row) => {
            csvContent += `${row.date},${row.uid},${row.status}\n`;
        });
        return csvContent;
    };

    const downloadCSV = (content, fileName) => {
        const element = document.createElement('a');
        const file = new Blob([content], { type: 'text/csv' });
        element.href = URL.createObjectURL(file);
        element.download = fileName;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div>
            <h2>Export Attendance Data</h2>
            <Space direction="vertical">
                <DatePicker.RangePicker
                    onChange={(dates) => {
                        setStartDate(dates[0]);
                        setEndDate(dates[1]);
                    }}
                />
                <input
                    type="text"
                    placeholder="Enter Class Name"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                />
                <Button type="primary" onClick={handleExport}>Export</Button>
            </Space>
        </div>
    );
};

export default Exporter3;
