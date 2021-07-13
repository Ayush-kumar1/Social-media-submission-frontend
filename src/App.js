import './App.css';
import Header from "./components/Header/Header";
import {Routes,Route} from "react-router-dom";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import CreatePost from "./components/CreatePost/CreatePost";
import {useNavigate} from "react-router-dom";
import { useEffect } from 'react';
import {useMedia} from "./MediaContext";
import Userprofile from './components/Userprofile/Userprofile';
import Subscribepost from "./components/Subscribepost/Subscribepost";

function App() {

  let navigate=useNavigate();
  const {state,dispatch}=useMedia();

  useEffect(()=>{
    
    let user=JSON.parse(localStorage.getItem('user'));
    
    if(user){
      // navigate("/")
      dispatch({type:"USER",payload:user})
    }
    else{
      navigate("/login")
    }
  },[])
  return (
    <div className="App">
      <Header/>
      <Routes>
     
     <Route  path="/" element={<Login/>}/>
     <Route  path="/home" element={<Home/>}/>
     <Route path="/login" element={<Login/>} />
     <Route path="/signup" element={<Signup/>}/>
     <Route path="/profile" element={<Profile/>}/>
     <Route path="/createpost" element={<CreatePost/>}/>
     <Route path="/profile/:userid" element={<Userprofile/>}/>
     <Route path="/subscribepost" element={<Subscribepost/>}/>
     </Routes>
    </div>
  );
}

export default App;
