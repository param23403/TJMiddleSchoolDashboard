import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar.js';
import {List, IconButton, Grid} from '@mui/material';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import db from '../firebase.js'
import {collection, doc, getDocs, updateDoc} from "firebase/firestore";
import { useLocation } from "react-router-dom";
import EditWindowStudent from './EditWindowStudent.js';

const StudentDirectory = () => {

    const {state} = useLocation();
    const { username } = state; /*the user */

    const [students, setStudents] = useState([])

    const printStudents = async () => {
        const documents = await getDocs(collection(db, "students"));
        console.log(documents);
        let list = [];
        documents.forEach((student) => list.push({id: student.id, ...student.data()}));
        setStudents(list);
    }
    
    useEffect(() => {
        printStudents();
    }, []);

    const editFirstName = (studentID, newFirstName) => {
        updateDoc(doc(db, "students", studentID)), {
            firstname: newFirstName
        }
    }
    
    const editLastName = (studentID, newLastName) => {
        updateDoc(doc(db, "students", studentID)), {
            lastname: newLastName
        }
    }
    
    const editBirth = (studentID, newBirthday) => {
        updateDoc(doc(db, "students", studentID)), {
            birthday: newBirthday
        }
    }
    
    const editGrade = (studentID, newGrade) => {
        updateDoc(doc(db, "students", studentID)), {
            grade: newGrade
        }
    }

    const commonStyles = {
        bgcolor: '#ADD8E6',
        borderColor: 'text.primary',
        m: 1,
        border: 1,
        width: '80vh',
    };

    console.log(students)

    return (
        <>
        <Navbar />
        <h1>Student Directory</h1>
        <Grid container direction="row" alignItems="center" justifyContent="center">
            <p>Add Student: </p>
            <IconButton>
                <AddReactionIcon />
            </IconButton>
        </Grid>
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '10vh' }}>
            <List sx={{ ...commonStyles, borderRadius: '4px'}} component="nav" aria-label="mailbox folders">
                {
                    students.map((student) => {
                        console.log(student)
                        return (<EditWindowStudent studentId={student.id} firstname={student.firstname}/>)
                    })
                }
            </List>
        </Grid>
        </>
    );
}

export default StudentDirectory;
