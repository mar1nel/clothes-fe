import React, {useEffect, useState} from "react";
import "./CartDrawer.scss";
import {useAuth} from "../contexts/AuthContext";
import { loadStripe } from '@stripe/stripe-js';

export default function CartDrawer({visible, onClose}) {
    const {userId} = useAuth();

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const FETCH_BASE = `http://localhost:8080/api/${userId}/cart`;
    const MUTATE_BASE = `http://localhost:8080/api/users/${userId}/cart`;

    useEffect(() => {
        if (!visible || !userId) return;

        setLoading(true);
        setError(null);

        (async () => {
            try {
                const res = await fetch(FETCH_BASE);
                if (res.status === 404) {
                    setCartItems([]);
                } else if (!res.ok) {
                    throw new Error(`Status ${res.status}`);
                } else {
                    const data = await res.json();
                    setCartItems(Array.isArray(data) ? data : []);
                }
            } catch (err) {
                console.error(err);
                setError("Could not load cart.");
            } finally {
                setLoading(false);
            }
        })();
    }, [visible, userId]);

    const handleRemove = async (clothesId) => {
        try {
            const res = await fetch(`${MUTATE_BASE}/${clothesId}`, {method: "DELETE"});
            if (!res.ok) throw new Error(`Status ${res.status}`);
            setCartItems(prev => prev.filter(ci => ci.clothes.id !== clothesId));
        } catch (err) {
            console.error(err);
            alert("Error removing item.");
        }
    };

    const handleDecrement = async (clothesId) => {
        try {
            const res = await fetch(`${MUTATE_BASE}/${clothesId}/removeOne`, {method: "POST"});
            if (!res.ok) throw new Error(`Status ${res.status}`);
            setCartItems(prev =>
                prev
                    .map(ci => ci.clothes.id === clothesId ? {...ci, quantity: ci.quantity - 1} : ci)
                    .filter(ci => ci.quantity > 0)
            );
        } catch (err) {
            console.error(err);
            alert("Error decrementing item.");
        }
    };

    const handleIncrement = async (clothesId) => {
        try {
            const res = await fetch(`${MUTATE_BASE}/${clothesId}/add`, {method: "POST"});
            if (!res.ok) throw new Error(`Status ${res.status}`);
            setCartItems(prev =>
                prev.map(ci => ci.clothes.id === clothesId ? {...ci, quantity: ci.quantity + 1} : ci)
            );
        } catch (err) {
            console.error(err);
            alert("Error incrementing item.");
        }
    };

    const totalPrice = cartItems.reduce(
        (sum, ci) => sum + ci.clothes.price * ci.quantity,
        0
    );

    const handleCheckout = async () => {
        if (!userId) {
            alert("Please log in to checkout.");
            return;
        }

        const stripePromise = loadStripe('pk_test_51RKlE6QrCy658sQLMNkNm9Tp7RrkYwk3cHFwDrfwOTNAGj5HHeoCxZ6ieOnDKYdOd3DO2He73HQUmr9r2VQ4Iuc600RGI5sHaF');
        const stripe = await stripePromise;
        try {
            const orderResp = await fetch(`http://localhost:8080/api/orders/checkout?userId=${userId}`, {
                method: "POST"
            });
            const { orderId } = await orderResp.json();

            // 2. Create Stripe session
            const stripeResp = await fetch(`http://localhost:8080/api/checkout-session/${orderId}`, {
                method: "POST"
            });
            const { sessionId } = await stripeResp.json();
            //akshan key:pk_test_51RKlE6QrCy658sQLMNkNm9Tp7RrkYwk3cHFwDrfwOTNAGj5HHeoCxZ6ieOnDKYdOd3DO2He73HQUmr9r2VQ4Iuc600RGI5sHaF
            // Replace with your Stripe public key!
            await stripe.redirectToCheckout({ sessionId });

        } catch (err) {
            console.error(err);
            alert("Could not start checkout.");
        }
    };

    return (
        <>
            <div className={`cart-overlay ${visible ? "visible" : ""}`} onClick={onClose}/>
            <div className={`cart-drawer ${visible ? "open" : ""}`}>
                <div className="cart-header">
                    <h2>Your Cart</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                {loading && <div className="cart-loading">Loading…</div>}
                {error && <div className="cart-error">{error}</div>}

                {!loading && !error && (
                    <div className="cart-items-container">
                        {cartItems.length === 0 ? (
                            <p className="empty-msg">Your cart is empty.</p>
                        ) : (
                            cartItems.map(ci => (
                                <div key={ci.clothes.id} className="cart-item">
                                    {ci.clothes.imageUrl && (
                                        <img
                                            src={ci.clothes.imageUrl}
                                            alt={ci.clothes.name}
                                            className="cart-item-img"
                                        />
                                    )}
                                    <div className="cart-item-info">
                                        <div className="cart-item-name">{ci.clothes.name}</div>
                                        <div className="cart-item-qty-price">
                                            <button
                                                className="qty-btn"
                                                disabled={ci.quantity <= 1}
                                                onClick={() => handleDecrement(ci.clothes.id)}
                                            >
                                                –
                                            </button>
                                            <span className="qty-display">{ci.quantity}</span>
                                            <button
                                                className="qty-btn"
                                                onClick={() => handleIncrement(ci.clothes.id)}
                                            >
                                                +
                                            </button>
                                            <span className="item-price">
                        RON {(ci.clothes.price * ci.quantity).toFixed(2)}
                      </span>
                                        </div>
                                    </div>
                                    <button
                                        className="remove-btn"
                                        onClick={() => handleRemove(ci.clothes.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="total">
                            <span>Total:</span>
                            <span className="total-price">RON {totalPrice.toFixed(2)}</span>
                        </div>
                        <button className="checkout-btn" onClick={handleCheckout}>
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
