import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookCard from '../components/BookCard';

const Library = ({ books, onRead, onEdit, onDelete, onToggleFavorite }) => {
    const [featuredBooks, setFeaturedBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedBooks = async () => {
            try {
                const response = await fetch('https://openlibrary.org/subjects/fiction.json?limit=6');
                const data = await response.json();

                const mappedBooks = data.works.map(work => ({
                    id: `ol-${work.key.split('/').pop()}`,
                    title: work.title,
                    author: work.authors?.[0]?.name || 'Unknown Author',
                    description: work.first_publish_year ? `First published in ${work.first_publish_year}.` : 'A classic piece of fiction from the Open Library collection.',
                    externalUrl: `https://openlibrary.org${work.key}`,
                    isFavorite: false,
                    isExternal: true // Flag to identify API books
                }));

                setFeaturedBooks(mappedBooks);
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFeaturedBooks();
    }, []);

    return (
        <div className="page-view">
            <header className="featured-header">
                <div>
                    <h2>Your Collection</h2>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                        Books you've created and added to your personal library.
                    </p>
                </div>
                <div className="featured-actions">
                    <button className="btn btn-outline" style={{ marginRight: '0.5rem' }}>View Grid</button>
                    <button className="btn btn-outline">Sort By</button>
                </div>
            </header>

            <div className="book-grid">
                <AnimatePresence mode="popLayout">
                    {books.length === 0 ? (
                        <motion.div
                            key="empty"
                            className="empty-state"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem' }}
                        >
                            <div className="empty-icon" style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>📚</div>
                            <h3>No personal books yet.</h3>
                            <p style={{ color: 'var(--text-dim)' }}>Start by clicking "+ Add Book" in the header!</p>
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

            <section className="discovery-section" style={{ marginTop: '5rem' }}>
                <header className="featured-header">
                    <div>
                        <h2>Community Discoveries</h2>
                        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                            Popular titles from around the world via Open Library API.
                        </p>
                    </div>
                </header>

                <div className="book-grid">
                    {isLoading ? (
                        // Skeleton Loaders
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="skeleton-card">
                                <div className="skeleton-cover"></div>
                                <div className="skeleton-text short"></div>
                                <div className="skeleton-text"></div>
                            </div>
                        ))
                    ) : (
                        featuredBooks.map(book => (
                            <BookCard
                                key={book.id}
                                book={book}
                                onRead={onRead}
                                onEdit={null}
                                onDelete={null}
                                onToggleFavorite={() => { }}
                            />
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default Library;
