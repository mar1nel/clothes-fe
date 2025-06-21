import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import React from 'react';
import App from './App';

import Authentification from "./pages/Authentification";
import {createRoot} from "react-dom/client";
import ItemPage from "./pages/ItemPage";
import ShopPage from "./pages/ShopPage";
import {AuthProvider} from "./contexts/AuthContext";
import SuccessPage from "./pages/SuccessPage";
import AdminPanel from "./pages/AdminPanel";

const router = createBrowserRouter([
    {path: "/", element: <App/>},
    {path: "/shop", element: <ShopPage/>},
    {path: "/shop/:id", element: <ItemPage/>},
    {path: "/success", element: <SuccessPage/>},
    {path: "/auth", element: <Authentification/>},
    {path: "/admin", element: <AdminPanel/>},
    // {path: "/shop-page", element: <ShopPage/>},
    // {path: "/checkout", element: <CheckoutPage/>},
    // {path: "/contact-page", element: <ContactPage/>},
]);


const root = createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>
    </AuthProvider>,
);

