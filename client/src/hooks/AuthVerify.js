
import React, { useEffect } from 'react'
import { logout } from '../features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router';


const parseJwt = (token) => {

    try{
        return JSON.parse(atob(token.split('.')[1]))
    }catch(error){
        return Promise.reject(error)
    }

}

const AuthVerify = () => {

    const dispatch = useDispatch()
    const location = useLocation();
    
    const verifyToken = () => {
        
        const token = localStorage.getItem('token')
      
        if(token){
        
            const decodeJWT = parseJwt(token);
            if(decodeJWT.exp * 1000 < Date.now()) {
               dispatch(logout())
               console.log('token expire')
            }
          
        }
    }

    useEffect( () => {

        return () => {
            verifyToken()
        }
    }, [location])

    return <></>
}

export default AuthVerify