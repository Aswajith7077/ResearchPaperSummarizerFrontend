import {createBrowserRouter} from "react-router-dom";
import App from "@/App.tsx";
import Login from "@/pages/Login.tsx";
import Signin from "@/pages/Signin.tsx";
import Home from "@/pages/Home.tsx";
import Chat from "@/pages/Chat.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element:<App/>
    },
    {
        path:"/login",
        element:<Login />
    },
    {
        path:"/signin",
        element:<Signin />
    },
    {
        path:"/home",
        element:<Home/>,
        children:[
            {
                path:"chat",
                element:<Chat/>
            }
        ]
    }
]);


export default router;