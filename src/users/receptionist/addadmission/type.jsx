import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { db } from "../../../utils/firebaseConfig"; // Import db from Firebase configuration
import { collection, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const ComplainType = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [complainType, setComplainType] = useState("");
  const [description, setDescription] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSave = async () => {
    if (complainType && description) {
      try {
        const docRef = await setDoc(doc(collection(db, "complainType")), {
          complainType: complainType,
          description: description,
        });
        console.log("Document written  : ");
        toast.success("Successfully  Saved ");
        // Optionally, clear the input fields after saving
        setComplainType("");
        setDescription("");
      } catch (error) {
        console.error("Error writing document: ", error);
      }
    } else {
      alert("Please enter both reference and description.");
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <div
          style={{
            display: "flex",
            marginLeft: "20px",
            width: "560px",
            marginTop: "-15px",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "530px",
              width: "550px",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "2px",
              backgroundColor: "#e0e0e0",
              marginRight: "10px",
              marginBottom: "20px",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <h3
              style={{
                fontFamily: 'Georgia, "Times New Roman", Times, serif',
                color: "rgb(95, 88, 88)",
                marginTop: "-5px",
                fontSize: "30px",
              }}
            >
              Complain Type List
            </h3>
            <TextField
              style={{ width: "350px", marginBottom: "5px" }}
              fullWidth
              variant="outlined"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                style: { height: "45px" },
              }}
            />
            <TableContainer
              component={Paper}
              style={{ height: "50px", overflowY: "hidden" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Complaint Type</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.ComplaintType}</TableCell>
                      <TableCell>{row.Description}</TableCell>
                      <TableCell>{row.Action}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Grid>
      <Grid item xs={6}>
        <h3
          style={{
            fontFamily: 'Georgia, "Times New Roman", Times, serif',
            color: "rgb(95, 88, 88)",
            marginBottom: "10px",
            fontSize: "30px",
            marginLeft: "98px",
            width: "450px",
          }}
        >
          Complain Type
        </h3>
        <h5
          style={{ marginLeft: "100px", width: "200px", marginBottom: "0px" }}
        >
          Complain Type
        </h5>
        <Box
          style={{ marginLeft: "92px", width: "400px" }}
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField style={{ width: "350px" }} 
          size="small" 
          value={complainType}
          onChange={(e) => setComplainType(e.target.value)}
          />
        </Box>
        <h5
          style={{ marginLeft: "100px", width: "400px", marginBottom: "0px" }}
        >
          Description
        </h5>
        <div>
          <textarea
            id="groupDescriptions"
            style={{
              marginLeft: "100px",
              width: "35%",
              padding: "20px",
              marginTop: "5px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button
          variant="contained"
          style={{
            height: "40px",
            marginBottom: "1.5rem",
            marginTop: "1rem",
            marginLeft: "400px",
            width: "5rem",
            backgroundColor: "rgb(93, 93, 87)",
            fontSize: "18px",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            borderRadius: "4px",
            outline: "none",
            transition: "background-color 0.3s ease",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
          onClick={handleSave}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

export default ComplainType;
