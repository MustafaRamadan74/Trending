import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import joi from "joi";
import { Helmet } from 'react-helmet';


export default function Register() {

  let navigate = useNavigate();
  const [errorList, seterrorList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    password: ""
  })

  function getUserData(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  async function sendRegisterData() {
    let { data } = await axios.post(`https://sticky-note-fe.vercel.app/signup`, user)
    if (data.message === "success") {
      // login\\home
      navigate("/login")
      setisLoading(false);
    }
    else {
      setError(data.message)
      setisLoading(false);
    }
  }

  function submitForm(e) {
    e.preventDefault();
    setisLoading(true);
    let validation = validateRegister();
    if (validation.error) {
      setisLoading(false);
      seterrorList(validation.error.details);
    }
    else {
      sendRegisterData();
    }
  }

  function validateRegister() {
    let scheme = joi.object({
      first_name: joi.string().min(3).max(10).required(),
      last_name: joi.string().min(3).max(10).required(),
      age: joi.number().min(16).max(80),
      email: joi.string().email({ tlds: { allow: ["com", "net"] } }).required(),
      password: joi.string().pattern(/^[A-Z][a-z]{3,6}/)
    });

    return scheme.validate(user, { abortEarly: false });
  }


  return <>

  <Helmet>
    <title>Register</title>
  </Helmet>

    {errorList.map((err, index) => {
      if (err.context.label === "password") {
        return <div key={index} className="alert alert-warning my-2">password invalid 'must start with capital letter'</div>
      }
      else {
        return <div key={index} className="alert alert-warning my-2">{err.message}</div>
      }
    })}
    {error.length > 0 ? <div className="alert alert-warning my-2">{error}</div> : ""}

    <form onSubmit={submitForm}>
      <label htmlFor="first_name">first_name : </label>
      <input onChange={getUserData} type="text" className=' my-input form-control my-3' name='first_name' id='first_name' />
      <label htmlFor="last_name">last_name : </label>
      <input onChange={getUserData} type="text" className=' my-input form-control my-3' name='last_name' id='last_name' />
      <label htmlFor="age">age : </label>
      <input onChange={getUserData} type="number" className=' my-input form-control my-3' name='age' id='age' />
      <label htmlFor="email">email : </label>
      <input onChange={getUserData} type="email" className=' my-input form-control my-3' name='email' id='email' />
      <label htmlFor="password">password : </label>
      <input onChange={getUserData} type="password" className=' my-input form-control my-3' name='password' id='password' />
      <button className=' btn btn-info' type='submit'>{isLoading === true ? <i className='fas fa-spinner fa-spin'></i> : "Register"}</button>
    </form>


  </>
}
