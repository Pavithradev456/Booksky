import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqData = [
        {
            question: "What's new on Booksky?",
            answer: "We've recently added our premium 3D Reading Experience, realistic book covers for all masterpieces, and community discoveries powered by the Open Library API! Explore our new Library view to see these changes in action."
        },
        {
            question: "How do I add a new book to my collection?",
            answer: "Simply click the '+ Add Book' button in the header. You can fill in the title, author, description, category, and language. Your new book will appear instantly in your library with a unique premium cover!"
        },
        {
            question: "Can I read books directly in the app?",
            answer: "Yes! Booksky features a truly immersive 3D flip-book reader. Just click on any book cover in your library to start reading. You can turn pages with smooth animations using the navigation controls."
        },
        {
            question: "How can I favorite a book?",
            answer: "Every book card in your library has a heart icon. Click it to add the book to your 'Favorites' section for quick access later."
        },
        {
            question: "Is there a limit to the length of a book I can add?",
            answer: "While we support substantial content, we recommend keeping your stories under 100 pages for the best performance in the 3D reader. Our sample masterpieces are usually between 30-50 pages."
        },
        {
            question: "Can I edit or delete books after adding them?",
            answer: "Absolutely. Hover over any book in your 'Your Collection' section to see the edit (pencil) and delete (trash) icons. You can update any detail or remove a book permanently."
        },
        {
            question: "Where do 'Community Discoveries' come from?",
            answer: "These books are fetched live from the Open Library API! They represent trending and classic titles from around the world, curated based on the category you're currently exploring."
        },
        {
            question: "How do I reset my password?",
            answer: "You can manage your account settings in the 'Settings' page. If you're signed out, use the 'Forgot Password' link on the login page to receive a reset link via email."
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="page-view faq-page">
            <div className="faq-container">
                <div className="faq-main">
                    <header className="faq-header">
                        <h1>Frequently Asked Questions (FAQ)</h1>
                        <p>Find answers to common questions about using Booksky and managing your digital library.</p>
                    </header>

                    <div className="faq-list">
                        {faqData.map((item, index) => (
                            <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
                                <button
                                    className="faq-question"
                                    onClick={() => toggleAccordion(index)}
                                    aria-expanded={activeIndex === index}
                                >
                                    <span>{item.question}</span>
                                    <span className={`faq-icon ${activeIndex === index ? 'rotate' : ''}`}>+</span>
                                </button>
                                <AnimatePresence>
                                    {activeIndex === index && (
                                        <motion.div
                                            className="faq-answer"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <p>{item.answer}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                <aside className="faq-sidebar">
                    <div className="contact-card">
                        <h3>Didn't find an answer?</h3>
                        <p>You can always contact us through our contact form or directly via email.</p>

                        <div className="contact-methods">
                            <button className="btn btn-primary full-width">Contact Form</button>

                            <div className="email-support">
                                <span>Or by email:</span>
                                <a href="mailto:support@booksky.com">support@booksky.com</a>
                            </div>
                        </div>

                        <p className="response-time">We will try to answer within 24 hours!</p>
                    </div>
                </aside>
            </div>

            <style jsx="true">{`
                .faq-page {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 2rem;
                }
                .faq-container {
                    display: grid;
                    grid-template-columns: 1fr 300px;
                    gap: 3rem;
                }
                .faq-header {
                    margin-bottom: 3rem;
                    border-bottom: 3px solid var(--accent-blue);
                    padding-bottom: 1rem;
                }
                .faq-header h1 {
                    font-size: 2.2rem;
                    color: var(--text-main);
                    margin-bottom: 0.5rem;
                }
                .faq-header p {
                    color: var(--text-dim);
                    font-size: 1.1rem;
                }
                .faq-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .faq-item {
                    border-bottom: 2px solid var(--border-color);
                    background: var(--card-bg);
                    border-radius: 12px;
                    margin-bottom: 1rem;
                    padding: 0 2rem; /* Added space at starting and ending */
                    border: 1px solid var(--border-color);
                    transition: all 0.3s ease;
                }
                .faq-item:hover {
                    border-color: var(--accent-blue);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }
                .faq-question {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem 0;
                    background: none;
                    border: none;
                    text-align: left;
                    font-size: 1.2rem;
                    font-weight: 500;
                    color: var(--accent-blue);
                    cursor: pointer;
                    transition: color 0.3s ease;
                }
                .faq-question:hover {
                    color: var(--accent-hover);
                }
                .faq-icon {
                    font-size: 1.5rem;
                    transition: transform 0.3s ease;
                    color: var(--text-dim);
                }
                .faq-icon.rotate {
                    transform: rotate(45deg);
                }
                .faq-answer {
                    overflow: hidden;
                    color: var(--text-dim);
                    line-height: 1.6;
                    font-size: 1.1rem;
                    padding-bottom: 1.5rem;
                }
                
                .faq-sidebar {
                    position: sticky;
                    top: 100px;
                    height: fit-content;
                }
                .contact-card {
                    background: var(--card-bg);
                    padding: 2rem;
                    border-radius: 16px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                    border: 1px solid var(--border-color);
                }
                .contact-card h3 {
                    font-size: 1.3rem;
                    margin-bottom: 1rem;
                }
                .contact-card p {
                    color: var(--text-dim);
                    font-size: 0.95rem;
                    line-height: 1.5;
                    margin-bottom: 1.5rem;
                }
                .contact-methods {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    margin-bottom: 1.5rem;
                }
                .email-support {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .email-support span {
                    font-size: 0.9rem;
                    color: var(--text-dim);
                }
                .email-support a {
                    color: var(--accent-blue);
                    text-decoration: none;
                    font-weight: 500;
                }
                .response-time {
                    font-style: italic;
                    font-size: 0.85rem !important;
                    text-align: center;
                    opacity: 0.7;
                }
                
                @media (max-width: 900px) {
                    .faq-container {
                        grid-template-columns: 1fr;
                    }
                    .faq-sidebar {
                        position: static;
                    }
                }
            `}</style>
        </div>
    );
};

export default FAQ;
