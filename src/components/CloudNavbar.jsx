import React from 'react';
import './CloudNavbar.scss';

const CloudNavbar = () => {
    return (
        <nav className="cloud-navbar">
            <div className="logo">KIKO</div>

            <div className="nav-links">
                <a href="#home">Home</a>
                <a style={{color: "#fffb00"}} href="#new">New Arrivals </a>
                <a href="#girls">Girls</a>
                <a href="#boys">Boys</a>
                <a style={{color: "#fffb00"}} href="#sale">Sale%%</a>
            </div>

            <div className="nav-actions">
                <a href="#cart">Cart</a>
                <a href="#Auth">Playground</a>
            </div>
        </nav>

    );
};

export default CloudNavbar;
