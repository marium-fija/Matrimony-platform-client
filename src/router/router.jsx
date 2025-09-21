import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../Home/Home"

export const router = createBrowserRouter([
    {
        path : "/",
        Component: HomeLayout,
        children: [
            {
                index: true,
                Component: Home 
            },
            {
                path: '/biodata',
                
            },
        ]
    }
])