import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../Home/Home"
import Login from "../pages/Login";
import Register from "../pages/Register";
import AuthLayout from "../layouts/AuthLayout";
import Biodata from "../pages/Biodata";
import Contact from "../pages/Contact";
import About from "../pages/About";
import DashBoardLayout from "../layouts/DashBoardLayout";
import UserHome from "../UserDashBoard/UserHome";
import EditBiodata from "../UserDashBoard/EditBiodata";
import ViewBiodata from "../UserDashBoard/ViewBiodata";
import ContactRequest  from "../UserDashBoard/ContactRequest";
import FavouritesBiodata from "../UserDashBoard/FavouritesBiodata";
import GotMarried from "../UserDashBoard/GotMarried";
import PrivateRoute from "../provider/PrivateRoute";
import AdminRoute from "../provider/AdminRoute";
import AdminHome from "../pages/AdminDashBoard/AdminHome";
import ManageUsers from "../pages/AdminDashBoard/ManageUsers";
import PremiumRequests from "../pages/AdminDashBoard/PremiumRequests";
import AdminContact from "../pages/AdminDashBoard/AdminContact";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/biodata",
                element: <Biodata></Biodata>
            },
            {
                path: "/about",
                element: <About></About>
            },
            {
                path: "/contact",
                element: <Contact></Contact>
            },
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "register",
                element: <Register></Register>
            },
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
        children: [
            {
                index: true,
                element: <UserHome></UserHome>
            },
            {
                 path: "edit-biodata", 
                 element: <EditBiodata></EditBiodata> 
            },
            {
                path: "view-biodata/email/:email",
                element: <ViewBiodata></ViewBiodata>
            },
            {
                 path: "contact-request",
                 element: <ContactRequest></ContactRequest> 
            },
            {
                 path: "favourites", 
                 element: <FavouritesBiodata></FavouritesBiodata> 
            },
            {
                 path: "got-married",
                 element: <GotMarried></GotMarried> 
            },
        ]
    },
    {
        path: "/dashboard/admin",
        element: <AdminRoute>
            <DashBoardLayout></DashBoardLayout>
        </AdminRoute>,
        children: [
            {
                index: true,
                element: <AdminHome></AdminHome>
            },
            {
                path: "users",
                element: <ManageUsers></ManageUsers>
            },
            {
                path: "premium",
                element: <PremiumRequests></PremiumRequests>
            },
            {
                path: "contact",
                element: <AdminContact></AdminContact>
            }
        ]
    },
])