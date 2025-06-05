// src/components/CartDrawer.jsx
import React, {useEffect, useState} from "react";
import "./CartDrawer.scss";

export default function CartDrawer({visible, onClose}) {
    // (1) Hard-coded for now; replace with actual logged-in user ID later
    const userId = 2;

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // (2) Fetch the cart whenever the drawer opens (visible === true)
    useEffect(() => {
        if (!visible) return;

        const fetchCart = async () => {
            setLoading(true);
            setError(null);

            try {
                // This must match your Spring mapping: @GetMapping("/{userId}/cart")
                const res = await fetch(`http://localhost:8080/api/${userId}/cart`);
                if (res.status === 404) {
                    // no cart → “empty”
                    setCartItems([]);
                } else if (!res.ok) {
                    throw new Error(`Server responded ${res.status}`);
                } else {
                    const data = await res.json();
                    setCartItems(Array.isArray(data) ? data : []);
                }
            } catch (err) {
                console.error("Failed to fetch cart:", err);
                setError("Could not load cart.");
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [visible, userId]);

    // (3a) Remove *all* quantities of a given item
    const handleRemove = async (clothesId) => {
        try {
            // Must match @DeleteMapping("/users/{userId}/cart/{clothesId}")
            const res = await fetch(
                `http://localhost:8080/api/users/${userId}/cart/${clothesId}`,
                {method: "DELETE"}
            );
            if (!res.ok) throw new Error(`Failed to remove item: ${res.status}`);
            // Remove that item from local state immediately:
            setCartItems((prev) => prev.filter((ci) => ci.clothes.id !== clothesId));
        } catch (err) {
            console.error(err);
            alert("Error removing item from cart.");
        }
    };

    // (3b) Remove exactly one quantity of a given item
    const handleDecrement = async (clothesId) => {
        try {
            // Must match @PostMapping("/users/{userId}/cart/{clothesId}/removeOne")
            const res = await fetch(
                `http://localhost:8080/api/users/${userId}/cart/${clothesId}/removeOne`,
                {method: "POST"}
            );
            if (!res.ok) throw new Error(`Failed to decrement: ${res.status}`);
            // Decrement that item locally, or remove if it hits zero
            setCartItems((prev) =>
                prev
                    .map((ci) => {
                        if (ci.clothes.id === clothesId) {
                            return {...ci, quantity: ci.quantity - 1};
                        }
                        return ci;
                    })
                    .filter((ci) => ci.quantity > 0)
            );
        } catch (err) {
            console.error(err);
            alert("Error decrementing item.");
        }
    };

    // (3c) Add one quantity of a given item
    const handleIncrement = async (clothesId) => {
        try {
            // Must match @PostMapping("/users/{userId}/cart/{clothesId}/add")
            const res = await fetch(
                `http://localhost:8080/api/users/${userId}/cart/${clothesId}/add`,
                {method: "POST"}
            );
            if (!res.ok) throw new Error(`Failed to increment: ${res.status}`);
            // Increment that item locally
            setCartItems((prev) =>
                prev.map((ci) => {
                    if (ci.clothes.id === clothesId) {
                        return {...ci, quantity: ci.quantity + 1};
                    }
                    return ci;
                })
            );
        } catch (err) {
            console.error(err);
            alert("Error incrementing item.");
        }
    };

    // (4) Compute total price from local state; updates immediately on qty changes
    const totalPrice = cartItems.reduce(
        (sum, ci) => sum + ci.clothes.price * ci.quantity,
        0
    );

    return (
        <>
            {/* Overlay behind drawer */}
            <div
                className={`cart-overlay ${visible ? "visible" : ""}`}
                onClick={onClose}
            />

            {/* Drawer panel */}
            <div className={`cart-drawer ${visible ? "open" : ""}`}>
                <div className="cart-header">
                    <h2>Your Cart</h2>
                    <button className="close-btn" onClick={onClose}>
                        &times;
                    </button>
                </div>

                {/* Loading / Error / Empty / Items */}
                {loading && <div className="cart-loading">Loading…</div>}
                {error && <div className="cart-error">{error}</div>}

                {!loading && !error && (
                    <div className="cart-items-container">
                        {cartItems.length === 0 ? (
                            <p className="empty-msg">Your cart is empty.</p>
                        ) : (
                            cartItems.map((ci) => (
                                <div key={ci.clothes.id} className="cart-item">
                                    <img
                                        src={ci.clothes.imageUrl || ""}
                                        alt={ci.clothes.name}
                                        className="cart-item-img"
                                    />
                                    <div className="cart-item-info">
                                        <div className="cart-item-name">{ci.clothes.name}</div>
                                        <div className="cart-item-qty-price">
                                            <button
                                                className="qty-btn"
                                                onClick={() => handleDecrement(ci.clothes.id)}
                                                disabled={ci.quantity <= 1}
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
                        ${(ci.clothes.price * ci.quantity).toFixed(2)}
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

                {/*/!* Footer showing total & checkout, only if items exist *!/*/}
                {/*{!loading && !error && cartItems.length > 0 && (*/}
                {/*    <div className="cart-footer">*/}
                {/*        <div className="total">*/}
                {/*            <span>Total:</span>*/}
                {/*            <span className="total-price">${totalPrice.toFixed(2)}</span>*/}
                {/*        </div>*/}
                {/*        <button className="checkout-btn">Proceed to Checkout</button>*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        </>
    );
}
