import React, { useState, useEffect } from "react";
import AddStudent from './AddStudent';
import EditStudent from "./EditStudent";
import {SERVER_URL} from '../constants';

const AdminHome = () => {
  const params = new URLSearchParams(window.location.search);
  const [students, setStudents] = useState([]); // list of students
  const [message, setMessage] = useState(" "); // status message

  useEffect(() => {

    fetchStudents();
  }, []);

  const fetchStudents = () => {
    console.log("Fetching students");
    fetch(`${SERVER_URL}/student`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setStudents(data);
      })
      .catch((err) => {
        console.log("exception fetchStudents " + err);
        setMessage("Exception. " + err);
      });
  };

	const addStudent = (newStudent) => {
		setMessage('');
		console.log("start addStudent"); 

		const studentData = {
			name: newStudent.name,
			studentEmail: newStudent.studentEmail,
			statusCode: newStudent.statusCode,
			status: newStudent.status
		};

		fetch(`${SERVER_URL}/student`,
		{ 
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(studentData) 
		})
		.then(res => {
			if (res.ok) {
			console.log("addStudent ok");
			setMessage("Student added.");
			fetchStudents();
			} else {
			console.log('error addStudent ' + res.status);
			setMessage("Error. "+res.status);
			}})
		.catch(err => {
			console.error("exception addStudent "+ err);
			setMessage("Exception. "+err);
		})
	}

	const editStudent = (newData) => {

		const studentData = {
			id: newData.id,
			name: newData.name,
			studentEmail: newData.studentEmail,
			statusCode: newData.statusCode,
			status: newData.status
		};

		fetch(`${SERVER_URL}/student/${studentData.id}`, {
		  method: 'PUT', 
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(studentData),
		})
		  .then((res) => {
			if (res.ok) {
			  console.log('Student updated successfully');
			  setMessage("Student updated.");
			  fetchStudents();
			} else {
			  console.error('Error updating student:', res.status);
			  setMessage("Error. "+res.status);
			}
		  })
		  .catch((err) => {
			console.error('Exception while updating student:', err);
			setMessage("Exception. "+err);
		  });
	  };

    const dropStudent = (event) => {
		setMessage('');
		const row_id = event.target.parentNode.parentNode.rowIndex - 1;
		console.log("drop student " + row_id);
		const id = students[row_id].id;
	  
		const useForce = window.confirm('Are you sure you want to drop the student named '+ students[row_id].name + '? ' + '\nConfrim to use force or cancel for without force.');
		
		if (useForce) {
		  fetch(`${SERVER_URL}/student/${id}?force=true`, {
			method: 'DELETE',
		  })
			.then(res => {
			  if (res.ok) {
				console.log("drop ok");
				setMessage("Student dropped.");
				fetchStudents();
			  } else {
				console.log("drop error");
				setMessage("Error dropStudent. " + res.status);
			  }
			})
			.catch((err) => {
			  console.log("exception dropStudent " + err);
			  setMessage("Exception. " + err);
			});
		} else {
		  fetch(`${SERVER_URL}/student/${id}`, {
			method: 'DELETE',
		  })
			.then(res => {
			  if (res.ok) {
				console.log("drop ok");
				setMessage("Student dropped.");
				fetchStudents();
			  } else {
				console.log("drop error");
				setMessage("Error dropStudent. " + res.status);
			  }
			})
			.catch((err) => {
			  console.log("exception dropStudent " + err);
			  setMessage("Exception. " + err);
			});
		}
	}	

  const headers = ['ID','name', 'email', 'statusCode', 'Status', ' '];

  if (students.length === 0) {
	return (
		<div>
			<h3>No Enrolled Students</h3>
			<h4>{message}</h4>
		</div>
		);
  } else { 
		return (
			<div>
			<div margin="auto">
				<h3>Student List</h3>
				<h4>{message}</h4>
				<table className="Center">
				<thead>
					<tr>
					{headers.map((s, idx) => (
						<th key={idx}>{s}</th>
					))}
					</tr>
				</thead>
				<tbody>
					{students.map((row, idx) => (
					<tr key={idx}>
						<td>{row.id}</td>
						<td>{row.name}</td>
						<td>{row.studentEmail}</td>
						<td>{row.statusCode}</td>
						<td>{row.status}</td>
						<td><button type="button" margin="auto" onClick={dropStudent}>Drop</button></td>
					</tr>
					))}
				</tbody>
				</table>
				<AddStudent addStudent={{ addStudent, students }} />
				<EditStudent editStudent={{ editStudent, students }} />
			</div>
			</div>
		);
	}
};

export default AdminHome;
