import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
// import {isAuthented} from '../features/auth/authSlice'


const RequireAuth = ({children}) => {
    
    let location = useLocation();
    const isAuth = useSelector(state => state.auth.isAuthenticated)
    if(!isAuth){
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children

}

const RedirectAuth = ({children}) => {
    const location = useLocation()
    const isAuth = useSelector(state => state.auth.isAuthenticated)
    if(isAuth) return <Navigate to="/" state={{ from: location }} replace={true}/>

    return children
}

const authHeader = ({...headers} = {}) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    let headerConfig = {
        ...headers
    }
    if(token){
        
        headerConfig = {
            'auth-token': token,
            ...headers
        }
    }
    return headerConfig
}
    
export {RequireAuth, RedirectAuth, authHeader}