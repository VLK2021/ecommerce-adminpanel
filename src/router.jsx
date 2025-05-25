import {createBrowserRouter, Navigate} from "react-router-dom";

import MainLayout from "./layouts/MainLayout/MainLayout.jsx";
import PublicLayout from "./layouts/PublicLayout/PublicLayout.jsx";
import {LoginPage} from "./pages/index.js";

const router = createBrowserRouter([
    {
        path: "/", element: <MainLayout/>, children: [
            {index: true, element: <Navigate to={'/login'}/>},

            {
                element: <PublicLayout/>, children: [
                    {path: "/login", element: <LoginPage/>}
                ]
            },
        ]
    }
]);

export default router;