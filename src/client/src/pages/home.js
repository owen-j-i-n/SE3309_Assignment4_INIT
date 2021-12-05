import React from "react";
import '../App.css';
import {useNavigate} from "react-router-dom";
function Usehome(){
    let navigate = useNavigate();
    const login = ()=>{
        navigate("/auth");
    }
    return(
    <div>
        <body>
            <div class="bgImg"></div>
            <button class="loginButton button1" onClick={login}>Login/Register</button>
        </body>
    </div>
    );
}
export default Usehome;