import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


// properties addCoure is required, function called when Add clicked.
function AddStudent(props) { 

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    studentEmail: "",
    statusCode: 0,
    status: "",
  });
  
  const [isValidEmail, setIsValidEmail] = useState(false);

  const addStudent = props.addStudent.addStudent;
  const students = props.addStudent.students;
  
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

    if(name === "studentEmail"){
      setIsValidEmail(validateEmail(value));
    }
  }

  const handleAdd = () => {
      for(let i = 0; i < students.length; i++){
        if(formData.studentEmail === students[i].studentEmail){
          window.alert("Email already taken");
          return;
        }
      }
      addStudent(formData);
      handleClose();
  }

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  return (
      <div>
        <Button id="addCourse" variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
          Add Student
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Student</DialogTitle>
            <DialogContent  style={{paddingTop: 20}} >
            <TextField
            autoFocus
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
          /> <br></br>
          <span id = "warning">{isValidEmail ? 'Valid email' : 'Invalid email'}</span>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={handleClose}>Cancel</Button>
              <Button id="add" color="primary" onClick={handleAdd}>Add</Button>
            </DialogActions>
          </Dialog>      
      </div>
  ); 
}

// required property:  addCourse is a function to call to perform the Add action
AddStudent.propTypes = {
  AddStudent : PropTypes.func.isRequired
}

export default AddStudent;