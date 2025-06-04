import React from 'react';
import './Card.scss';

const Card = ({imageUrl, name, price, badgeText}) => {
    return (
        <div className="card">
            <div className="card-image-wrapper">
                <img src={imageUrl} alt={name} className="card-image"/>
                {badgeText && <div className="card-badge">{badgeText}</div>}
            </div>

            <div className="card-details">
                <span className="card-name">{name}</span>
                <span className="card-price">${price}</span>
            </div>
        </div>
    );
};

export default Card;
