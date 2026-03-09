import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

// Import assets from popups folder explicitly
import towerImg from '../assets/popups/tower.png';
import penImg from '../assets/popups/pen.png';
import globeImg from '../assets/popups/globe.png';
import balloonImg from '../assets/popups/balloon.png';
import microscopeImg from '../assets/popups/microscope.png';

// Import covers
import illustratedCover from '../assets/covers/illustrated.png';
import travelCover from '../assets/covers/travel.png';
import educationCover from '../assets/covers/education.png';

// Import author portraits
import rotemPortrait from '../assets/authors/rotem.png';
import marcusPortrait from '../assets/authors/marcus.png';
import sarahPortrait from '../assets/authors/sarah.png';

// SVG Icons for Features
const Icons = {
    Creation: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
    ),
    SEO: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-1.9" /><path d="M5 21l1.9-1.9" /><path d="M15 11l-3 3" /><path d="M16 10l-1.5 1.5" /><path d="M10.5 15.5 9 17" /><path d="M17 11c.9-.9 1.1-2.1.7-3.2l-1.4-1.4c-1.1-.4-2.3-.2-3.2.7l-4.5 4.5c-.9.9-1.1 2.1-.7 3.2l1.4 1.4c1.1.4 2.3.2 3.2-.7l4.5-4.5z" /><path d="m8 10 2 2" /><path d="m12 14 2 2" /></svg>
    ),
    Embedding: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
    ),
    Privacy: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
    ),
    Homepage: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
    ),
    Views: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
    )
};

const Counter = ({ value }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    const numericPart = parseInt(value.replace(/[^0-9]/g, '')) || 0;
    const isMillion = value.includes('M');
    const hasPlus = value.includes('+');
    const hasComma = value.includes(',');

    useEffect(() => {
        if (!inView) return;

        let start = 0;
        const end = numericPart;
        if (end === 0) return;

        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setDisplayValue(end);
                clearInterval(timer);
            } else {
                setDisplayValue(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [inView, numericPart]);

    const format = (v) => {
        if (hasComma) return v.toLocaleString();
        return v;
    };

    return (
        <h2 ref={ref}>
            {format(displayValue)}{isMillion ? 'M' : ''}{hasPlus ? '+' : ''}
        </h2>
    );
};

const FloatingBook = ({ cover, title, color }) => {
    return (
        <motion.div
            className="floating-book-container"
            whileHover={{
                rotateY: -25,
                rotateX: 5,
                scale: 1.05,
                z: 50
            }}
            transition={{ duration: 0.4 }}
        >
            <div className="floating-book-stack">
                <div className="book-page page-1"></div>
                <div className="book-page page-2"></div>
                <div className="book-page page-3"></div>
                <div className="book-front-cover" style={{ backgroundImage: `url(${cover})` }}>
                    <div className="book-spine-overlay"></div>
                </div>
            </div>
        </motion.div>
    );
};

const FloatingParticles = () => {
    const particles = Array.from({ length: 15 });
    return (
        <div className="particles-container">
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    className="floating-particle"
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        opacity: 0,
                        scale: Math.random() * 0.5 + 0.5
                    }}
                    animate={{
                        y: ["-10%", "110%"],
                        x: [null, (Math.random() - 0.5) * 20 + "%"],
                        opacity: [0, 0.3, 0],
                        rotate: [0, 360]
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 10
                    }}
                    style={{
                        width: Math.random() * 15 + 10 + "px",
                        height: Math.random() * 15 + 10 + "px"
                    }}
                />
            ))}
        </div>
    );
};

const RealisticPopup = ({ image, isActive }) => {
    return (
        <motion.div
            className="realistic-popup-container"
            initial={{ rotateX: 90, opacity: 0, scale: 0.1, y: 100 }}
            animate={{
                rotateX: isActive ? -90 : 90,
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1.0 : 0.1,
                y: isActive ? -40 : 100,
                translateZ: isActive ? 150 : 0
            }}
            transition={{
                type: "spring",
                stiffness: 80,
                damping: 12,
                delay: isActive ? 0.1 : 0
            }}
        >
            <img src={image} alt="Popup Element" className="popup-image" />
        </motion.div>
    );
};

const HeroBook = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const pages = [
        { title: "Digital Library", content: "Thousands of books at your fingertips.", image: towerImg },
        { title: "Easy Creation", content: "Write and publish in just a few clicks.", image: penImg },
        { title: "Educational Fun", content: "Interactive learning for all ages.", image: microscopeImg },
        { title: "Travel Adventures", content: "Explore the world from your desk.", image: balloonImg },
        { title: "Global Authors", content: "Join a community of creative minds.", image: globeImg }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPage((prev) => (prev + 1) % (pages.length + 1));
        }, 2500);
        return () => clearInterval(interval);
    }, [pages.length]);

    return (
        <div className="hero-book-3d-container">
            <div className="book-floor-shadow"></div>
            <div className="hero-book-3d">
                <div className="book-base-left"></div>
                <div className="book-base-right"></div>

                <div className="central-popup-stage">
                    {pages.map((page, index) => (
                        <RealisticPopup
                            key={index}
                            image={page.image}
                            isActive={index + 1 === currentPage}
                        />
                    ))}
                </div>

                <div className="book-spine-hinge">
                    <div className={`book-page-flipper cover-flipper ${currentPage > 0 ? 'flipped' : ''}`} style={{ zIndex: 100 }}>
                        <div className="page-front book-front">
                            <div className="book-cover-content">
                                <span>Booksky</span>
                            </div>
                        </div>
                        <div className="page-back book-cover-inside"></div>
                    </div>

                    {pages.map((page, index) => {
                        const pageNum = index + 1;
                        const isFlipped = pageNum < currentPage;

                        return (
                            <div
                                key={index}
                                className={`book-page-flipper ${isFlipped ? 'flipped' : ''}`}
                                style={{ zIndex: pages.length - index }}
                            >
                                <div className="page-front">
                                    <div className="page-content">
                                        <h4>{page.title}</h4>
                                        <p>{page.content}</p>
                                        <div className="page-number">{pageNum}</div>
                                    </div>
                                </div>
                                <div className="page-back parchment"></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const PremiumAuthorCard = ({ author, index }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            ref={cardRef}
            className="author-card-premium"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            whileHover={{ scale: 1.05 }}
        >
            <div className="author-portrait-wrapper">
                <motion.img src={author.portrait} className="author-portrait-img" style={{ transform: "translateZ(80px)" }} />
                <div className="author-portrait-glow"></div>
            </div>
            <motion.h3 style={{ transform: "translateZ(60px)" }}>{author.name}</motion.h3>
            <motion.p className="author-role-premium" style={{ transform: "translateZ(40px)" }}>{author.role}</motion.p>
            <div className="author-quote-premium" style={{ transform: "translateZ(30px)" }}>
                <span>“</span>{author.quote}<span>”</span>
            </div>
            <div className="author-card-shine"></div>
        </motion.div>
    );
};

const FeatureCard = ({ title, desc, IconComponent, index }) => {
    return (
        <motion.div
            className="feature-card-premium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
        >
            <div className="feature-icon-wrapper">
                <IconComponent /><div className="icon-glow"></div>
            </div>
            <h3>{title}</h3>
            <p>{desc}</p>
        </motion.div>
    );
};

const Home = ({ isLoggedIn }) => {
    const [activeFaq, setActiveFaq] = useState(null);
    const categories = [
        { title: 'Illustrated Books', cover: illustratedCover, color: '#eff6ff' },
        { title: 'Travel Books', cover: travelCover, color: '#f0fdf4' },
        { title: 'Education', cover: educationCover, color: '#fff7ed' }
    ];
    const stats = [
        { label: 'Published Books', value: '331,008' },
        { label: 'Creative Authors', value: '54,291' },
        { label: 'Monthly Readers', value: '2.5M+' },
        { label: 'Countries', value: '180+' }
    ];
    const authors = [
        { name: 'Rotem Omri', role: 'Premium Author', quote: '"I love that my portfolio and illustrated books are available all over the world!"', portrait: rotemPortrait },
        { name: 'Marcus Chen', role: 'Travel Writer', quote: '"Booksky made it so easy to turn my travel photos into a professional digital book."', portrait: marcusPortrait },
        { name: 'Sarah Jenkins', role: 'Educationalist', quote: '"The embedding feature is a game-changer for my interactive teaching materials."', portrait: sarahPortrait }
    ];
    const features = [
        { title: 'Simple & Easy Creation', desc: 'Create your book in minutes using our simple but powerful online editor.', Icon: Icons.Creation },
        { title: 'SEO Optimized', desc: 'Our books are built using SEO best practices and are highly visible to search engines.', Icon: Icons.SEO },
        { title: 'Embedding', desc: 'Embed anything inside your book. Embed your book anywhere.', Icon: Icons.Embedding },
        { title: 'Share Privately', desc: 'You can share your books using a private link without publishing to the world.', Icon: Icons.Privacy },
        { title: 'Personal Homepage', desc: 'Set up your own personal homepage, showcasing your bio and active books.', Icon: Icons.Homepage },
        { title: 'Current Book Views', desc: 'See how many readers are visiting each of your books, no matter how many you have.', Icon: Icons.Views }
    ];
    const faqs = [
        { q: 'Do I need design or coding skills to use Booksky?', a: 'Nope! Our editor is drag-and-drop simple. Anyone can create a beautiful book in minutes.' },
        { q: 'Do I keep the rights to my publication?', a: 'Yes, you retain 100% of the rights to any content you create and publish on Booksky.' },
        { q: 'Can I edit my book after it is published?', a: 'Absolutely. You can update your content anytime, and the changes will reflect immediately.' },
        { q: 'How many books can I make?', a: 'You can create unlimited books on our platform for free!' }
    ];

    return (
        <div className="landing-page">
            <div className="noise-overlay"></div>
            <FloatingParticles />
            <section className="hero-section">
                <motion.div className="hero-content" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                    <h1>Create & Share Awesome Digital Books</h1>
                    <p>With the simple-to-use Booksky platform, it's easy and free to make stunning digital books with text, pictures, and more.</p>
                    <Link to={isLoggedIn ? "/library" : "/auth"} className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                        {isLoggedIn ? 'Go to your Library' : 'Create your first book now!'}
                    </Link>
                    <p style={{ marginTop: '1.5rem', fontSize: '0.9rem' }}>It's free to create and share books with the world</p>
                </motion.div>
                <motion.div className="hero-image" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
                    <HeroBook />
                </motion.div>
            </section>

            <section className="stats-section">
                <div className="section-container"><div className="stats-grid">{stats.map((stat, i) => (
                    <motion.div key={i} className="stat-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} whileHover={{ rotateY: 15, rotateX: -10, scale: 1.05, z: 50 }} style={{ transformStyle: 'preserve-3d' }}>
                        <Counter value={stat.value} /><p>{stat.label}</p><div className="stat-card-glass"></div>
                    </motion.div>
                ))}</div></div>
            </section>

            <section className="section-container">
                <h2 className="section-title">See Our Books</h2>
                <div className="categories-grid">{categories.map((cat, i) => (
                    <div key={i} className="category-card-3d"><FloatingBook cover={cat.cover} /><h3 style={{ marginTop: '1.5rem' }}>{cat.title}</h3></div>
                ))}</div>
            </section>

            <section className="section-container" style={{ background: 'white' }}>
                <h2 className="section-title">Meet Our Premium Authors</h2>
                <div className="authors-grid">{authors.map((author, i) => <PremiumAuthorCard key={i} author={author} index={i} />)}</div>
            </section>

            <section className="section-container" style={{ background: '#f8fafc' }}>
                <h2 className="section-title">Booksky Features</h2>
                <div className="features-grid">{features.map((feat, i) => <FeatureCard key={i} index={i} title={feat.title} desc={feat.desc} IconComponent={feat.Icon} />)}</div>
            </section>

            <section className="section-container">
                <h2 className="section-title">FAQ</h2>
                <div className="faq-list">{faqs.map((faq, i) => (
                    <div key={i} className="faq-item">
                        <div className="faq-question" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>{faq.q}<span>{activeFaq === i ? '−' : '+'}</span></div>
                        <AnimatePresence>{activeFaq === i && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}><div style={{ padding: '1.5rem', color: 'var(--text-dim)', borderTop: '1px solid var(--border-color)' }}>{faq.a}</div></motion.div>
                        )}</AnimatePresence>
                    </div>
                ))}</div>
            </section>

            <section className="section-container" style={{ textAlign: 'center' }}>
                <h2 style={{ marginBottom: '2rem' }}>Make your own beautiful digital books today</h2>
                <Link to={isLoggedIn ? "/library" : "/auth"} className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                    {isLoggedIn ? 'Go to your Library' : 'Create your book now'}
                </Link>
            </section>
        </div>
    );
};

export default Home;
