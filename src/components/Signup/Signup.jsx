import React, { useState,useEffect } from "react";
import "./Signup.css";
import { Input } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image,setImage]=useState("");
  const [url,setUrl]=useState(null);
  let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

  let navigate=useNavigate();
 

  useEffect(()=>{
     
    if(url){
      uploadfield()
    }
  },[url])

  const uploadPic=()=>{
    const data=new FormData();
    data.append("file",image);
    data.append("upload_preset","social-media");
    data.append("cloud_name","ayush5555");
    fetch("	https://api.cloudinary.com/v1_1/ayush5555/image/upload",{
      method:"post",
      body:data
    })
    .then(res=> res.json())
    .then(data=> {
      console.log(data.url)
      const temp=data.url;
      const value=temp.replace("http","https");
      // setUrl(data.url)
      setUrl(value);
      console.log(url)
      // window.location.reload(); 

    })
    .catch(err=>{
      console.log(err)
    })


  }


  const uploadfield=()=>{
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      return toast.error("Invalid Email")
  }

  if(!strongRegex.test(password)){
    return toast.error("Your password is too weak")
  }
  
  else{
    fetch("https://social-media-testing.herokuapp.com/signup", {
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            name:name,
            password:password,
            email:email,
            pic:url
           
        })
    })
    .then(res=> res.json())
    .then(data=> {

      if(data.error){
          toast.error(data.error)
          
      }
      else{
         toast.success(data.message)
          navigate("/login")
      }
        
    })
    .catch(err=>{
        console.log(err)
    })
  }
  }


  const postData=()=>{
  console.log(image);
     if(image){

       uploadPic()
     }
     else{
       uploadfield()
     }

    
  }



  return (
    <div style={{ paddingTop: "9rem" }}>
      <div className="media_card_signup">
        <h1 className="brand-logo" style={{ margin: "0 auto" }}>
        Chit-Chat
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Input type="file" onChange={(e) => setImage(e.target.files[0])} /> 

          <Button
            variant="contained"
            color="secondary"
            style={{ width: "2rem", margin: "0px auto" }}
            onClick={()=> postData()}
          >
            Signup
          </Button>

          <div className="signup-redirect">
            <Link to="/login">
              {" "}
              <h5 className="signup-redirect" style={{ color: "black" }}>
                Already have an account??
              </h5>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer/>
      <ToastContainer/>
      <ToastContainer/>
      <ToastContainer/>
    </div>
  );
}

export default Signup;
