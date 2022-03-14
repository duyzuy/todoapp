import React from 'react'
import {logout} from './authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
        window.location.reload();
    }
    return (
        <button className="btn" onClick={handleLogout}>Logout</button>
    )
}

export default Logout