export const UserAction=(user)=>(dispatch,getState)=>{

    const {
        User:{users}
    }=getState();

    dispatch({
        type:"USER",
        payload:user
    })

}

export const ClearAction=()=>(dispatch,getState)=>{

    const {
        User:{users}
    }=getState();

    dispatch({
        type:"CLEAR"
    })
}

export const UpdateAction=(user)=>(dispatch,getState)=>{

    const {
        User:{users}
    }=getState();

    dispatch({
        type:"UPDATE",
        payload:{
            following:user.following,
            followers:user.followers
        }
    })
}

export const UpdatepicAction=(user)=>(dispatch,getState)=>{

    const {
        User:{users}
    }=getState();

    dispatch({
        type:"UPDATEPIC",
        payload:
           user
        
    })
     
}