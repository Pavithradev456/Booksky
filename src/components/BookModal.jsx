import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BookModal = ({ isOpen, onClose, onSave, initialData }) => {
    const categories = ['Art', 'Biography', 'Business', 'Comics', 'Education', 'Fiction', 'History'];
    const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'];

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        category: 'Fiction',
        language: 'English',
        description: '',
        content: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                title: '',
                author: '',
                category: 'Fiction',
                language: 'English',
                description: '',
                content: ''
            });
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay-premium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => e.target.classList.contains('modal-overlay-premium') && onClose()}
                >
                    <motion.div
                        className="modal-premium"
                        initial={{ scale: 0.9, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 30 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="modal-header-premium">
                            <h2>{initialData?.id ? 'Edit Masterpiece' : 'Create New Book'}</h2>
                            <button className="close-x" onClick={onClose}>✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className="premium-form">
                            <div className="form-row">
                                <div className="form-group flex-2">
                                    <label htmlFor="title">Book Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        className="premium-input"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g. The Midnight Odyssey"
                                        required
                                    />
                                </div>
                                <div className="form-group flex-1">
                                    <label htmlFor="author">Author</label>
                                    <input
                                        type="text"
                                        id="author"
                                        className="premium-input"
                                        value={formData.author}
                                        onChange={handleChange}
                                        placeholder="Author Name"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group flex-1">
                                    <label htmlFor="category">Category</label>
                                    <select id="category" className="premium-select" value={formData.category} onChange={handleChange}>
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="form-group flex-1">
                                    <label htmlFor="language">Language</label>
                                    <select id="language" className="premium-select" value={formData.language} onChange={handleChange}>
                                        {languages.map(l => <option key={l} value={l}>{l}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Short Teaser</label>
                                <input
                                    type="text"
                                    id="description"
                                    className="premium-input"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Write a compelling one-liner..."
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="content">Full Chapter Content</label>
                                <textarea
                                    id="content"
                                    className="premium-textarea"
                                    rows="8"
                                    value={formData.content}
                                    onChange={handleChange}
                                    placeholder="Unleash your creativity here. Your readers are waiting..."
                                    required
                                />
                            </div>

                            <div className="modal-footer-premium">
                                <button type="button" className="btn-cancel" onClick={onClose}>Discard Changes</button>
                                <button type="submit" className="btn btn-primary premium-save">
                                    {initialData?.id ? 'Update Book' : 'Publish to Library'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BookModal;
