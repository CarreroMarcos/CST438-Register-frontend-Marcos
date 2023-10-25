import React, { useState, useEffect } from "react";
import AddStudent from './AddStudent';
import EditStudent from "./EditStudent";
import {SERVER_URL} from '../constants';

const AdminHome = () => {
  const [students, setStudents] = useState([]); // list of students
  const [message, setMessage] = useState(" "); // status message

  const token = sessionStorage.getItem("jwt");

  useEffect(() => {

    fetchStudents();
  }, []);

  const fetchStudents = () => {
    console.log("Fetching students");
    fetch(`${SERVER_URL}/student`,
	{
		headers: {'Authorization' : token},
	}
	)
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
	const refreshStudents = () => {
		setMessage('');
		fetchStudents();
	}  	

    const dropStudent = (event) => {
		setMessage('');
		const row_id = event.target.parentNode.parentNode.rowIndex - 1;
		console.log("drop student " + row_id);
		const id = students[row_id].id;
	  
		const useForce = window.confirm('Are you sure you want to drop the student named '+ students[row_id].name + '? ' + '\nConfrim to use force or cancel for without force.');
		
		if (useForce) {
		  fetch(`${SERVER_URL}/student/${id}?force=true`, {
			method: 'DELETE',
			headers: {'Authorization' : token},
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
			headers: {'Authorization' : token},
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
						<td><EditStudent student={row} onClose={refreshStudents} /></td>
						<td><button type="button" margin="auto" id={"drop" + (row.id)} onClick={dropStudent}>Drop</button></td>
					</tr>
					))}
				</tbody>
				</table>
				<AddStudent onClose={refreshStudents} />
			</div>
			</div>
		);
	}
};

export default AdminHome;
