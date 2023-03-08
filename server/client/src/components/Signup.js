import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import registerImage from '../images/Register.png';

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: ""
  })

  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  }

  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, work, password, cpassword })
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } 
    else {
      window.alert("Registration Successful");
      console.log("Registration Successful");

      navigate("/login");
    }

  }


  return (
    <>
      <div className="form"  >
        <form method='POST'>
          <div className="row">
            <h1 className='mb-4'>Registration</h1>
          </div>
          <div className="row">
            <div className="col ms-3">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" name='name' className="form-control" id="name" placeholder="Enter your Name" autoComplete='off' value={user.name} onChange={handleInputs} />
                <br />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" name='email' className="form-control" id="email" placeholder="Enter your email" autoComplete='off' value={user.email} onChange={handleInputs} />
                <br />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="number" name='phone' className="form-control" id="phone" placeholder="Enter your Phone no." autoComplete='off' value={user.phone} onChange={handleInputs} />
                <br />
              </div>
              <div className="form-group">
                <label htmlFor="work">Profession</label>
                <input type="text" name='work' className="form-control" id="work" placeholder="Enter your Profession" autoComplete='off' value={user.work} onChange={handleInputs} />
                <br />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name='password' className="form-control" id="password" placeholder="Enter your Password" autoComplete='off' value={user.password} onChange={handleInputs} />
                <br />
              </div>
              <div className="form-group">
                <label htmlFor="cpassword">Confirm Password</label>
                <input type="password" name='cpassword' className="form-control" id="cpassword" placeholder="Enter your Password" autoComplete='off' value={user.cpassword} onChange={handleInputs} />
                <br />
              </div>
              <div className="text-center">
                <button type="submit" name='signup' id='signup' className="btn btn-primary" onClick={PostData}>Register</button>
              </div>
            </div>

            <div className='col ms-5 mt-4'>
              <img src={registerImage} alt="Registration" width="90%" />
              <NavLink to="/login" className="nav-link text-center mt-2 ">I am already Registered</NavLink>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Signup