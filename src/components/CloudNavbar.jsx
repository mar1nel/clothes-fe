import React from 'react';
import './CloudNavbar.scss';

const CloudNavbar = () => {
    return (
        <nav className="cloud-navbar">
            <div className="logo">KIKO</div>

            <div className="nav-links">
                <a href="#home">Home</a>
                <a href="#new">New Arrivals</a>
                <a href="#girls">Girls</a>
                <a href="#boys">Boys</a>
                <a href="#sale">Sale</a>
            </div>

            <div className="nav-actions">
                <a href="#favourites">Favourites</a>
                <a href="#cart">Cart</a>
            </div>
        </nav>

    );
};

export default CloudNavbar;
