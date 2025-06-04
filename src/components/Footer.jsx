import React from 'react';
import './Footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            {/* ─── Scalloped top edge (using a CSS mask) ───────────────────────────────── */}
            <div className="footer-scallops"/>

            {/* ─── Main content columns ───────────────────────────────────────────────────────── */}
            <div className="footer-content">
                {/* Column 1 */}
                <div className="footer-col">
                    <p className="footer-heading">Follow us on Instagram</p>
                    <a href="https://www.instagram.com/kikobrand" className="footer-link" target="_blank"
                       rel="noopener noreferrer">
                        @kikobrand
                    </a>
                </div>

                {/* Column 2 */}
                <div className="footer-col">
                    <p className="footer-heading">Have a question?</p>
                    <a href="mailto:hello@kiko.co.pl" className="footer-link">
                        hello@kiko.co.pl
                    </a>
                </div>

                {/* Column 3 */}
                <div className="footer-col">
                    <p className="footer-heading">Helpful links</p>
                    <a href="/blog" className="footer-link">Our Blog</a>
                    <a href="/about" className="footer-link">About Us</a>
                </div>

                {/* Column 4 */}
                <div className="footer-col">
                    <p className="footer-heading">Shop</p>
                    <a href="/new-arrivals" className="footer-link">New Arrivals</a>
                    <a href="/girls" className="footer-link">Girls</a>
                    <a href="/boys" className="footer-link">Boys</a>
                    <a href="/sale" className="footer-link">Sale</a>
                </div>

                {/* Column 5 */}
                <div className="footer-col">
                    <p className="footer-heading">Terms</p>
                    <a href="/tcs" className="footer-link">T&Cs</a>
                    <a href="/privacy" className="footer-link">Privacy Policy</a>
                </div>
            </div>

            {/* ─── Centered Logo + Copyright ─────────────────────────────────────────────────── */}
            <div className="footer-logo-container">
                <div className="footer-logo">kiko</div>
                <div className="footer-copy">© 2025 Timisoara Kiko</div>
            </div>

            {/* ─── Decorative “blob” shapes at the bottom ───────────────────────────────────────── */}
            <div className="blob blob-white"/>
            <div className="blob blob-pink"/>
            <div className="blob blob-orange"/>
        </footer>
    );
};

export default Footer;
