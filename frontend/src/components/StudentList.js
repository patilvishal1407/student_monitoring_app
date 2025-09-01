// src/components/StudentList.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Grid
} from "@mui/material";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const subjects = ["All", "Math", "Science", "English", "History"];

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState("All");
  const navigate = useNavigate();

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await api.get("/students");
      setStudents(data);
    } catch (err) {
      alert("Error fetching students");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this student?")) {
      await api.delete(`/students/${id}`);
      fetchStudents();
    }
  };
  const handleAdd = async (id) => {
    navigate("/students/new");

  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((s) => {
    return (
      s.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterSubject === "All" || s.subject === filterSubject)
    );
  });

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>
        Students List
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        {/* Search by Name */}
        <Grid item xs={3}>
          <TextField
            fullWidth
            label="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>

        {/* Filter by Subject */}
        <Grid item xs={3}>
          <TextField
            fullWidth
            select
            label="Filter by Subject"
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
          >
            {subjects.map((subj) => (
              <MenuItem key={subj} value={subj}>
                {subj}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Empty space */}
        <Grid item xs={3}></Grid>

        {/* Button aligned right */}
        <Grid item xs={3} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            sx={{ px: 3, py: 1.5 }}
          >
            Add Student
          </Button>
        </Grid>
      </Grid>


      {/* <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: "50%" }}
        />
        <TextField
          select
          label="Filter by Subject"
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          sx={{ width: "50%" }}
        >
          {subjects.map((subj) => (
            <MenuItem key={subj} value={subj}>
              {subj}
            </MenuItem>
          ))}
        </TextField>
      </Box> */}
      {loading ? (
        <CircularProgress />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.id}</TableCell>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell>{s.subject}</TableCell>
                <TableCell>{s.grade}</TableCell>
                <TableCell>
                  {new Date(s.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    color="error"
                    variant="outlined"
                    size="small"
                    onClick={() => handleDelete(s.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export default StudentList;
