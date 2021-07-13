import React,{useState,useEffect} from 'react';
import "./Profile.css";
import { Input } from "@material-ui/core";
import {updatepicAction} from "../../redux/actions/userAction";
import {useSelector,useDispatch} from "react-redux";

function Profile() {

const[pics,setPics]=useState([]);
const [image,setImage]=useState("");
const [url,setUrl]=useState("");
const state = useSelector(state => state.currentUser);
const dispatch=useDispatch();

    useEffect(()=>{

        fetch("https://social-media-testing.herokuapp.com/mypost",{
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
          
          
          setUrl(data.url)
          console.log(data.url)
         const temp=data.url
         const value=temp.replace("http","https");
         
          console.log(value)
          fetch("https://social-media-testing.herokuapp.com/updatepic", {
             method:"put",
             headers:{
                 "Content-Type":"application/json",
                 "Authorization":"Bearer "+ localStorage.getItem("jwt")
             },
             body:JSON.stringify({
                pic:value
             })
          })
          .then(res=>res.json())
          .then(result=>{
              console.log(result)
              localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                 dispatch(updatepicAction(result.pic))
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

    //    console.log(state);

    return (
        <div style={{paddingTop:"7rem"}}>
            
            <div className="upper-section">
           <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
          <img className="upper-img" src={state?state.pic:"Loading"} alt="" srcset="" />
          <Input type="file" onChange={(e) => updatePhoto(e.target.files[0])} />
          

          </div>



           <div style={{display:"flex",flexDirection:"column",gap:"2rem",paddingLeft:"1rem"}}>
           <h2>{state?state.name:"Anonymous"}</h2>
           <h2>{state?state.email:"Anonymous"}</h2>

           <div style={{display:"flex",gap:"1rem",flexWrap:"wrap",paddingLeft:"1rem"}}>
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
                        <img className="img-lower" src={elem.photo} alt="Gallery pics" />
                        </>
                    )
                  })
              }
             
          </div>
        </div>
    )
}

export default Profile
