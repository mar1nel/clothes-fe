import React from 'react';
import './ProductCard.scss';

/**
 * Props:
 * - badgeText: string (e.g. "SALE", "GIRL", "BOY")
 * - imageSrc:  string URL for the product image (or placeholder)
 * - buttonText: string (e.g. "Shop Sale")
 * - onClick:    function for button clicks (optional)
 */
const ProductCard = ({badgeText, imageSrc}) => {
    return (
        <div className="product-card">
            {/* Badge overlaps the top of the card */}
            <div className="product-badge">{badgeText}</div>

            {/* Image area (centered) */}
            <div className="product-image-container">
                <img
                    src={imageSrc}
                    // alt={buttonText}
                    className="product-image"
                />
            </div>

            {/*/!* Button at bottom *!/*/}
            {/*<button className="product-button" onClick={onClick}>*/}
            {/*    {buttonText}*/}
            {/*</button>*/}
        </div>
    );
};

export default ProductCard;
