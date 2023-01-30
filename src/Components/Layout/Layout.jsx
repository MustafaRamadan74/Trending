import React from 'react'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import { Outlet , useNavigate } from "react-router-dom"
export default function Layout({ userData, setUserData }) {

  let navigate = useNavigate();

  function logout(){
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("login");
  }

  return <>


    <Navbar logout={logout} userData={userData} />

    <div className="container">
      <Outlet></Outlet>

    </div>

    <Footer></Footer>


  </>
}
