import React from 'react';
import { motion } from 'framer-motion';

const Sidebar = () => {
    const categories = ['All Categories', 'Art', 'Biography', 'Business', 'Comics', 'Education', 'Fiction', 'History'];
    const languages = ['All Languages', 'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'];

    return (
        <motion.aside
            className="sidebar"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
        >
            <div className="sidebar-section">
                <h4 className="sidebar-title">Categories</h4>
                <ul className="filter-list">
                    {categories.map((cat, i) => (
                        <li key={i} className={`filter-item ${i === 0 ? 'active' : ''}`}>
                            {cat}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="sidebar-section">
                <h4 className="sidebar-title">Languages</h4>
                <ul className="filter-list">
                    {languages.map((lang, i) => (
                        <li key={i} className={`filter-item ${i === 0 ? 'active' : ''}`}>
                            {lang}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="sidebar-section">
                <div style={{ padding: '1rem', background: '#eff6ff', borderRadius: '12px', color: '#1d4ed8', fontSize: '0.85rem' }}>
                    <strong>Tip:</strong> You can now add 3D book covers to your library!
                </div>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
