import React from 'react';
import { motion } from 'framer-motion';
import pavithraImg from '../assets/pavithra_portrait.png'; // We'll move the generated image here

const About = () => {
    const stats = [
        { label: 'Members', value: '346,976', color: '#3b82f6' },
        { label: 'Published Books', value: '331,060', color: '#10b981' },
        { label: 'Genres', value: '130', color: '#f59e0b' },
        { label: 'Languages', value: '28', color: '#ef4444' }
    ];

    return (
        <div className="about-page">
            <div className="about-container">
                <main className="about-main">
                    <motion.section
                        className="about-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1>About Booksky</h1>

                        <div className="content-block">
                            <h2>What is Booksky?</h2>
                            <p>
                                Booksky is the world's most elegant and free platform for creating and sharing digital books.
                                Founded by **Ms. Pavithra Devendran**, our mission is to empower every reader to become an author.
                                Whether it's fiction, educational materials, or personal portfolios, Booksky provides the tools
                                to turn your words into stunning 3D interactive experiences.
                            </p>
                            <p>
                                Authors can create books from scratch or simply upload ideas and turn them into books in seconds.
                                Readers can access books on any device—laptops, mobile phones, and tablets.
                            </p>
                        </div>

                        <div className="content-block">
                            <h2>Who are we?</h2>
                            <p>
                                Booksky was envisioned and started by **Ms. Pavithra Devendran**, a visionary developer and
                                creative mind who saw the need for a more cinematic, accessible way to share stories online.
                                Driven by a passion for both technology and literature, she built Booksky to be a global
                                community where creativity knows no bounds.
                            </p>
                            <div className="founder-card-premium">
                                <div className="founder-image-wrapper">
                                    <img src={pavithraImg} alt="Ms. Pavithra Devendran" />
                                </div>
                                <div className="founder-details">
                                    <h3>Ms. Pavithra Devendran</h3>
                                    <p className="founder-title">Founder & Lead Architect</p>
                                    <div className="founder-quote">
                                        "I believe everyone has a masterpiece inside them. Booksky is just the canvas."
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="content-block">
                            <h2>How did it all start?</h2>
                            <p>
                                It all started with a simple idea: why should digital books be flat and boring? Pavithra
                                wanted to bring the tactile feel of a library—the mahogany shelves, the smell of paper,
                                and the joy of turning a page—into the digital world.
                            </p>
                            <p>
                                Launched in 2026, Booksky has quickly grown from a personal project into a professional
                                hub for thousands of creators, all while remaining 100% free for authors and readers.
                            </p>
                        </div>
                    </motion.section>
                </main>

                <aside className="about-sidebar">
                    <div className="sidebar-card">
                        <h3>OUR STATS</h3>
                        <div className="about-stats-list">
                            {stats.map((stat, i) => (
                                <div key={i} className="about-stat-item">
                                    <span className="stat-label">{stat.label}</span>
                                    <span className="stat-value" style={{ color: stat.color }}>{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="sidebar-card promo-card">
                        <h3>Join the Community</h3>
                        <p>Join over 300,000 creators today.</p>
                        <button className="btn btn-primary" style={{ width: '100%' }}>Create your first book</button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default About;
