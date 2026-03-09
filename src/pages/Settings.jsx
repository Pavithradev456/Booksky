import React from 'react';
import { motion } from 'framer-motion';

const Settings = () => {
    return (
        <motion.div
            className="page-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <header id="hero">
                <h1>Settings ⚙️</h1>
                <p style={{ color: 'var(--text-dim)' }}>Personalize your Booksky experience.</p>
            </header>

            <div className="settings-container" style={{ maxWidth: '600px', marginTop: '2rem' }}>
                <div className="form-group">
                    <label>Display Name</label>
                    <input type="text" value="Jane Doe" readOnly style={{ opacity: 0.6 }} />
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" value="jane.doe@booksky.com" readOnly style={{ opacity: 0.6 }} />
                </div>
                <div className="form-group">
                    <label>Interface Theme</label>
                    <div style={{ padding: '1rem', background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                        Premium Dark (Selected)
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Settings;
