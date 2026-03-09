import React from 'react';
import { motion } from 'framer-motion';

const Drafts = () => {
    return (
        <motion.div
            className="page-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <header id="hero">
                <h1>Work in Progress 📝</h1>
                <p style={{ color: 'var(--text-dim)' }}>Your unfinished masterpieces awaiting your touch.</p>
            </header>

            <div className="empty-state" style={{ padding: '8rem 0' }}>
                <h3 style={{ color: 'var(--text-dim)', fontSize: '1.2rem' }}>No active drafts. Time for a new story?</h3>
            </div>
        </motion.div>
    );
};

export default Drafts;
