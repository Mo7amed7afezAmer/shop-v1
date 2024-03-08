import axios from "axios";
import { useState, createContext, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// data
import allData from "./apis.json";

// import style files
import "bootstrap/dist/css/bootstrap.css";
import "./assets/sass/main.scss";

// import pages
import Layout from "./pages/Layout";
import Home from "./pages/home";
import Category from "./pages/category";
import Product from "./pages/product";
import Cart from "./pages/cart";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import NotImplementedPage from "./pages/NotImplementedPage";

// components
import ProtectedRoute from "./components/ProtectedRoute";

// data context
import { filterItems } from "./helperFunctions";

// create context
export const UserContext = createContext();
export const Helper = createContext();
export const Department = createContext();


function NotFound() {
  return (
    <>
      <h1>NotFound page</h1>
    </>
  );
}

// create router part [ main reules ]
const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/category/:catName", element: <Category /> },
      { path: "/product/:itemName", element: <Product /> },
      { path: "/cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "/*", element: <NotFound /> },
    ],
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/Login",
    element: <Login />,
  }
];
const router = createBrowserRouter(routes, {
  basename: "/shop-v1"
});


function App() {
  // hooks
  const [ depData, setDepData ] = useState("");

  // handle data
  useEffect(() => {

      const fetchData = async (e) => {
          const result = await axios({
              url: `https://shop-v1.onrender.com/display/dep`,
              method: `get`
          });
          setDepData(result.data);
      }
      fetchData();
  }, [])

  return (
    <Helper.Provider value={ filterItems }>
      <UserContext.Provider  value = { allData }>
        <Department.Provider value = { depData }>
          <div className="app">
            <RouterProvider router={ router } />
          </div>
        </Department.Provider>
      </UserContext.Provider>
    </Helper.Provider>
  );
}

export default App;
