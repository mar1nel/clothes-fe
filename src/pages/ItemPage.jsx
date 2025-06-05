// src/pages/ItemPage.jsx
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "./ItemPage.scss";
import CloudNavbar from "../components/CloudNavbar";
import sampleImages from "../data/sampleImages";

export default function ItemPage() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Local UI state for size, colour, and quantity
    const [selectedSize, setSelectedSize] = useState("S");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);

    // Hardcode a few choices
    const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const availableColours = [
        {name: "Green grass", value: "#84C225"},
        {name: "Blue wave", value: "#4C8EF3"},
        {name: "Grey kitten", value: "#A0A0A0"},
        {name: "Beige cream", value: "#F3E2C7"},
    ];

    // Example rating & review count
    const rating = 4.7;
    const reviewCount = 85;

    // Fetch single item by id
    useEffect(() => {
        fetch(`http://localhost:8080/api/clothes/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Item not found");
                return res.json();
            })
            .then((data) => {
                setItem(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Could not load item.");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="item-loading">Loading...</div>;
    if (error) return <div className="item-error">{error}</div>;
    if (!item) return null; // safety

    // Determine fallback image
    const numericId = Number(id);
    const fallbackIdx = (numericId - 1) % sampleImages.length;
    const imageSrc = item.imageUrl || sampleImages[fallbackIdx];

    const renderStars = (ratingValue) => {
        const fullStars = Math.floor(ratingValue);
        const halfStar = ratingValue - fullStars >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        const starsArr = [];

        for (let i = 0; i < fullStars; i++) {
            starsArr.push(<span key={"full" + i} className="star full">★</span>);
        }
        if (halfStar) {
            starsArr.push(<span key="half" className="star half">☆</span>);
        }
        for (let i = 0; i < emptyStars; i++) {
            starsArr.push(<span key={"empty" + i} className="star empty">☆</span>);
        }

        return starsArr;
    };

    // When “Add to bag” is clicked:
    const handleAddToCart = async () => {
        const storedUserId = localStorage.getItem("userId");
        if (!storedUserId) {
            alert("Please log in before adding items to the cart.");
            return;
        }
        const userId = Number(storedUserId);

        try {
            // Make `quantity` POST calls to add one item each time
            for (let i = 0; i < quantity; i++) {
                const res = await fetch(
                    `http://localhost:8080/api/users/${userId}/cart/${item.id}/add`,
                    {method: "POST"}
                );
                if (!res.ok) {
                    throw new Error(`Failed to add to cart (status ${res.status})`);
                }
            }
            alert(
                `Successfully added ${quantity}× "${item.name}" (Size: ${selectedSize}, Colour: ${
                    selectedColor || "Default"
                }) to cart.`
            );
        } catch (err) {
            console.error("Add to cart error:", err);
            alert("Error adding to cart. Please try again.");
        }
    };

    return (
        <>
            <CloudNavbar/>

            <div className="item-container">
                <button
                    className="item-back-button"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>

                <div className="item-content">
                    {/* ===== Left: Large Image ===== */}
                    <div className="item-image-wrapper">
                        <img
                            src={imageSrc}
                            alt={item.name}
                            className="item-image"
                        />
                    </div>

                    {/* ===== Right: Info & Controls ===== */}
                    <div className="item-info">
                        {/* Badge (e.g. “New!”) */}
                        {item.isNew && <div className="item-badge">New!</div>}

                        {/* Title */}
                        <h1 className="item-name">{item.name}</h1>

                        {/* Rating + review count */}
                        <div className="item-rating">
                            <div className="stars">{renderStars(rating)}</div>
                            <span className="review-count">{reviewCount} reviews</span>
                        </div>

                        {/* Price */}
                        <p className="item-price">
                            <strong>
                                {item.currency || "$"}
                                {item.price.toFixed(2)}
                            </strong>
                        </p>

                        {/* Pick your size */}
                        <div className="item-section">
                            <div className="section-label">Pick your size:</div>
                            <div className="size-options">
                                {availableSizes.map((sz) => (
                                    <button
                                        key={sz}
                                        className={
                                            selectedSize === sz
                                                ? "size-button selected"
                                                : "size-button"
                                        }
                                        onClick={() => setSelectedSize(sz)}
                                    >
                                        {sz}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Choose a colour */}
                        <div className="item-section">
                            <div className="section-label">Choose a colour:</div>
                            <div className="colour-options">
                                {availableColours.map((col) => (
                                    <button
                                        key={col.name}
                                        className={
                                            selectedColor === col.value
                                                ? "colour-button selected"
                                                : "colour-button"
                                        }
                                        onClick={() => setSelectedColor(col.value)}
                                        style={{backgroundColor: col.value}}
                                        title={col.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Quantity + Add to bag */}
                        <div className="item-section quantity-section">
                            <div className="quantity-label">Quantity:</div>
                            <div className="quantity-controls">
                                <button
                                    className="qty-btn"
                                    onClick={() =>
                                        setQuantity((q) => (q > 1 ? q - 1 : 1))
                                    }
                                >
                                    −
                                </button>
                                <span className="qty-display">{quantity}</span>
                                <button
                                    className="qty-btn"
                                    onClick={() => setQuantity((q) => q + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                className="add-to-bag-btn"
                                onClick={handleAddToCart}
                            >
                                Add to bag
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
