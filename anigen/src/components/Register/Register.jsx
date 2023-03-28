import React, { useState } from 'react';
import axios from "axios"
const Register = () => {
  const [user,setUser] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  })
  const handleChange = e =>{
    const {name,value}=e.target
    setUser({

      ...user,
      [name]: value
    })
  }

  const registerUser = () =>{
    const {name, email, password, confirmPassword} = user
    if(name && email && password && password === confirmPassword){
      // alert("Posted")
      axios.post("http://localhost:4000/register", user)
      .then( res => alert(res.data.message))
    }
    else{
      alert("Invalid Input")
    }
  }
  return (
    <div>
    {console.log("User",user)}
    <div className="container shadow my-5">
      <div className="row">
      <div className="col-md-6 mt-5">
        <img src="/assets/about1.png" alt="Contact" className="w-75 mt-5"/>
      </div>
        <div className="col-md-6 p-5">
        <h1 className="display-6 fw-bolder mb-5">Register</h1>
        <form>
          <div class="mb-3">
            <label for="exampleInputName" class="form-label">Name</label>
            <input type="text" class="form-control" id="exampleInputName" name="name" value={user.name} placeholder="Your Name" onChange={handleChange}/>
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            name="email" value={user.email} placeholder="Your Email" onChange={handleChange}/>
            </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" name="password" value={user.password} placeholder="Your Password" onChange={handleChange}/>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword2" class="form-label">Confirm Password</label>
            <input type="password" class="form-control" id="exampleInputPassword2" name="confirmPassword" value={user.confirmPassword} placeholder="Confirm Password" onChange={handleChange}/>
          </div>
          <button type="submit" class="btn btn-primary" onClick={registerUser}>Submit</button>
        </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Register;
