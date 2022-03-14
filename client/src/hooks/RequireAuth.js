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

const AuthHeader = () => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    if(token){
        return `auth-token: ${token}`
    }
    return '';
}
    
export {RequireAuth, RedirectAuth, AuthHeader}