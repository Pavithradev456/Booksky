import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import Library from './pages/Library';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Drafts from './pages/Drafts';
import Settings from './pages/Settings';
import BookModal from './components/BookModal';
import ReadOverlay from './components/ReadOverlay';
import Auth from './pages/Auth';
import About from './pages/About';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('booksky_books_react');
    return saved ? JSON.parse(saved) : [];
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('booksky_theme') || 'dark';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReadOpen, setIsReadOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [viewingBook, setViewingBook] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('booksky_is_logged_in') === 'true';
  });

  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const isAuthPage = location.pathname === '/auth';
  const hideLayout = isLandingPage || isAuthPage;

  useEffect(() => {
    localStorage.setItem('booksky_is_logged_in', isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('booksky_books_react', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('booksky_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleSaveBook = (bookData) => {
    if (editingBook) {
      setBooks(prev => prev.map(b => b.id === editingBook.id ? { ...b, ...bookData } : b));
    } else {
      const newBook = {
        ...bookData,
        id: Date.now().toString(),
        dateAdded: new Date().toISOString(),
        isFavorite: false
      };
      setBooks(prev => [newBook, ...prev]);
    }
    setEditingBook(null);
  };

  const handleDeleteBook = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks(prev => prev.filter(b => b.id !== id));
    }
  };

  const handleToggleFavorite = (id) => {
    setBooks(prev => prev.map(b =>
      b.id === id ? { ...b, isFavorite: !b.isFavorite } : b
    ));
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleReadBook = (book) => {
    setViewingBook(book);
    setIsReadOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeReadMode = () => {
    setIsReadOpen(false);
    document.body.style.overflow = 'auto';
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`app-layout ${theme}-theme`}>
      {!isAuthPage && (
        <Header
          onAddClick={() => { setEditingBook(null); setIsModalOpen(true); }}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          theme={theme}
          onToggleTheme={toggleTheme}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}

      <div className={`main-content-wrapper ${hideLayout ? 'full-width' : ''}`}>
        {!hideLayout && <Sidebar />}

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route
              path="/library"
              element={
                <Library
                  books={filteredBooks}
                  onRead={handleReadBook}
                  onEdit={handleEditBook}
                  onDelete={handleDeleteBook}
                  onToggleFavorite={handleToggleFavorite}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <Favorites
                  books={books.filter(b => b.isFavorite)}
                  onRead={handleReadBook}
                  onEdit={handleEditBook}
                  onDelete={handleDeleteBook}
                  onToggleFavorite={handleToggleFavorite}
                />
              }
            />
            <Route path="/drafts" element={<Drafts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth setIsLoggedIn={setIsLoggedIn} />} />
          </Routes>
        </main>
      </div>

      {!isAuthPage && <Footer />}

      <BookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBook}
        initialData={editingBook}
      />

      <ReadOverlay
        isOpen={isReadOpen}
        book={viewingBook}
        onClose={closeReadMode}
      />
    </div>
  );
}

export default App;
