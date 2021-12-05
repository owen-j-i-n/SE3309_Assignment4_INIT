
import './App.css';
import{BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Auth from "./pages/Useauth";
import Board from "./pages/dashboard";
import Update from "./pages/profile";
import Membership from "./pages/membership";
import Home from "./pages/home";

function App() {
  return(
    <div>
    <Router>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/auth" element = {<Auth/>}/>
        <Route path = "/board" element = {<Board/>}/>
        <Route path = "/updateProfile" element = {<Update/>}/>
        <Route path = "/getmember" element = {<Membership/>}/>

      </Routes>
    </Router>
    </div>
  );
}


export default App;
