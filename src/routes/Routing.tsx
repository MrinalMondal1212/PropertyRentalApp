import { createBrowserRouter } from "react-router-dom";
import Wrapper from "../userlayout/Wrapper";
// import { Children } from "react"
import Home from "../pages/Home";
import Aboutus from "../pages/Aboutus";
import Ourservices from "../pages/Ourservices";

import Gallery from "../pages/Gallery";

import ContactUs from "../pages/ContactUs";
// import AdminDashboard from "../pages/AdminDashboard";
import AdminWrapper from "../userlayout/AdminWrapper";
// import Userproperties from "../component/Adminproperties"
// import Adminproperties from "../component/Adminproperties"
import Addproperties from "../component/Addproperties";
import ManageProperties from "../component/ManageProperties";
import Booking from "../component/Booking";
import RemoveProperties from "../component/RemoveProperties";
import User from "../component/User";
import MiddleDashboard from "../component/MiddleDashboard";
import Adminproperties from "../component/Adminproperties";
import Register from "../pages/Register";
import Login from "../pages/Login";

const Routing = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "aboutus",
        element: <Aboutus />,
      },
      {
        path: "ourservices",
        element: <Ourservices />,
      },
      {
        path: "gallery",
        element: <Gallery />,
      },
      {
        path: "contactus",
        element: <ContactUs />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path : "register",
    element : <Register />
  },
  // this is the admin routes and very complecated
  {
    path: "admindashboard",
    element: <AdminWrapper />,

    children: [
      {
        index: true,
        element: <MiddleDashboard />,
      },
      {
        path: "adminproperties",
        element: <Adminproperties />,
      },
      {
        path: "addproperties",
        element: <Addproperties />,
      },
      {
        path: "manageproperties",
        element: <ManageProperties />,
      },
      {
        path: "bookings",
        element: <Booking />,
      },
      {
        path: "removeproperties",
        element: <RemoveProperties />,
      },
      {
        path: "user",
        element: <User />,
      },
    ],
  },
]);
export default Routing;
