import React from 'react';
import { motion } from 'framer-motion';

const BookCard = ({ book, onRead, onEdit, onDelete, onToggleFavorite }) => {
    // Generate a consistent gradient based on the book id (handling alphanumeric IDs)
    const getGradient = (id) => {
        const colors = [
            ['#3b82f6', '#2563eb'], // Blue
            ['#10b981', '#059669'], // Green
            ['#f59e0b', '#d97706'], // Amber
            ['#ef4444', '#dc2626'], // Red
            ['#8b5cf6', '#7c3aed'], // Violet
            ['#ec4899', '#db2777'], // Pink
        ];

        // Sum char codes for alphanumeric IDs to get a stable index
        const hash = String(id).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const index = hash % colors.length;
        return `linear-gradient(135deg, ${colors[index][0]} 0%, ${colors[index][1]} 100%)`;
    };

    return (
        <div className="book-card-container">
            <motion.div
                className="book-card-3d"
                onClick={() => onRead(book)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="book-spine"></div>
                <div className="book-cover" style={{ background: getGradient(book.id) }}>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', lineHeight: '1.2' }}>{book.title}</h3>
                        <p style={{ fontSize: '0.8rem', opacity: 0.9 }}>{book.author}</p>
                    </div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.8, marginTop: 'auto' }}>
                        {book.description.substring(0, 60)}...
                    </div>
                </div>
                <div className="book-pages"></div>

                <div className="book-card-actions" onClick={(e) => e.stopPropagation()}>
                    {!book.isExternal && (
                        <>
                            <button className="action-dot" onClick={() => onToggleFavorite(book.id)} title="Favorite">
                                {book.isFavorite ? '❤️' : '🤍'}
                            </button>
                            <button className="action-dot" onClick={() => onEdit(book)} title="Edit">
                                ✏️
                            </button>
                            <button className="action-dot" onClick={() => onDelete(book.id)} style={{ color: '#ef4444' }} title="Delete">
                                🗑️
                            </button>
                        </>
                    )}
                    {book.isExternal && (
                        <button className="action-dot" onClick={() => onRead(book)} title="Read Details">
                            📖
                        </button>
                    )}
                </div>
            </motion.div>

            <div className="book-info">
                <h3>{book.title}</h3>
                <p className="author">By {book.author}</p>
            </div>
        </div>
    );
};

export default BookCard;
