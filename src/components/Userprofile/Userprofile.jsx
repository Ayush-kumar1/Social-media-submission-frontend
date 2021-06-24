import React, { useState, useEffect } from "react";
import "./Userprofile.css";
import { useMedia } from "../../MediaContext";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";

function Userprofile() {
  
  const [Profile, setProfile] = useState(null);
 
  
  const { state,dispatch } = useMedia();
  const { userid } = useParams();
  const [showfollow,setShowFollow]=useState(state?!state.following.includes(userid):true)

  useEffect(() => {
    fetch(`http://localhost:5000/user/${userid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
       
        
        setProfile(data);
        
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(Profile);


  const follow=()=>{
    fetch("http://localhost:5000/follow",{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        followId:userid
      })
    })
    .then(res=>res.json())
    .then(result=>{
      dispatch({type:"UPDATE", payload:{following:result.following, followers:result.followers}})
      localStorage.setItem("user",JSON.stringify(result))
      console.log(result)
      setProfile((prevState)=>{
        return{
          ...prevState,
          user:{
            ...prevState.user,
            followers:[...prevState.user.followers,result._id]
          }
        }
      })
      setShowFollow(false)
    })
    .catch(err=>{
      console.log(err)
    })
  }


  const unfollow=()=>{
    fetch("http://localhost:5000/unfollow",{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        unfollowId:userid
      })
    })
    .then(res=>res.json())
    .then(result=>{
      dispatch({type:"UPDATE", payload:{following:result.following, followers:result.followers}})
      localStorage.setItem("user",JSON.stringify(result))
      console.log(result)
      setProfile((prevState)=>{
        const newFollower=prevState.user.followers.filter(item=>item!==result._id)
        return{
          ...prevState,
          user:{
            ...prevState.user,
            followers: newFollower
          }
        }
      })

      setShowFollow(true)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  console.log(Profile);


  return (
    <>

    
      {Profile ?
      
      <div style={{ paddingTop: "7rem" }}>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <img
          style={{ borderRadius: "50%", width: "20rem", height: "15rem" }}
          src={Profile.user.pic}
          alt=""
          srcset=""
        />

        <div
          style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        >
          {/* <h2>{Profile.user.name}</h2> */}


          {showfollow===true
          ? <Button  variant="contained"
          color="primary" onClick={()=> follow()}>Follow</Button>
          : <Button  variant="contained"
          color="primary" onClick={()=> unfollow()}>Unfollow</Button>}

          
          

          <div style={{ display: "flex", gap: "1rem" }}>
              <h3>{Profile?Profile.posts.length:"0"} posts</h3>
            <h3>{Profile?Profile.user.followers.length:"0"} followers</h3>
            <h3>{Profile?Profile.user.following.length:"0"} following</h3>   
          </div>
        </div>
      </div>

      {/* Line break */}
      <hr style={{ marginTop: "7rem" }} />

      <h1 style={{ display: "flex", justifyContent: "center" }}>Gallery</h1>

      <div className="gallery">
        {Profile.posts &&
          Profile.posts.map((elem) => {
            return (
              <>
                <img className="img" src={elem.photo} alt="Gallery pics" />
              </>
            );
          })}
      </div>
    </div>
      
      
      
      : <h2 style={{paddingTop:"7rem"}}>Loading ...</h2> }
      
       
       
        
      
    </>
  );
}

export default Userprofile;
