import React, {useState} from 'react'
import './styles.css'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logout from '../../features/auth/Logout'
const Header = ({logo}) => {
    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    return (
        <header id="header" className="header">
            
            <div className="container">
                <div className="wrap__header">
                    <div className="logo">
                        <Link to="/"><img src={logo} alt="todo-redux-app" width="100" /></Link>
                    </div>   
                    <div className="menu">
                        <ul className="menu__items">
                            <li>
                                <Link to="/todo" className="nav-item">Todos</Link>
                            </li>  
                            { isAuthenticated ? <Logout/> : (
                                <>
                                    <li>
                                    <button 
                                        className="btn btn-outline btn-primary"
                                        onClick={() => navigate('/login')}
                                    >Login
                                    </button>
                                </li>    
                                <li>
                                    <button 
                                        className="btn btn-contained btn-primary"
                                        onClick={() => navigate('/register')}
                                    >
                                        Register
                                    </button>
                                </li>   
                            </> 
                            )
                            
                            }
                        
                        </ul>    
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header