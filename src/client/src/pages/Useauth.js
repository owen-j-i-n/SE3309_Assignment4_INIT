import React, {useState} from "react";
import Axios from 'axios';
import {useNavigate} from "react-router-dom";


function Useauth() {

  let navigate = useNavigate();

  const[usernameReg, setUsernameReg] = useState('');
  const[passwordReg, setpasswordReg] = useState('');

  const[user_name, setUsername] = useState('');
  const[pass_word, setpassword] = useState('');

  const [loginStatus, setLoginStatus] = useState('');

  Axios.defaults.withCredentials = true;

  const register = ()=>{
    Axios.post('http://localhost:3000/register', {
      user_name: usernameReg,
      pass_word: passwordReg,
    }).then((response) =>{
      console.log(response);
    });
  };

  const login = ()=>{
    Axios.post('http://localhost:3000/login', {
      user_name: user_name,
      pass_word: pass_word,
    }).then((response) =>{
      if(response.data.message){
        setLoginStatus(response.data.message)
      }else{
        navigate("/board");
      }
    });
  }; 

  // useEffect(()=>{
  //   Axios.get("http://localhost:3000/login").then((response)=>{
  //     if(response.data.loggedIn === true){
  //       setLoginStatus(response.data.user[0].user_name + " already Loged In")
  //     }
  //   });
  // }, []);

  return (
    <div className="auth">
      <div class="bgImg1"></div>
      <div className = "registration">
        <h2> User registration </h2>
        <label>User Name: </label>
        <input 
        class = "textBox"
          type = "text"
          onChange = {(e) =>{
            setUsernameReg(e.target.value);
          }}/>
        <br></br>
        <label>Password: </label>
        <input 
        class = "textBox"
          type = "text"
          onChange = {(e) =>{
            setpasswordReg(e.target.value);
          }}/>
        <br></br>
        <button class = "button button1" onClick = {register}>Register</button>
      </div>

      <div className = "login">
        <h2> User Login </h2>
        <label>User Name: </label>
        <input 
        class = "textBox"
        type = "text"
        onChange = {(e) =>{
          setUsername(e.target.value);
        }}/>
        <br></br>
        <label>Password: </label>
        <input
        class = "textBox" type = "password"
        onChange = {(e) =>{
          setpassword(e.target.value);
        }}/>
        <br></br>
        <button class = "button button1" onClick = {login}>Login</button>
      </div>

      <h2>{loginStatus} </h2>
    </div>
  );
}


export default Useauth;
