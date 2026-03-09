import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ReadOverlay = ({ isOpen, book, onClose }) => {
    return (
        <AnimatePresence mode="wait">
            {isOpen && book && (
                <motion.div
                    key={book.id}
                    className="read-overlay"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                >
                    <div className="read-content">
                        <button className="btn" onClick={onClose} style={{ marginBottom: '2rem', background: 'var(--card-bg)' }}>
                            &larr; Back to Library
                        </button>
                        <div className="read-header">
                            <h1>{book.title}</h1>
                            <p className="author" style={{ color: 'var(--accent-color)', fontWeight: 500, marginBottom: '1.5rem' }}>By {book.author}</p>
                        </div>

                        {book.isExternal ? (
                            <div className="external-read-view" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div className="reader-container" style={{
                                    flex: 1,
                                    background: 'var(--card-bg)',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    border: '1px solid var(--border-color)',
                                    boxShadow: 'var(--shadow-lg)',
                                    minHeight: '70vh',
                                    position: 'relative'
                                }}>
                                    <iframe
                                        src={`https://openlibrary.org/embed/works/${book.id.replace('ol-', '')}?config=host_only`}
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        allowFullScreen
                                        style={{ position: 'absolute', top: 0, left: 0 }}
                                        title={book.title}
                                    ></iframe>
                                </div>
                                <div className="external-notice" style={{ padding: '2rem', background: 'rgba(37, 99, 235, 0.05)', borderRadius: '16px', border: '1px solid rgba(37, 99, 235, 0.1)' }}>
                                    <h3 style={{ marginBottom: '1rem' }}>Library Direct Access</h3>
                                    <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                                        {book.description} This book is provided via the Open Library community collection.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="read-body">{book.content}</div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ReadOverlay;
