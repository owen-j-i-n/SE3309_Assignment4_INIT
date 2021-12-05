import React, {useEffect, useState} from "react";
import Axios from 'axios';
import {useNavigate} from "react-router-dom";


function Usedashboard(){
    let navigate = useNavigate();
    const[user_name, setUsername] = useState('');
    const[fNameReg, setfNameReg] = useState('');
    const[lNameReg, setlNameReg] = useState('');
    const[genderReg, setGenderReg] = useState('');
    const[phoneReg, setphoneReg] = useState('');
    const[dobReg, setdobReg] = useState('');

    const[user_id, setUserId] = useState('');

    useEffect(()=>{
        Axios.get("http://localhost:3000/login").then((response)=>{
          if(response.data.loggedIn === true){
            setUserId(response.data.user[0].user_id);
            setUsername(response.data.user[0].user_name);
            setfNameReg(response.data.user[0].fName);
            setlNameReg(response.data.user[0].lName);
            setGenderReg(response.data.user[0].gender);
            setphoneReg(response.data.user[0].phone);
            setdobReg(response.data.user[0].dob);
          }else{
            navigate("/auth");
          } 
        });
      }, []);

      const [classList, setClassList] = useState([]);
      useEffect(()=>{
        Axios.get("http://localhost:3000/getClass").then((response)=>{
            setClassList(response.data)
        });
      }, []);

    const [MemberDetail, setmemberList] = useState([]);
    const showMem = ()=>{
        Axios.post('http://localhost:3000/getType', {
            user_id: user_id,
        }).then((response) =>{
            setmemberList(response.data)
        });
    };

    const [scheduleDetail, setscheduleList] = useState([]);
    const getSchedule = ()=>{
        Axios.post('http://localhost:3000/getSchedule', {
            user_id: user_id,
        }).then((response) =>{
            setscheduleList(response.data)
        });
    };
   
    const addClass = (class_id)=>{
        Axios.post('http://localhost:3000/addClass', {
            user_id: user_id,
            class_id: class_id,
          }).then((response) =>{
            console.log(response);
          });
    };

    const deleteClass = (class_id)=>{
        Axios.post('http://localhost:3000/deleteClass', {
            user_id: user_id,
            class_id: class_id,
          }).then((response) =>{
            console.log(response);
          });
    };

    return(
        <div className = "user board">
        <div class="bgImg1"></div>
        <div class= "textPosition1">
            <h1>{user_name} Profile</h1>
            <h3>First Name: {fNameReg}</h3>
            <h3>Last Name: {lNameReg}</h3>
            <h3>Gender: {genderReg}</h3>
            <h3>Phone: {phoneReg}</h3>
            <h3>Date of Birth: {dobReg}</h3>
            <a href="/updateProfile">Update my profile</a>
            <br></br>
            <a href="/getmember">Get a membership</a>
            <br></br>
            <br></br>
            <button class = "button button1" onClick = {()=>showMem()}>check membership status</button>
            {MemberDetail.map((val)=>{
                return <h3>{val.payment} | {val.member_type}</h3>}
            )}

         </div>
         <div class = "textPosition2">
            <br></br>
            <h3>All Classes:</h3>
            {classList.map((val)=>{
                return <div><h3> {val.class_name} | {val.class_type} | #{val.class_id}</h3>
                <button class = "button button1" onClick = {()=>addClass(val.class_id)}>Add class</button>
                </div>
            })}
             
         </div>

         <div class = "textPosition3">
         <button class = "button button1" onClick = {()=>getSchedule()}>check my schedule</button>
            {scheduleDetail.map((val)=>{
                return <div><h3>{val.class_id} | {val.class_name}</h3>
                <button class = "button button1" onClick = {()=>deleteClass(val.class_id)}>Delete class</button>
                </div>}
            )}
         </div>
        </div>
     )
}
export default Usedashboard;