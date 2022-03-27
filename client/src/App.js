import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import logo from './logo.svg';
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './features/home/Home'
import Todo from './features/todo/Todo'
import Signup from './features/auth/pages/Signup';
import Login from './features/auth/pages/Login';
import { RequireAuth, RedirectAuth } from './hooks/RequireAuth';
import AuthVerify from './hooks/AuthVerify'



function App() {
	return (

		<Router>
			<Header logo={logo} />
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route
					path="todo"
					element={
						<RequireAuth>
							<Todo />
						</RequireAuth>
					}>
				</Route>
				<Route path="login" element={
					<RedirectAuth>
						<Login />
					</RedirectAuth>
				}></Route>
				<Route path="register" element={
					<RedirectAuth>
						<Signup />
					</RedirectAuth>
				}></Route>
			</Routes>
			<Footer />
			<AuthVerify />
		</Router>


	);
}

export default App;
