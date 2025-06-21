import React, {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {useNavigate, useParams} from "react-router-dom";
import "./ItemPage.scss";
import CloudNavbar from "../components/CloudNavbar";
import sampleImages from "../data/sampleImages";

export default function ItemPage() {
    const {id} = useParams();
    const navigate = useNavigate();

    // Data fetching state
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // UI state
    const [selectedSize, setSelectedSize] = useState("S");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);

    // Animation hooks (must always be called)
    const addBtnRef = useRef(null);
    const [flyAnim, setFlyAnim] = useState(false);
    const [coords, setCoords] = useState({x0: 0, y0: 0, x1: 0, y1: 0});

    const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const availableColours = [
        {name: "Green grass", value: "#84C225"},
        {name: "Blue wave", value: "#4C8EF3"},
        {name: "Grey kitten", value: "#A0A0A0"},
        {name: "Beige cream", value: "#F3E2C7"},
    ];

    const rating = 4.7;
    const reviewCount = 85;

    useEffect(() => {
        fetch(`http://localhost:8080/api/clothes/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Item not found");
                return res.json();
            })
            .then(data => {
                setItem(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Could not load item.");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="item-loading">Loading...</div>;
    if (error) return <div className="item-error">{error}</div>;
    if (!item) return null;

    const numericId = Number(id);
    //const imageSrc = item.imageUrl || sampleImages[(numericId - 1) % sampleImages.length];
    const imageSrc = item.imageUrl;
    const renderStars = value => {
        const full = Math.floor(value);
        const half = value - full >= 0.5;
        const empty = 5 - full - (half ? 1 : 0);
        const stars = [];
        for (let i = 0; i < full; i++) stars.push(<span key={`f${i}`} className="star full">★</span>);
        if (half) stars.push(<span key="half" className="star half">☆</span>);
        for (let i = 0; i < empty; i++) stars.push(<span key={`e${i}`} className="star empty">☆</span>);
        return stars;
    };

    const handleAddToCart = async () => {
        const stored = localStorage.getItem("userId");
        if (!stored) return alert("Please log in first.");
        const userId = Number(stored);

        try {
            for (let i = 0; i < quantity; i++) {
                const res = await fetch(
                    `http://localhost:8080/api/users/${userId}/cart/${item.id}/add`,
                    {method: "POST"}
                );
                if (!res.ok) {
                    throw new Error(`Failed to add item #${i + 1} (status ${res.status})`);
                }
            }
        } catch (err) {
            console.error("Add to cart error:", err);
            alert("Error adding items to cart.");
            return;
        }

        // Trigger fly animation…
        const btn = addBtnRef.current;
        const cartIcon = document.getElementById("cart-icon");
        if (btn && cartIcon) {
            const b = btn.getBoundingClientRect();
            const c = cartIcon.getBoundingClientRect();
            setCoords({
                x0: b.left + b.width / 2,
                y0: b.top + b.height / 2,
                x1: c.left + c.width / 2,
                y1: c.top + c.height / 2,
            });
            setFlyAnim(true);
            setTimeout(() => setFlyAnim(false), 700);
        }
    };

    return (
        <>
            <CloudNavbar/>

            <button
                className="item-back-button"
                onClick={() => {
                    if (window.history.length > 1) {
                        navigate(-1);
                    } else {
                        navigate('/shop');
                    }
                }}
            >
                ← Back
            </button>

            <div className="item-container">

                <div className="item-content">
                    <div className="item-image-wrapper">
                        <img src={imageSrc} alt={item.name} className="item-image"/>
                    </div>
                    <div className="item-info">
                        {item.isNew && <div className="item-badge">New!</div>}
                        <h1 className="item-name">{item.name}</h1>
                        <div className="item-rating">
                            <div className="stars">{renderStars(rating)}</div>
                            <span className="review-count">{reviewCount} reviews</span>
                        </div>
                        <p className="item-price">
                            <strong>{item.currency || 'RON'}{item.price.toFixed(2)}</strong>
                        </p>
                        <div className="item-section">
                            <div className="section-label">Pick your size:</div>
                            <div className="size-options">
                                {availableSizes.map(sz => (
                                    <button
                                        key={sz}
                                        className={sz === selectedSize ? 'size-button selected' : 'size-button'}
                                        onClick={() => setSelectedSize(sz)}
                                    >{sz}</button>
                                ))}
                            </div>
                        </div>
                        <div className="item-section">
                            <div className="section-label">Choose a colour:</div>
                            <div className="colour-options">
                                {availableColours.map(col => (
                                    <button
                                        key={col.name}
                                        className={col.value === selectedColor ? 'colour-button selected' : 'colour-button'}
                                        onClick={() => setSelectedColor(col.value)}
                                        style={{backgroundColor: col.value}}
                                        title={col.name}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="item-section quantity-section">
                            <div className="quantity-label">Quantity:</div>
                            <div className="quantity-controls">
                                <button className="qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−
                                </button>
                                <span className="qty-display">{quantity}</span>
                                <button className="qty-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
                            </div>
                            <button
                                ref={addBtnRef}
                                className="add-to-bag-btn"
                                onClick={handleAddToCart}
                            >Add to bag
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {flyAnim && (
                    <motion.div
                        key="fly-circle"
                        initial={{x: coords.x0, y: coords.y0, scale: 1.2}}
                        animate={{x: coords.x1, y: coords.y1, scale: 0.3}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.7, ease: 'easeInOut'}}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: 30,
                            height: 30,
                            borderRadius: '50%',
                            background: '#ff3232',
                            pointerEvents: 'none',
                            zIndex: 99,
                        }}
                    />
                )}
            </AnimatePresence>
        </>
    );
}