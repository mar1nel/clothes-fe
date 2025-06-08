import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./CloudNavbar.scss";
import CartDrawer from "./CartDrawer";
import {useAuth} from "../contexts/AuthContext";

const CloudNavbar = () => {
    const [showCart, setShowCart] = useState(false);
    const {userId} = useAuth();

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
                    {userId && (
                        <span className="cart-link" onClick={() => setShowCart(true)}>
              Cart
            </span>
                    )}
                    <Link to="/auth">Auth</Link>
                </div>
            </nav>

            {userId && (
                <CartDrawer visible={showCart} onClose={() => setShowCart(false)}/>
            )}
        </>
    );
};

export default CloudNavbar;
