import React from 'react';
import { motion } from 'framer-motion';

const Sidebar = ({ activeCategory, setCategory, activeLanguage, setLanguage }) => {
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
                    {categories.map((cat) => (
                        <li
                            key={cat}
                            className={`filter-item ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setCategory(cat)}
                        >
                            {cat}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="sidebar-section">
                <h4 className="sidebar-title">Languages</h4>
                <ul className="filter-list">
                    {languages.map((lang) => (
                        <li
                            key={lang}
                            className={`filter-item ${activeLanguage === lang ? 'active' : ''}`}
                            onClick={() => setLanguage(lang)}
                        >
                            {lang}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="sidebar-section">
                <div className="premium-tip">
                    <strong>Tip:</strong> Each category now has 30-50 page stories for you to explore!
                </div>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
