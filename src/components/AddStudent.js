import React, { useState } from 'react';
import {SERVER_URL} from '../constants'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// properties addCoure is required, function called when Add clicked.
function AddStudent(props) { 

  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState({name:'', studentEmail:''});
  const [message, setMessage] = useState('');
  
  const handleClickOpen = () => {
    setMessage('');
    setStudent({name:'', studentEmail:''});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const handleChange = (event) => {
    setStudent({...student,  [event.target.name]:event.target.value})
  }

  const addStudent = () => {
    console.log("addStudent "+JSON.stringify(student));
    fetch(`${SERVER_URL}/student`, 
        {  
        method: 'POST', 
        headers: { 'Content-Type': 'application/json', }, 
        body: JSON.stringify(student)
        } 
    )
    .then((response) => response.json() )
    .then((data) => {
      if (data.message) {setMessage('Student not added. '+data.message);
      }
      else if (data) {setMessage('Student added. ID='+data);
        handleClose();
      }
       else {setMessage('Student not added. ');
      }
    })
    .catch((err) =>  { setMessage('Error. '+err) } );
    
  }

  return (
      <div>
        <Button id="addStudent" variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
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
            id="studentName"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Student Email"
            name="studentEmail"
            id="studentEmail"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Status Code"
            name="statusCode"
            id="statusCode"
            type="number"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Status"
            name="status"
            id="status"
            onChange={handleChange}
          /> <br></br>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={handleClose}>Cancel</Button>
              <Button id="add" color="primary" onClick={addStudent}>Add</Button>
            </DialogActions>
          </Dialog>      
      </div>
  ); 
}

export default AddStudent;