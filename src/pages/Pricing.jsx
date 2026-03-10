import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Pricing = () => {
    const [isYearly, setIsYearly] = useState(false);

    const plans = [
        {
            name: "Free",
            price: 0,
            description: "Perfect for casual readers just starting their digital library.",
            features: [
                "Up to 5 Personal Books",
                "Standard 2D Reader View",
                "Community Discoveries",
                "Basic Search & Filters",
                "Standard Theme Support"
            ],
            buttonText: "Current Plan",
            isCurrent: true,
            highlight: false
        },
        {
            name: "Pro",
            price: isYearly ? 7.99 : 9.99,
            description: "The ultimate experience for dedicated book lovers.",
            features: [
                "Unlimited Personal Books",
                "Premium 3D Flip Reader",
                "Custom Masterpiece Covers",
                "Advanced Sort & Filters",
                "Priority Email Support",
                "Ad-Free Experience"
            ],
            buttonText: "Upgrade to Pro",
            isCurrent: false,
            highlight: true
        },
        {
            name: "Elite",
            price: isYearly ? 15.99 : 19.99,
            description: "Exclusive features for authors and power collectors.",
            features: [
                "Everything in Pro",
                "Offline Reading Mode",
                "AI Reading Companion",
                "Early Access to Features",
                "Dedicated Account Manager",
                "Cloud Sync Across Devices"
            ],
            buttonText: "Go Elite",
            isCurrent: false,
            highlight: false
        }
    ];

    return (
        <div className="page-view pricing-page">
            <header className="pricing-header">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Unlock the Full Potential of <span>Booksky</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    Choose the plan that's right for your reading journey. No hidden fees.
                </motion.p>

                <div className="billing-toggle">
                    <span className={!isYearly ? 'active' : ''}>Monthly</span>
                    <button
                        className={`toggle-btn ${isYearly ? 'yearly' : ''}`}
                        onClick={() => setIsYearly(!isYearly)}
                    >
                        <div className="toggle-knob"></div>
                    </button>
                    <span className={isYearly ? 'active' : ''}>Yearly <span className="save-tag">Save 20%</span></span>
                </div>
            </header>

            <div className="pricing-grid">
                {plans.map((plan, index) => (
                    <motion.div
                        key={plan.name}
                        className={`pricing-card ${plan.highlight ? 'highlight' : ''}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index + 0.3, duration: 0.5 }}
                    >
                        {plan.highlight && <div className="popular-badge">Most Popular</div>}
                        <div className="card-top">
                            <h3>{plan.name}</h3>
                            <div className="price-display">
                                <span className="currency">$</span>
                                <span className="amount">{plan.price}</span>
                                <span className="period">/{isYearly ? 'yr' : 'mo'}</span>
                            </div>
                            <p className="description">{plan.description}</p>
                        </div>

                        <div className="card-features">
                            <ul>
                                {plan.features.map((feature, fIndex) => (
                                    <li key={fIndex}>
                                        <span className="check-icon">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="card-footer">
                            <button className={`btn ${plan.highlight ? 'btn-primary' : 'btn-outline'} full-width`}>
                                {plan.buttonText}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <section className="pricing-guarantee">
                <div className="guarantee-item">
                    <span className="icon">🛡️</span>
                    <div>
                        <h4>Secure Payments</h4>
                        <p>All transactions are 100% encrypted and secure.</p>
                    </div>
                </div>
                <div className="guarantee-item">
                    <span className="icon">🔙</span>
                    <div>
                        <h4>Money Back Guarantee</h4>
                        <p>7-day risk-free refund for all premium plans.</p>
                    </div>
                </div>
                <div className="guarantee-item">
                    <span className="icon">💬</span>
                    <div>
                        <h4>24/7 Expert Support</h4>
                        <p>Our dedicated team is always here to help you.</p>
                    </div>
                </div>
            </section>

            <style jsx="true">{`
                .pricing-page {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 3rem 1.5rem;
                }
                .pricing-header {
                    text-align: center;
                    margin-bottom: 4rem;
                }
                .pricing-header h1 {
                    font-size: 2.5rem;
                    margin-bottom: 0.8rem;
                    color: var(--text-main);
                }
                .pricing-header h1 span {
                    color: var(--accent-blue);
                }
                .pricing-header p {
                    font-size: 1.2rem;
                    color: var(--text-dim);
                    max-width: 600px;
                    margin: 0 auto 2.5rem;
                }
                
                .billing-toggle {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1.2rem;
                    font-weight: 600;
                    color: var(--text-dim);
                }
                .billing-toggle span.active {
                    color: var(--text-main);
                }
                .save-tag {
                    background: rgba(16, 185, 129, 0.1);
                    color: #10b981;
                    padding: 0.2rem 0.6rem;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    margin-left: 0.5rem;
                }
                .toggle-btn {
                    width: 60px;
                    height: 32px;
                    background: var(--border-color);
                    border: none;
                    border-radius: 20px;
                    position: relative;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .toggle-btn.yearly {
                    background: var(--accent-blue);
                }
                .toggle-knob {
                    position: absolute;
                    width: 24px;
                    height: 24px;
                    background: white;
                    border-radius: 50%;
                    top: 4px;
                    left: 4px;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
                .toggle-btn.yearly .toggle-knob {
                    left: 32px;
                }

                .pricing-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.5rem;
                    margin-bottom: 5rem;
                }
                .pricing-card {
                    background: var(--card-bg);
                    border: 1px solid var(--border-color);
                    border-radius: 20px;
                    padding: 2rem 1.5rem;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.03);
                }
                .pricing-card:hover {
                    transform: translateY(-12px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
                    border-color: var(--accent-blue);
                }
                .pricing-card.highlight {
                    border: 2px solid var(--accent-blue);
                    transform: scale(1.05);
                }
                .pricing-card.highlight:hover {
                    transform: scale(1.05) translateY(-12px);
                }
                .popular-badge {
                    position: absolute;
                    top: -15px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: var(--accent-blue);
                    color: white;
                    padding: 0.5rem 1.2rem;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    letter-spacing: 0.5px;
                    box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
                }

                .card-top {
                    text-align: center;
                    margin-bottom: 2rem;
                }
                .card-top h3 {
                    font-size: 1.5rem;
                    color: var(--text-main);
                    margin-bottom: 1.5rem;
                    opacity: 0.8;
                }
                .price-display {
                    margin-bottom: 0.8rem;
                    display: flex;
                    align-items: baseline;
                    justify-content: center;
                }
                .currency {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: var(--text-main);
                }
                .amount {
                    font-size: 3rem;
                    font-weight: 800;
                    color: var(--text-main);
                    letter-spacing: -1.5px;
                }
                .period {
                    color: var(--text-dim);
                    font-size: 1rem;
                }
                .description {
                    color: var(--text-dim);
                    font-size: 0.9rem;
                    line-height: 1.4;
                }

                .card-features {
                    margin-bottom: 3rem;
                }
                .card-features ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .card-features li {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    margin-bottom: 1rem;
                    color: var(--text-main);
                    font-size: 0.95rem;
                }
                .check-icon {
                    width: 20px;
                    height: 20px;
                    background: rgba(16, 185, 129, 0.15);
                    color: #10b981;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.75rem;
                    font-weight: 800;
                    flex-shrink: 0;
                }

                .card-footer {
                    margin-top: auto;
                }

                .pricing-guarantee {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 3rem;
                    padding: 3rem;
                    background: rgba(59, 130, 246, 0.05);
                    border-radius: 32px;
                }
                .guarantee-item {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }
                .guarantee-item .icon {
                    font-size: 2.5rem;
                    flex-shrink: 0;
                }
                .guarantee-item h4 {
                    font-size: 1.1rem;
                    margin-bottom: 0.3rem;
                    color: var(--text-main);
                }
                .guarantee-item p {
                    font-size: 0.9rem;
                    color: var(--text-dim);
                    line-height: 1.4;
                }

                @media (max-width: 768px) {
                    .pricing-header h1 {
                        font-size: 2.2rem;
                    }
                    .pricing-grid {
                        grid-template-columns: 1fr;
                    }
                    .pricing-card.highlight {
                        transform: none;
                    }
                    .pricing-card.highlight:hover {
                        transform: translateY(-8px);
                    }
                }
            `}</style>
        </div>
    );
};

export default Pricing;
