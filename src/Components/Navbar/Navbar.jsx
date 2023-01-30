import React from 'react'
import { Link } from "react-router-dom";
export default function Navbar({ userData, logout }) {
    return <nav className=' container p-2'>
        <div className=' row align-items-center '>
            <div className="col-lg-6 d-flex ">
                <h1 className=' me-2 my-0'>Noxe</h1>
                {userData ?
                    <ul className='d-flex list-unstyled m-0 align-items-center'>
                        <li className=' px-2'><Link to={"/"}>Home</Link></li>
                        <li className=' px-2'><Link to={"Movies"}>Movies</Link></li>
                        <li className=' px-2'><Link to={"People"}>People</Link></li>
                        <li className=' px-2'><Link to={"TV"}>TV</Link></li>
                    </ul> : ""}
            </div>
            <div className=" col-lg-4 d-flex socialMedia ms-auto align-items-center">
                <Link><i className=' fab mx-2 fa-facebook'></i></Link>
                <Link><i className=' fab mx-2 fa-instagram'></i></Link>
                <Link><i className=' fab mx-2 fa-twitter'></i></Link>
                <Link><i className=' fab mx-2 fa-spotify'></i></Link>
                <Link><i className=' fab mx-2 fa-youtube'></i></Link>
                <ul className='d-flex list-unstyled m-0 '>
                    {userData?<li className=' px-2 cursor-pointer' onClick={logout}><span >Logout</span></li>:<>
                    <li className=' px-2'><Link to={"register"}>Register</Link></li>
                    <li className=' px-2'><Link to={"login"}>Login</Link></li>
                    </>}
                    
                    
                </ul>
            </div>
        </div>
    </nav>
}
