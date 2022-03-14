import React, {useEffect, useState} from 'react'
import './styles.css'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {loginUser} from '../authSlice'
import {} from '../authSlice'
const Login = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [requestStatus, setRequestStatus] = useState('idle')
    const [message, setMessage] = useState({email: '', password: ''})
    const [emailStatus, setEmailStatus] = useState('')
    const [passwordStatus, setPasswordStatus] = useState(false)

    const validateEmail = (email) => {
        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const result = pattern.test(email);
        if(result===true) {
            setEmailStatus('')
            return true
        }else{
            setEmailStatus('Email is not valid')
            return false
        }
    }
    const validatePassword = (password) => {
        if(password.length < 5) {
            setPasswordStatus('password length >5')
            return false
        
        }else{
            setPasswordStatus('')
            return true
        }
    }

    const handleLogin = async () => {
        if(validateEmail(email) && validatePassword(password)){
            setRequestStatus('pending')
            if(requestStatus === 'idle'){
                try{
                    const response = await dispatch(loginUser(
                        {
                            email: email, 
                            password: password
                        })
                    ).unwrap();
                    if(response.status === 400){
                        setMessage(response.message)
                        return;
                    }
                    navigate('/todo')
                }catch(err){
                    console.log(err)
                }finally{
                    setRequestStatus('idle')
                }
            }
        }
    }
    const unsubScribeLogin = () => {
        validateEmail('')
        validatePassword('')
    }
    
    useEffect( () => {
        return  () => {
            unsubScribeLogin()
        }
    }, [])
    return (
        <div className="container login__page">
            <div className="header__page">
                <h1>Login</h1>
            </div>
            <div className="body__page">
                <div className="form__group">
                    <label htmlFor='userEmail'>Email</label>
                    <input 
                        id='userEmail'
                        type="email"
                        className="form__control"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>  
                <div className="form__group">
                    <label htmlFor='userPassword'>Password</label>
                    <input 
                        id='userPassword'
                        type="password" 
                        className="form__control"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>     
                <button className="btn btn-primary btn-outline" onClick={handleLogin}>Login</button>
            </div>
        </div>
    
  )
}

export default Login