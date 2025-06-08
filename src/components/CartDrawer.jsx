import React, {useEffect, useState} from "react";
import "./CartDrawer.scss";
import {useAuth} from "../contexts/AuthContext";

export default function CartDrawer({visible, onClose}) {
    const {userId} = useAuth();

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // GET uses /api/{userId}/cart, mutations use /api/users/{userId}/cart
    const FETCH_BASE = `http://localhost:8080/api/${userId}/cart`;
    const MUTATE_BASE = `http://localhost:8080/api/users/${userId}/cart`;

    useEffect(() => {
        if (!visible || !userId) return;

        console.log("[CartDrawer] Fetching cart for userId:", userId);
        setLoading(true);
        setError(null);

        (async () => {
            try {
                const res = await fetch(FETCH_BASE);
                if (res.status === 404) {
                    console.log("[CartDrawer] Cart not found");
                    setCartItems([]);
                } else if (!res.ok) {
                    throw new Error(`Status ${res.status}`);
                } else {
                    const data = await res.json();
                    console.log("[CartDrawer] Cart data:", data);
                    setCartItems(Array.isArray(data) ? data : []);
                }
            } catch (err) {
                console.error("[CartDrawer] Fetch error:", err);
                setError("Could not load cart.");
            } finally {
                setLoading(false);
            }
        })();
    }, [visible, userId]);

    const handleRemove = async (clothesId) => {
        console.log("[CartDrawer] Remove all of", clothesId);
        try {
            const res = await fetch(`${MUTATE_BASE}/${clothesId}`, {method: "DELETE"});
            if (!res.ok) throw new Error(`Status ${res.status}`);
            setCartItems((prev) => prev.filter((ci) => ci.clothes.id !== clothesId));
        } catch (err) {
            console.error("[CartDrawer] Remove error:", err);
            alert("Error removing item.");
        }
    };

    const handleDecrement = async (clothesId) => {
        console.log("[CartDrawer] Decrement", clothesId);
        try {
            const res = await fetch(`${MUTATE_BASE}/${clothesId}/removeOne`, {method: "POST"});
            if (!res.ok) throw new Error(`Status ${res.status}`);
            setCartItems((prev) =>
                prev
                    .map((ci) =>
                        ci.clothes.id === clothesId ? {...ci, quantity: ci.quantity - 1} : ci
                    )
                    .filter((ci) => ci.quantity > 0)
            );
        } catch (err) {
            console.error("[CartDrawer] Decrement error:", err);
            alert("Error decrementing item.");
        }
    };

    const handleIncrement = async (clothesId) => {
        console.log("[CartDrawer] Increment", clothesId);
        try {
            const res = await fetch(`${MUTATE_BASE}/${clothesId}/add`, {method: "POST"});
            if (!res.ok) throw new Error(`Status ${res.status}`);
            setCartItems((prev) =>
                prev.map((ci) =>
                    ci.clothes.id === clothesId
                        ? {...ci, quantity: ci.quantity + 1}
                        : ci
                )
            );
        } catch (err) {
            console.error("[CartDrawer] Increment error:", err);
            alert("Error incrementing item.");
        }
    };

    const totalPrice = cartItems.reduce(
        (sum, ci) => sum + ci.clothes.price * ci.quantity,
        0
    );
    console.log("[CartDrawer] Total:", totalPrice.toFixed(2));

    return (
        <>
            <div className={`cart-overlay ${visible ? "visible" : ""}`} onClick={onClose}/>
            <div className={`cart-drawer ${visible ? "open" : ""}`}>
                <div className="cart-header">
                    <h2>Your Cart</h2>
                    <button onClick={onClose} className="close-btn">&times;</button>
                </div>

                {loading && <div className="cart-loading">Loading…</div>}
                {error && <div className="cart-error">{error}</div>}

                {!loading && !error && (
                    <div className="cart-items-container">
                        {cartItems.length === 0 ? (
                            <p className="empty-msg">Your cart is empty.</p>
                        ) : (
                            cartItems.map((ci) => (
                                <div key={ci.clothes.id} className="cart-item">
                                    {ci.clothes.imageUrl ? (
                                        <img
                                            src={ci.clothes.imageUrl}
                                            alt={ci.clothes.name}
                                            className="cart-item-img"
                                        />
                                    ) : null}
                                    <div className="cart-item-info">
                                        <div className="cart-item-name">{ci.clothes.name}</div>
                                        <div className="cart-item-qty-price">
                                            <button
                                                onClick={() => handleDecrement(ci.clothes.id)}
                                                disabled={ci.quantity <= 1}
                                                className="qty-btn"
                                            >
                                                –
                                            </button>
                                            <span className="qty-display">{ci.quantity}</span>
                                            <button
                                                onClick={() => handleIncrement(ci.clothes.id)}
                                                className="qty-btn"
                                            >
                                                +
                                            </button>
                                            <span className="item-price">
                        ${(ci.clothes.price * ci.quantity).toFixed(2)}
                      </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemove(ci.clothes.id)}
                                        className="remove-btn"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
