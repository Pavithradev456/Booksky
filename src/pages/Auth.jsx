import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import libraryBg from '../assets/auth/library_bg.png';
import libraryActive1 from '../assets/auth/library_active_bg.png';
import libraryActive2 from '../assets/auth/library_active_2.png';

const Auth = ({ setIsLoggedIn }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showGoogleSelector, setShowGoogleSelector] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });
    const navigate = useNavigate();

    // Mock accounts for Google selector
    const mockAccounts = [
        { name: 'Pavithra', email: 'pavithradevendiran23@gmail.com' },
        { name: 'Guest User', email: 'guest@booksky.com' }
    ];

    // Verified realistic library images
    const activeImages = [
        libraryActive1,
        libraryActive2,
        libraryBg
    ];

    // Image cycling logic
    useEffect(() => {
        let interval;
        if (isTyping) {
            interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % activeImages.length);
            }, 3000);
        } else {
            setCurrentImageIndex(0);
        }
        return () => clearInterval(interval);
    }, [isTyping, activeImages.length]);

    const handleGoogleLogin = () => {
        setShowGoogleSelector(true);
    };

    const handleAccountSelect = (account) => {
        setSelectedAccount(account);
    };

    const handleContinueGoogle = () => {
        if (selectedAccount) {
            setShowGoogleSelector(false);
            setIsLoggedIn(true);
            navigate('/');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation check
        if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
            alert('Please fill in all required fields.');
            return;
        }
        // Mock login
        setIsLoggedIn(true);
        navigate('/');
    };

    const handleInputFocus = () => setIsTyping(true);

    const handleInputBlur = (e) => {
        setTimeout(() => {
            const activeElement = document.activeElement;
            const isInputFocused = activeElement.tagName === 'INPUT';
            const form = e.currentTarget.closest('form');
            const inputs = form?.querySelectorAll('input');
            const hasValue = Array.from(inputs || []).some(input => input.value.length > 0);

            if (!isInputFocused && !hasValue) {
                setIsTyping(false);
            }
        }, 50);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (value.length > 0) {
            setIsTyping(true);
        }
    };

    return (
        <div className="auth-modern-container">
            {/* Google Account Selector Overlay */}
            <AnimatePresence>
                {showGoogleSelector && (
                    <motion.div
                        className="google-selector-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="google-selector-card"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            <div className="google-header">
                                <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" />
                                <h2>Choose an account</h2>
                                <p>to continue to <strong>Booksky</strong></p>
                            </div>

                            <div className="account-list">
                                {mockAccounts.map((account, index) => (
                                    <div
                                        key={index}
                                        className={`account-item ${selectedAccount?.email === account.email ? 'selected' : ''}`}
                                        onClick={() => handleAccountSelect(account)}
                                    >
                                        <div className="account-avatar">{account.name[0]}</div>
                                        <div className="account-details">
                                            <strong>{account.name}</strong>
                                            <span>{account.email}</span>
                                        </div>
                                        {selectedAccount?.email === account.email && (
                                            <div className="check-mark">✓</div>
                                        )}
                                    </div>
                                ))}
                                <div className="use-another-account">
                                    <span className="plus-icon">+</span> Use another account
                                </div>
                            </div>

                            <div className="selector-footer">
                                <button className="cancel-btn" onClick={() => setShowGoogleSelector(false)}>Cancel</button>
                                <button
                                    className={`continue-btn ${!selectedAccount ? 'disabled' : ''}`}
                                    onClick={handleContinueGoogle}
                                    disabled={!selectedAccount}
                                >
                                    Continue
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Left Side: Dynamic Image Slideshow (Now with seamless cross-fade) */}
            <div className="auth-image-side">
                {/* Persistent Back Layer to prevent white flash */}
                <div
                    className="auth-image-bg-underlay"
                    style={{ backgroundImage: `url(${libraryBg})` }}
                ></div>

                <AnimatePresence>
                    <motion.div
                        key={isTyping ? `active-${currentImageIndex}` : 'static'}
                        className="auth-image-bg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        style={{
                            backgroundImage: `url(${isTyping ? activeImages[currentImageIndex] : libraryBg})`
                        }}
                    />
                </AnimatePresence>

                <div className="auth-image-overlay"></div>

                <motion.div
                    className="auth-glass-card"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <div className="glass-card-content">
                        <cite>“We have been using untitled to kick start every new project and can’t imagine working without it.”</cite>
                        <div className="glass-card-footer">
                            <div className="author-info">
                                <strong>Andi lane</strong>
                                <span>Founder, Catalog</span>
                                <span className="sub-role">web Design Agency</span>
                            </div>
                            <div className="glass-card-actions">
                                <div className="perf-stars">★★★★★</div>
                                <div className="glass-nav-btns">
                                    <button className="nav-btn">←</button>
                                    <button className="nav-btn">→</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Right Side: Form */}
            <div className="auth-form-side">
                <div className="auth-form-container">
                    <Link to="/" className="auth-logo">
                        Book<span>sky</span>
                    </Link>

                    <div className="auth-form-header">
                        <h1>{isLogin ? 'Welcome back' : 'Create account'}</h1>
                        <p>{isLogin ? 'Welcome back! Please enter your details.' : 'Join our community of readers and authors.'}</p>
                    </div>

                    <form className="auth-modern-form" onSubmit={handleSubmit} onBlur={handleInputBlur}>
                        {!isLogin && (
                            <div className="auth-input-field">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onFocus={handleInputFocus}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth-input-field">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onFocus={handleInputFocus}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="auth-input-field">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onFocus={handleInputFocus}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        {isLogin && (
                            <div className="auth-form-options">
                                <label className="auth-checkbox">
                                    <input type="checkbox" />
                                    <span>Remember for 30 days</span>
                                </label>
                                <button type="button" className="auth-forgot-pass">Forgot password?</button>
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary auth-btn-full">
                            {isLogin ? 'Sign in' : 'Get started'}
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline auth-btn-full auth-google-btn"
                            onClick={handleGoogleLogin}
                        >
                            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" />
                            Sign in with Google
                        </button>
                    </form>

                    <p className="auth-toggle-text">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                        <button onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Sign up' : 'Log in'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
