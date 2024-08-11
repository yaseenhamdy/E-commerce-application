import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'


export default function ProtectedRoute(props) {
    // let {setShowNavigateMsg} = useContext(UserContext);
    if(localStorage.getItem('userToken') !== null){
        // setShowNavigateMsg(false);
        return props.children
    }
    else{
        // setShowNavigateMsg(true);        
      return <Navigate to={'/login'} />
    }
    
 
}


