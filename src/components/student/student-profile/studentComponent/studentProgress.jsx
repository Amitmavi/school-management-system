import React from 'react'
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";
import { Typography,   } from "@mui/material";


const CombinedProgressChart = ({ unit1Data, unit2Data, halfYearlyData, finalsData }) => {
    // Merge all the test data into a single dataset
    const combinedData = [];
    unit1Data.forEach((item, index) => {
      combinedData.push({
        name: item.name,
        Unit1: item.marks,
        Unit2: unit2Data[index].marks,
        HalfYearly: halfYearlyData[index].marks,
        Finals: finalsData[index].marks,
      });
    });

    // Return combinedData from the component
    return combinedData;
  };

export default function StudentProgress({studentUid}) {

    const [unit1Data, setUnit1Data] = useState([]);
    const [unit2Data, setUnit2Data] = useState([]);
    const [halfYearlyData, setHalfYearlyData] = useState([]);
    const [finalsData, setFinalsData] = useState([]);
    const [selectedView, setSelectedView] = useState('table');

    const combinedData = CombinedProgressChart({ unit1Data, unit2Data, halfYearlyData, finalsData });


    const handleViewChange = (event) => {
        setSelectedView(event.target.value);
        console.log("Selected view:", event.target.value); // Debugging statement
      };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const db = getFirestore();
    
            // Fetch class ID from the student document
            const studentRef = doc(db, 'students', studentUid);
            const studentDoc = await getDoc(studentRef);
    
            if (studentDoc.exists()) {
              const studentData = studentDoc.data();
              const studentClass = studentData.class;
    
              // Fetch subjects for the student's class
              const subjectsRef = collection(db, 'classes', studentClass, 'subjects');
              const subjectsSnapshot = await getDocs(subjectsRef);
    
              // Arrays to store subject data with marks for Unit1, Unit2, HalfYearly, and Finals
              const unit1Data = [];
              const unit2Data = [];
              const halfYearlyData = [];
              const finalsData = [];
    
              // Iterate through each subject
              for (const subjectDoc of subjectsSnapshot.docs) {
                const subjectId = subjectDoc.id;
    
                // Fetch marks for Unit1
                const marksRefUnit1 = doc(subjectDoc.ref, 'marks', 'Unit1');
                const marksDocUnit1 = await getDoc(marksRefUnit1);
                const marksUnit1 = marksDocUnit1.exists() ? parseFloat(marksDocUnit1.data()[studentUid] || 0) : 0;
                unit1Data.push({ id: subjectId, name: subjectId, marks: marksUnit1 });
    
                // Fetch marks for Unit2
                const marksRefUnit2 = doc(subjectDoc.ref, 'marks', 'Unit2');
                const marksDocUnit2 = await getDoc(marksRefUnit2);
                const marksUnit2 = marksDocUnit2.exists() ? parseFloat(marksDocUnit2.data()[studentUid] || 0) : 0;
                unit2Data.push({ id: subjectId, name: subjectId, marks: marksUnit2 });
    
                // Fetch marks for HalfYearly
                const marksRefHalfYearly = doc(subjectDoc.ref, 'marks', 'HalfYearly');
                const marksDocHalfYearly = await getDoc(marksRefHalfYearly);
                const marksHalfYearly = marksDocHalfYearly.exists() ? parseFloat(marksDocHalfYearly.data()[studentUid] || 0) : 0;
                halfYearlyData.push({ id: subjectId, name: subjectId, marks: marksHalfYearly });
    
                // Fetch marks for Finals
                const marksRefFinals = doc(subjectDoc.ref, 'marks', 'Finals');
                const marksDocFinals = await getDoc(marksRefFinals);
                const marksFinals = marksDocFinals.exists() ? parseFloat(marksDocFinals.data()[studentUid] || 0) : 0;
                finalsData.push({ id: subjectId, name: subjectId, marks: marksFinals });
              }
    
              // Update state with subject data
              setUnit1Data(unit1Data);
              setUnit2Data(unit2Data);
              setHalfYearlyData(halfYearlyData);
              setFinalsData(finalsData);
            } else {
              console.log('Student document not found');
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [studentUid]);



  return (
           
            <div>
              <div>
                <Typography variant="h5">Select Progress View:</Typography>
                <select value={selectedView} onChange={handleViewChange}>
                  <option value="Select">Select</option>
                  <option value="Unit 1">Unit 1</option>
                  <option value="Unit 2">Unit 2</option>
                  <option value="Half Yearly">Half Yearly</option>
                  <option value="Finals">Finals</option>
                  <option value="Combined">Combined</option>
                </select>
              </div>
              {selectedView === 'Unit 1' && (
                <div>
                  <Typography variant="h5">Student Progress - Unit 1</Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={unit1Data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="marks" fill="#001F3F" name="Unit 1" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
              {selectedView === 'Unit 2' && (
                <div>
                  <Typography variant="h5">Student Progress - Unit 2</Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={unit2Data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="marks" fill="#50C878" name="Unit 2" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
              {selectedView === 'Half Yearly' && (
                <div>
                  <Typography variant="h5">Student Progress - Half Yearly</Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={halfYearlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="marks" fill="#6A0DAD" name="Half Yearly" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
              {selectedView === 'Finals' && (
                <div>
                  <Typography variant="h5">Student Progress - Finals</Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={finalsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="marks" fill="#FFA500" name="Finals" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
              {selectedView === 'Combined' && (
                <div>
                  <Typography variant="h5">Student Progress - Combined</Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={combinedData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Unit1" fill="#001F3F" name="Unit 1" />
                      <Bar dataKey="Unit2" fill="#50C878" name="Unit 2" />
                      <Bar dataKey="HalfYearly" fill="#6A0DAD" name="Half Yearly" />
                      <Bar dataKey="Finals" fill="#FFA500" name="Finals" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
 
    
  )
}
