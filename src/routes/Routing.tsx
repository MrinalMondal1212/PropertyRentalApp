import { createBrowserRouter } from "react-router-dom";
import Wrapper from "../userlayout/Wrapper";
import Home from "../pages/Home";
import Aboutus from "../pages/Aboutus";
import Gallery from "../pages/Gallery";
import ContactUs from "../pages/ContactUs";
import AdminWrapper from "../userlayout/AdminWrapper";
import Addproperties from "../component/Addproperties";
import ManageProperties from "../component/ManageProperties";
import Booking from "../component/Booking";
import RemoveProperties from "../component/RemoveProperties";
import MiddleDashboard from "../component/MiddleDashboard";
import Adminproperties from "../component/Adminproperties";
import Register from "../pages/Register";
import Login from "../pages/Login";
import FAQ from "../component/FAQ";
import TermsAndConditions from "../component/TermsAndConditions";
import Properties from "../pages/Properties";
import Services from "../pages/Services";
import Checkout from "../component/Checkout";
import MyOrders from "../pages/MyOrders";
import SearchView from "../pages/SearchView";
import ProtectedRoute from "../component/ProtectedRoute";
import AdminRoute from "../component/AdminRoute";

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
        path: "services",
        element: <Services />,
      },
      {
        path: "gallery",
        element: <Gallery />,
      },
      {
        path: "properties",
        element: <Properties />,
      },
      {
        path: "faq",
        element: <FAQ />,
      },
      {
        path: "termsandconditions",
        element: <TermsAndConditions />,
      },
      {
        path: "contactus",
        element: <ContactUs />,
      },
      {
        path: "/checkout/:id",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "myorders",
        element: (
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "searchview",
        element: <SearchView />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },

  // this is the admin routes and very complecated
  {
    path: "admindashboard",
    element: (
      <AdminRoute>
        <AdminWrapper />
      </AdminRoute>
    ),

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
        path: "booking",
        element: <Booking />,
      },
      {
        path: "removeproperties",
        element: <RemoveProperties />,
      },
    ],
  },
]);
export default Routing;
