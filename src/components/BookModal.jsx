import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BookModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        content: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({ title: '', author: '', description: '', content: '' });
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
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => e.target.classList.contains('modal-overlay') && onClose()}
                >
                    <motion.div
                        className="modal"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    >
                        <h2>{initialData?.id ? 'Edit Book' : 'Add New Book'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Book Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. The Midnight Odyssey"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="author">Author Name</label>
                                <input
                                    type="text"
                                    id="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    placeholder="e.g. Jane Doe"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Short Description</label>
                                <input
                                    type="text"
                                    id="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="A brief summary of your story..."
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Book Content</label>
                                <textarea
                                    id="content"
                                    rows="6"
                                    value={formData.content}
                                    onChange={handleChange}
                                    placeholder="Write your story here..."
                                    required
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn" onClick={onClose} style={{ background: 'transparent', color: 'var(--text-dim)' }}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Save Book</button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BookModal;
