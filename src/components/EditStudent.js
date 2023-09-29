import React, { useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const EditStudent = (props) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    studentEmail: "",
    statusCode: 0,
    status: "",
  });

  const [isValidEmail, setIsValidEmail] = useState(false);

  const editStudent = props.editStudent.editStudent;
  const students = props.editStudent.students;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "studentEmail") {
      setIsValidEmail(validateEmail(value));
    }
  };

  const handleAdd = () => {
    for (let i = 0; i < students.length; i++) {
      if (formData.studentEmail === students[i].studentEmail) {
        window.alert("Email already taken!");
        return;
      }
    }
    editStudent(formData);
    handleClose();
  };

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  return (
    <div>
        <Button id="addCourse" variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
          Edit Student
        </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent style={{ paddingTop: 20 }}>
          <TextField
            autoFocus
            fullWidth
            label="Student ID"
            name="id"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Student Name"
            name="name"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Student Email"
            name="studentEmail"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Status Code"
            name="statusCode"
            type="number"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Status"
            name="status"
            onChange={handleChange}
          />{" "}
          <br></br>
          <span id="warning">
            {isValidEmail ? "Valid email" : "Invalid email"}
          </span>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button id="add" color="primary" onClick={handleAdd}>
            update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// required property:  addCourse is a function to call to perform the Add action
EditStudent.propTypes = {
  EditStudent: PropTypes.func.isRequired,
};

export default EditStudent;
