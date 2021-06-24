import React,{useState,useEffect} from 'react';
import "./Profile.css";
import {useMedia} from "../../MediaContext";
import { Input } from "@material-ui/core";

function Profile() {

const[pics,setPics]=useState([]);
const{state,dispatch}=useMedia();
const [image,setImage]=useState("");
const [url,setUrl]=useState("");

    useEffect(()=>{

        fetch("http://localhost:5000/mypost",{
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ localStorage.getItem("jwt")
            }
        })
        .then(res=> res.json())
        .then(data=>{
            // console.log(data.mypost)
            setPics(data.mypost)

        })
        .catch(err=> console.log(err))
    },[])

    useEffect(()=>{
               
        if(image){
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
          console.log(data)
          
          setUrl(data.url)
          console.log(data)
         
          
          fetch("http://localhost:5000/updatepic", {
             method:"put",
             headers:{
                 "Content-Type":"application/json",
                 "Authorization":"Bearer "+ localStorage.getItem("jwt")
             },
             body:JSON.stringify({
                pic:data.url
             })
          })
          .then(res=>res.json())
          .then(result=>{
              console.log(result)
              localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
              dispatch({type:"UPDATEPIC",payload:result.pic})
          })
          .catch(err=>console.log(err))
    
        })
        .catch(err=>{
          console.log(err)
        })
        }

    },[image])

       const updatePhoto=(file)=>{
           setImage(file);
        
       }

       console.log(state);

    return (
        <div style={{paddingTop:"7rem"}}>
            
            <div style={{display:"flex",justifyContent:"space-evenly"}}>
           <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
          <img style={{borderRadius:"50%",width:"20rem",height:"15rem"}} src={state?state.pic:"Loading"} alt="" srcset="" />
          <Input type="file" onChange={(e) => updatePhoto(e.target.files[0])} />
          

          </div>



           <div style={{display:"flex",flexDirection:"column",gap:"2rem"}}>
           <h2>{state?state.name:"Anonymous"}</h2>
           <h2>{state?state.email:"Anonymous"}</h2>

           <div style={{display:"flex",gap:"1rem"}}>
              <h3>{pics.length} posts</h3>
              <h3>{state?state.followers.length:"0"} followers</h3>
              <h3>{state?state.following.length:"0"} following</h3> 
           </div>
           </div>


          </div>


          {/* Line break */}
          <hr style={{marginTop:"4rem"}} />

          <h1 style={{display:"flex",justifyContent:"center"}}>Gallery</h1>

          <div className="gallery">

              {
                  pics && pics.map((elem)=>{
                    return(
                        <>
                        <img className="img" src={elem.photo} alt="Gallery pics" />
                        </>
                    )
                  })
              }
             
          </div>
        </div>
    )
}

export default Profile
