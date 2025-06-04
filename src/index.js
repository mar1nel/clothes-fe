import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import React from 'react';
import App from './App';

import Authentification from "./pages/Authentification";
// import './index.css';
import {createRoot} from "react-dom/client";


const router = createBrowserRouter([
    {path: "/", element: <App/>},
    {path: "/auth", element: <Authentification/>},
    // {path: "/shop-page", element: <ShopPage/>},
    // {path: "/checkout", element: <CheckoutPage/>},
    // {path: "/contact-page", element: <ContactPage/>},
]);


const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
);

