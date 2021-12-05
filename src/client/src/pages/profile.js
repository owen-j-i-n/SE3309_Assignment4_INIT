import React, {useEffect, useState} from "react";
import Axios from 'axios';
import {useNavigate} from "react-router-dom";


function UseProfile(){
    let navigate = useNavigate();
    const[user_name, setUsername] = useState('');
    const[fNameReg, setfNameReg] = useState('');
    const[lNameReg, setlNameReg] = useState('');
    const[genderReg, setGenderReg] = useState('');
    const[phoneReg, setphoneReg] = useState('');
    const[dobReg, setdobReg] = useState('');
    Axios.defaults.withCredentials = true;

    useEffect(()=>{
        Axios.get("http://localhost:3000/login").then((response)=>{
          if(response.data.loggedIn === true){
            setUsername(response.data.user[0].user_name);
            
          }else{
            navigate("/auth");
          }
        });
      }, []);

      
    const update = ()=>{
        Axios.put('http://localhost:3000/updateProfile', {
          fName: fNameReg,
          lName: lNameReg,
          gender: genderReg,
          phone: phoneReg,
          dob: dobReg,
          user_name: user_name,
        }).then((response) =>{
          console.log(response);
        });
      };
    return(
        <div className = "textPosition">
            <div class="bgImg1"></div>
         <h2>User Profile Update</h2>
         <div>
             User name: {user_name};
         </div>
         <label>First Name: </label>
        <input class = "textBox"
          type = "text"
          onChange = {(e) =>{
            setfNameReg(e.target.value);
          }}/>
        <br></br>
        <label>Last Name: </label>
        <input class = "textBox"
          type = "text"
          onChange = {(e) =>{
            setlNameReg(e.target.value);
          }}/>
        <br></br>
        <label>Gender: </label>
        <input class = "textBox"
          type = "text"
          onChange = {(e) =>{
            setGenderReg(e.target.value);
          }}/>
        <br></br>
        <label>Cell: </label>
        <input class = "textBox"
          type = "text"
          onChange = {(e) =>{
            setphoneReg(e.target.value);
          }}/>
        <br></br>
        <label>Date of Birth(format: yyyy-mm-dd): </label>
        <input class = "textBox"
          type = "text"
          onChange = {(e) =>{
            setdobReg(e.target.value);
          }}/>
        <br></br>
        <button class = "button button1"  onClick = {update}>Update</button>
        <br></br>
        <a  class = "link link1" href = "/auth">Sign in again</a>
        </div>
        
     )
}
export default UseProfile;