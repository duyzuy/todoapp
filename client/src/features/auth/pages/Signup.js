import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {registerUser} from '../authSlice'
import {useNavigate} from 'react-router-dom'

const Signup = () => {

    const [user, setUser] = useState({})
    const dispatch = useDispatch();
    const [status, setStatus] = useState('idle')
    const [loading, setLoading] = useState(false)

 
    //handle all input
    const handleChange = (e) => {
      
        setUser(prev => {return {...prev, [e.target.name]: e.target.value} })
    }

    //register user
    const canSave = loading === false && status === 'idle'
    const handleRegister = async () => {
       
        if(canSave){
            setLoading(true)
            setStatus('loading')
            setTimeout( async () => {
                try{
                    await dispatch(registerUser({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.userName,
                        password: user.password,
                        email: user.userEmail,
                        phone: user.phone
                    })).unwrap()
                    setUser({})
                 
                }catch(err){
                    console.log(err)
                }finally{
                    setLoading(false)
                    setStatus('idle')
                }
            },2000)
        }
    }

    return (
        <div className="container signup__page">
                <div className="header__page">
                    <h1>Signup</h1>
                </div>
                <div className="body__page">
                    <div className="row">
                        <div className="form__group col-12 col-md-6">
                            <label htmlFor='firstName'>First Name</label>
                            <input 
                                id='firstName'
                                type="text"
                                className="form__control"
                                placeholder="First name"
                                name="firstName"
                                value={user.firstName ? user.firstName : ''}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>  
                        <div className="form__group col-12 col-md-6">
                            <label htmlFor='lastName'>Last Name</label>
                            <input 
                                id='lastName'
                                type="text"
                                className="form__control"
                                placeholder="Last name"
                                name="lastName"
                                value={user.lastName ? user.lastName : ''}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>  
                    </div>
                    <div className="row">
                        <div className="form__group col-12 col-md-6">
                            <label htmlFor='userName'>User Name</label>
                            <input 
                                id='userName'
                                type="text"
                                className="form__control"
                                placeholder="User name"
                                name="userName"
                                value={user.userName ? user.userName : ''}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>  
                        <div className="form__group col-12 col-md-6">
                            <label htmlFor='userEmail'>Email</label>
                            <input 
                                id='userEmail'
                                type="email"
                                className="form__control"
                                placeholder="Email"
                                name="userEmail"
                                value={user.userEmail ? user.userEmail : ''}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>      
                    </div>
                    <div className="row">
                        <div className="form__group col-12 col-md-6">
                            <label htmlFor='userPassword'>Password</label>
                            <input 
                                id='userPassword'
                                type="password" 
                                className="form__control"
                                placeholder="Your password"
                                name="password"
                                value={user.password ? user.password : ''}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>   
                        <div className="form__group col-12 col-md-6">
                            <label htmlFor='userPhone'>Phone</label>
                            <input 
                                id='userPhone'
                                type="phone" 
                                className="form__control"
                                placeholder="Phone"
                                name="phone"
                                value={user.phone ? user.phone : ''}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>    
                    </div>     
                    <button 
                        className="btn btn-primary btn-contained"
                        onClick={handleRegister}
                        disabled={loading ? 'disabled' : ''}
                    >Sign up</button>
                </div>
    
        </div>
    )
}

export default Signup