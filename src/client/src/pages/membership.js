import React, {useEffect, useState} from "react";
import Axios from 'axios';
import {useNavigate} from "react-router-dom";


function UseMembership(){
    let navigate = useNavigate();
    const[user_id, setUserid] = useState(0);
    const[paymentReg, setPayment] = useState('');
    const[member_typeReg, setMemberType] = useState('');

    Axios.defaults.withCredentials = true;

    useEffect(()=>{
        Axios.get("http://localhost:3000/login").then((response)=>{
          if(response.data.loggedIn === true){
            setUserid(response.data.user[0].user_id);
          }
        });
      }, []);



    const getMember =() =>{
        Axios.post('http://localhost:3000/getMember', {
            user_id: user_id,
            payment: paymentReg,
            member_type: member_typeReg,
          }).then((response) =>{
            console.log(response);
          });
    }; 
    return(
        <div className = "textPosition">
            <div class = "bgImg1"></div>
            <h1>Become A Membership!</h1>
                <br></br>
            <label>Choose a payment: </label>
            <select
            class = "textBox"
            value = {paymentReg} onChange = {(e) =>{
            setPayment(e.target.value);
            }}>
                <option value = 'null'></option>
                <option value = 'cash'>Cash</option>
                <option value = "visa">Visa</option>
                <option value = "mastercard">Mastercard</option>
                <option value = "paypal">Paypal</option>
            </select>
            <br></br>
            <label>Choose a membership type: </label>
            <select
            class = "textBox"
            type="text" onChange = {(e) =>{
            setMemberType(e.target.value);
            }}>
                <option value = 'null'></option>
                <option value = "fundamental">Fundamental</option>
                <option value = "advanced">Advanced</option>
                <option value = "premium">Premium</option>
            </select>
            <br></br>
                <br></br>
            <input class = "button button1" type = "submit" onClick = {getMember}></input>
        </div>
     )
}
export default UseMembership;