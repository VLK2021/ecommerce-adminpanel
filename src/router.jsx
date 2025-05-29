import {createBrowserRouter, Navigate} from "react-router-dom";

import MainLayout from "./layouts/MainLayout/MainLayout.jsx";
import PublicLayout from "./layouts/PublicLayout/PublicLayout.jsx";
import {DashboardPage, LoginPage, RegisterPage} from "./pages/index.js";
import PrivateLayout from "./layouts/PrivateLayout/PrivateLayout.jsx";
import {PrivateRoute} from "./hok/index.js";

const router = createBrowserRouter([
    {
        path: "/", element: <MainLayout/>, children: [
            {index: true, element: <Navigate to={'/login'}/>},

            {
                element: <PublicLayout/>, children: [
                    {path: "/login", element: <LoginPage/>},
                    {path: "/register", element: <RegisterPage/>}
                ]
            },
            {
                element: <PrivateRoute><PrivateLayout/></PrivateRoute>, children: [
                    {path: '/dashboard', element: <DashboardPage/>, children: [

                        ]}
                ]
            }
        ]
    }
]);

export default router;