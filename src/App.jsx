import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './Components/Layout/Layout';
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Movies from "./Components/Movies/Movies";
import People from "./Components/People/People";
import Register from "./Components/Register/Register";
import Tv from "./Components/Tv/Tv";
import ItemDetails from './Components/ItemDetails/ItemDetails';
import { Offline } from "react-detect-offline";
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ErrorPage from './Components/ErrorPage/ErrorPage';

function App() {

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      saveUserData();
    }
  }, []);

  let [userData, setUserData] = useState(null);

  function saveUserData() {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setUserData(decodedToken);
  }

  let routers = createBrowserRouter([
    {
      path: "/", element: <Layout setUserData={setUserData} userData={userData} />, children: [
        { index: true, element: <ProtectedRoute userData={userData}> <Home /> </ProtectedRoute> },
        { path: "movies", element: <ProtectedRoute userData={userData}> <Movies /> </ProtectedRoute> },
        { path: "people", element: <ProtectedRoute userData={userData}><People /></ProtectedRoute> },
        { path: "itemdetails/:id/:media_type", element: <ProtectedRoute userData={userData}> <ItemDetails /> </ProtectedRoute> },
        { path: "tv", element: <ProtectedRoute userData={userData}> <Tv /> </ProtectedRoute> },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "register", element: <Register /> },
        {path:'*', element: <ErrorPage/>}
      ]
    }
  ]);

  return <>
    <Offline><div className="offline">you are offline</div></Offline>
    <RouterProvider router={routers} />
  </>
};
export default App;
