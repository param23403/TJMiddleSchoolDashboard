import React from "react";
import { useState, useEffect } from "react"
import { Box, AppBar, Toolbar, Typography, TextField, Button } from '@mui/material';
import { Link } from "react-router-dom";
import './Login.css';
import db from "../firebase.js"
import { useNavigate } from "react-router-dom";
import {collection, doc, getDocs, updateDoc, setDoc} from "firebase/firestore";

const Login = (props) => {
    let navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [logged, setLogged] = useState(false);

    function getCredentials(){
      getDocs(collection(db, "staff"))
      .then((allDocs) => {allDocs.forEach((d) => (((String(username) == String(d.data().username)) && (String(password) == String(d.data().password)))
        ?(setLogged(true), setDoc(doc(db, "staff", "teacher1"), {
            isLogged: true,
            isAdmin: d.data().isAdmin,
            name: d.data().name,
            password: d.data().password,
            username: d.data().username
          }), navigate("/home", { state: {username: d.data().username }}))
        : setLogged(false)))})
    }

    console.log(db)

    return (
        <div className="Login">
          <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                  <Toolbar>
                      <Typography variant="h6" component="div">
                          TJ Admin Portal
                      </Typography>
                  </Toolbar>
              </AppBar>
          </Box>

          <div className="LoginLabel">
            <Typography variant="h4" component="div">
                Login
            </Typography>
          </div>

          <div className="Username">
            <TextField label="Username" onChange={(e) => {setUsername(e.target.value)}}></TextField>
          </div>
          <div className="Password">
            <TextField label="Password" onChange={(e) => {setPassword(e.target.value)}} type={'password'}></TextField>
          </div>
            <div className="LoginButton">
              <Button variant="contained" onClick={getCredentials}> Login </Button>
            </div>
        </div>
    );
};

export default Login;
