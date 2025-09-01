// src/components/StudentForm.js
import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const subjects = ["Math", "Science", "English", "History"];

const StudentForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    grade: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.subject) {
      newErrors.subject = "Subject is required";
    } else if (!subjects.includes(formData.subject)) {
      newErrors.subject = "Invalid subject selected";
    }

    if (formData.grade === "") {
      newErrors.grade = "Grade is required";
    } else {
      const gradeNum = Number(formData.grade);
      if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100) {
        newErrors.grade = "Grade must be between 0 and 100";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await api.post("/students", formData);
      setFormData({ name: "", email: "", subject: "", grade: "" });
      if (onSuccess) onSuccess();
      navigate("/students");

    } catch (err) {
      if (err.response?.status === 409) {
        setErrors({ email: "Email must be unique" });
      } else {
        alert("Error saving student");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 4, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Add New Student
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {/* Row 1: Name + Email */}
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
          error={!!errors.email}
          helperText={errors.email}
        />

        {/* Row 2: Subject + Grade */}
        <TextField
          select
          fullWidth
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          margin="normal"
          required
          error={!!errors.subject}
          helperText={errors.subject}
        >
          {subjects.map((subj) => (
            <MenuItem key={subj} value={subj} >
              {subj}
            </MenuItem>
          ))}
        </TextField>


        <TextField
          fullWidth
          label="Grade"
          name="grade"
          type="number"
          inputProps={{ min: 0, max: 100 }}
          value={formData.grade}
          onChange={handleChange}
          margin="normal"
          required
          error={!!errors.grade}
          helperText={errors.grade}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
          sx={{ mt: 3 }}
        >
          {loading ? "Saving..." : "Save Student"}
        </Button>
      </Box>
    </Paper>
  );
};

export default StudentForm;
