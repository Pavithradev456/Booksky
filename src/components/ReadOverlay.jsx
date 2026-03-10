import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookFlipReader from './BookFlipReader';

const ReadOverlay = ({ isOpen, book, onClose }) => {
    return (
        <AnimatePresence mode="wait">
            {isOpen && book && (
                <motion.div
                    key={book.id}
                    className="read-overlay"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                >
                    <div className="read-content-premium">
                        <div className="reader-top-bar">
                            <button className="close-btn-premium" onClick={onClose}>
                                ✕ Exit Reader
                            </button>
                            <div className="reader-title-info">
                                <h3 style={{ margin: 0, color: 'white' }}>{book.title}</h3>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>by {book.author}</p>
                            </div>
                        </div>

                        <BookFlipReader book={book} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ReadOverlay;
