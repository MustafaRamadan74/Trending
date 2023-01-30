import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import joi from "joi";
import { Helmet } from "react-helmet";

export default function Login({ saveUserData }) {

  let navigate = useNavigate();
  const [errorList, seterrorList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  function getUserData(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  async function sendLoginData() {
    let { data } = await axios.post(`https://sticky-note-fe.vercel.app/signin`, user)
    if (data.message === "success") {
      // login\\home
      setisLoading(false);
      localStorage.setItem("userToken", data.token);
      saveUserData();
      navigate("/");
    }
    else {
      setError(data.message);
      setisLoading(false);
    }
  }

  function submitForm(e) {
    e.preventDefault();
    setisLoading(true);
    let validation = validateLogin();
    if (validation.error) {
      setisLoading(false);
      seterrorList(validation.error.details);
    }
    else {
      sendLoginData();
    }
  }

  function validateLogin() {
    let scheme = joi.object({
      email: joi.string().email({ tlds: { allow: ["com", "net"] } }).required(),
      password: joi.string().pattern(/^[A-Z][a-z]{3,6}/)
    });

    return scheme.validate(user, { abortEarly: false });
  }


  return <>

    <div className="application">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </div>

    {errorList.map((err, index) => {
      if (err.context.label === "password") {
        return <div key={index} className="alert alert-warning my-2">password invalid</div>
      }
      else {
        return <div key={index} className="alert alert-warning my-2">{err.message}</div>
      }
    })}
    {error.length > 0 ? <div className="alert alert-warning my-2">{error}</div> : ""}

    <form onSubmit={submitForm}>
      <label htmlFor="email">email : </label>
      <input onChange={getUserData} type="email" className=' my-input form-control my-3' name='email' id='email' />
      <label htmlFor="password">password : </label>
      <input onChange={getUserData} type="password" className=' my-input form-control my-3' name='password' id='password' />
      <button className=' btn btn-info' type='submit'>{isLoading === true ? <i className='fas fa-spinner fa-spin'></i> : "Login"}</button>
    </form>


  </>
}
