import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookCard from '../components/BookCard';

const Favorites = ({ books, onRead, onEdit, onDelete, onToggleFavorite }) => {
    return (
        <motion.div
            className="page-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <header id="hero">
                <h1>Your Favorites ⭐</h1>
                <p style={{ color: 'var(--text-dim)' }}>The books that touched your soul.</p>
            </header>

            <div className="book-grid" style={{ marginTop: '3rem' }}>
                <AnimatePresence mode="popLayout">
                    {books.length === 0 ? (
                        <motion.div
                            key="empty-fav"
                            className="empty-state"
                            style={{ padding: '8rem 0', gridColumn: '1/-1' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <h3 style={{ color: 'var(--text-dim)', fontSize: '1.2rem' }}>You haven't added any books to your favorites yet.</h3>
                        </motion.div>
                    ) : (
                        books.map(book => (
                            <BookCard
                                key={book.id}
                                book={book}
                                onRead={onRead}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onToggleFavorite={onToggleFavorite}
                            />
                        ))
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Favorites;
