import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookCard from '../components/BookCard';

const Library = ({ books, onRead, onEdit, onDelete, onToggleFavorite, activeCategory, activeLanguage, sortBy, setSortBy, onRestore }) => {
    const [featuredBooks, setFeaturedBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid');

    useEffect(() => {
        const fetchFeaturedBooks = async () => {
            setIsLoading(true);
            try {
                // Map local category names to Open Library subjects
                const categoryToSubject = {
                    'All Categories': 'fiction',
                    'Art': 'art',
                    'Biography': 'biography',
                    'Business': 'business',
                    'Comics': 'comics',
                    'Education': 'education',
                    'Fiction': 'fiction',
                    'History': 'history'
                };

                const subject = categoryToSubject[activeCategory] || 'fiction';
                const response = await fetch(`https://openlibrary.org/subjects/${subject}.json?limit=8`);
                const data = await response.json();

                if (data.works) {
                    const mappedBooks = data.works.map(work => ({
                        id: `ol-${work.key.split('/').pop()}`,
                        title: work.title,
                        author: work.authors?.[0]?.name || 'Unknown Author',
                        category: activeCategory === 'All Categories' ? 'Fiction' : activeCategory,
                        language: 'English',
                        description: work.first_publish_year ? `First published in ${work.first_publish_year}.` : 'A trending discovery from the Open Library collection.',
                        coverImage: work.cover_id ? `https://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg` : null,
                        externalUrl: `https://openlibrary.org${work.key}`,
                        isFavorite: false,
                        isExternal: true
                    }));
                    setFeaturedBooks(mappedBooks);
                }
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFeaturedBooks();
    }, [activeCategory]);

    // Core Filtering Logic
    const processedBooks = books.filter(book => {
        const catMatch = activeCategory === 'All Categories' || book.category === activeCategory;
        const langMatch = activeLanguage === 'All Languages' || book.language === activeLanguage;
        return catMatch && langMatch;
    }).sort((a, b) => {
        if (sortBy === 'Newest') return new Date(b.dateAdded) - new Date(a.dateAdded);
        if (sortBy === 'Title') return a.title.localeCompare(b.title);
        if (sortBy === 'Author') return a.author.localeCompare(b.author);
        return 0;
    });

    return (
        <div className="page-view">
            <header className="featured-header">
                <div>
                    <h2>{activeCategory === 'All Categories' ? 'Your Collection' : activeCategory}</h2>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                        Showing {processedBooks.length} {activeLanguage !== 'All Languages' ? activeLanguage : ''} books in your library.
                    </p>
                </div>
                <div className="featured-actions">
                    <button
                        className="btn btn-outline"
                        onClick={onRestore}
                        style={{ marginRight: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.3)' }}
                    >
                        🔄 Restore Masterpieces
                    </button>
                    <button
                        className={`btn btn-outline ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => setViewMode(prev => prev === 'grid' ? 'list' : 'grid')}
                        style={{ marginRight: '0.5rem' }}
                    >
                        {viewMode === 'grid' ? 'View List' : 'View Grid'}
                    </button>
                    <select
                        className="sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="Newest">Newest</option>
                        <option value="Title">Title</option>
                        <option value="Author">Author</option>
                    </select>
                </div>
            </header>

            <div className={`book-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                <AnimatePresence mode="popLayout">
                    {processedBooks.length === 0 ? (
                        <motion.div
                            key="empty"
                            className="empty-state"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem' }}
                        >
                            <div className="empty-icon" style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>📚</div>
                            <h3>No books found matching filters.</h3>
                            <p style={{ color: 'var(--text-dim)' }}>Try changing your category or language selection!</p>
                        </motion.div>
                    ) : (
                        processedBooks.map(book => (
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
