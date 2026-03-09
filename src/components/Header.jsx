import { Link, NavLink, useNavigate } from 'react-router-dom';

const Header = ({ onAddClick, searchQuery, setSearchQuery, theme, onToggleTheme, isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/');
    };
    return (
        <header className="main-header">
            <div className="header-left">
                <Link to="/" className="logo">
                    Book<span>sky</span>
                </Link>
                <nav className="top-nav">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/library">Library</NavLink>
                    <NavLink to="/faq">FAQ</NavLink>
                    <NavLink to="/pricing">Pricing</NavLink>
                </nav>
            </div>

            <div className="header-right">
                {isLoggedIn && (
                    <>
                        <div className="search-container">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder="Search for books..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={onAddClick}>
                            <span>+</span> Add Book
                        </button>
                    </>
                )}
                <button
                    className="btn btn-outline"
                    onClick={onToggleTheme}
                    title={theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
                    style={{ padding: '0.6rem' }}
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>

                {!isLoggedIn ? (
                    <div className="auth-links" style={{ display: 'flex', gap: '1rem', marginRight: '1rem' }}>
                        <Link to="/auth" style={{ textDecoration: 'none', color: 'var(--text-dim)', fontSize: '0.9rem', fontWeight: '500' }}>Log In</Link>
                        <Link to="/auth" style={{ textDecoration: 'none', color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: '600' }}>Sign Up</Link>
                    </div>
                ) : (
                    <div className="user-profile">
                        <div className="profile-Avatar">PD</div>
                        <button className="logout-btn" onClick={handleLogout} title="Logout">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
