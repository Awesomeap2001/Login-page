import React, { useState, useContext } from 'react'
import loginImage from '../images/login.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../App';

const Login = () => {
  const { state, dispatch } = useContext(UserContext)

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch('/signin', {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials");
    } else {
      dispatch({ type: "USER", payload: true })

      window.alert("Login Successful");
      navigate("/");
    }

  }

  return (
    <>
      <div className="form">
        <form method='POST'>
          <div className="row">
            <h1>Log In</h1>
          </div>

          <div className="row">
            <div className="col">
              <img src={loginImage} alt="Log In" width="90%" />
              <NavLink to="/signup" className="nav-link text-center mt-2 ">Create an Account</NavLink>
            </div>

            <div className="col mt-3">
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" name='email' className="form-control" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name='password' className="form-control" id="password" placeholder="Enter your Password" autoComplete='off' value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
              </div>
              <div className="text-center">
                <button type="submit" name='signin' id='signin' className="btn btn-primary" onClick={loginUser}>Login</button>
              </div>
            </div>

          </div>
        </form>
      </div>
    </>
  )
}

export default Login