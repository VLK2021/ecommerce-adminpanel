import {createBrowserRouter, Navigate} from "react-router-dom";

import MainLayout from "./layouts/MainLayout/MainLayout.jsx";
import PublicLayout from "./layouts/PublicLayout/PublicLayout.jsx";
import {
    BrandsPage,
    CartsPage,
    CategoriesPage, ClientsPage,
    DashboardPage, DiscountsPage,
    LoginPage,
    OrdersPage, PaymentsPage,
    ProductPage,
    RegisterPage, ReturnsPage, ReviewsPage, SettingsPage, ShippingPage, StocksPage
} from "./pages/index.js";
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
                    {path: '/dashboard', element: <DashboardPage/>, children: []},
                    {path: '/orders', element: <OrdersPage/>, children: []},
                    {path: '/carts', element: <CartsPage/>, children: []},
                    {path: '/catalog/products', element: <ProductPage/>, children: []},
                    {path: '/catalog/categories', element: <CategoriesPage/>, children: []},
                    {path: '/catalog/brands', element: <BrandsPage/>, children: []},
                    {path: '/clients', element: <ClientsPage/>, children: []},
                    {path: '/reviews', element: <ReviewsPage/>, children: []},
                    {path: '/discounts', element: <DiscountsPage/>, children: []},
                    {path: '/stocks', element: <StocksPage/>, children: []},
                    {path: '/shipping', element: <ShippingPage/>, children: []},
                    {path: '/payments', element: <PaymentsPage/>, children: []},
                    {path: '/returns', element: <ReturnsPage/>, children: []},
                    {path: '/settings', element: <SettingsPage/>, children: []},
                ]
            }
        ]
    }
]);

export default router;