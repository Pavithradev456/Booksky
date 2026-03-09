import React from 'react';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-grid">
                <div className="footer-brand">
                    <h2 style={{ color: 'white' }}>Book<span style={{ color: '#0ea5e9' }}>sky</span></h2>
                    <p style={{ opacity: 0.8, fontSize: '0.9rem', maxWidth: '300px', color: 'white' }}>
                        The world's easiest platform to create and share beautiful digital books.
                        Join our community of creators today.
                    </p>
                </div>

                <div className="footer-column">
                    <h4>BROWSE</h4>
                    <ul>
                        <li>Our Library</li>
                        <li>Featured Books</li>
                        <li>Categories</li>
                        <li>New Arrivals</li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>COMPANY</h4>
                    <ul>
                        <li>About Us</li>
                        <li>Our Mission</li>
                        <li>Contact</li>
                        <li>Blog</li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>RESOURCES</h4>
                    <ul>
                        <li>Help Center</li>
                        <li>FAQ</li>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>GET SOCIAL</h4>
                    <ul>
                        <li>Facebook</li>
                        <li>Twitter</li>
                        <li>Pinterest</li>
                        <li>YouTube</li>
                    </ul>
                </div>
            </div>

            <div style={{ maxWidth: '1200px', margin: '4rem auto 0', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', opacity: 0.6, fontSize: '0.8rem', textAlign: 'center', color: 'white' }}>
                © 2026 Booksky Inc. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
