// src/components/CloudNavbar.jsx
import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./CloudNavbar.scss";
import CartDrawer from "./CartDrawer";

const CloudNavbar = () => {
    const [showCart, setShowCart] = useState(false);

    return (
        <>
            <nav className="cloud-navbar">
                <div className="logo">KIKO</div>

                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/shop">New Arrivals</Link>
                    <Link to="/girls">Girls</Link>
                    <Link to="/boys">Boys</Link>
                    <Link to="/sale">Sale</Link>
                </div>

                <div className="nav-actions">
          <span className="cart-link" onClick={() => setShowCart(true)}>
            Cart
          </span>
                    <Link to="/auth">Auth</Link>
                </div>
            </nav>

            {/* CartDrawer slides in/out based on showCart */}
            <CartDrawer visible={showCart} onClose={() => setShowCart(false)}/>
        </>
    );
};

export default CloudNavbar;
