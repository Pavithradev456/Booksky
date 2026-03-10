import React, { forwardRef, useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';

const PageCover = forwardRef((props, ref) => {
    return (
        <div className="page page-cover" ref={ref} data-density="hard">
            <div className="page-content">
                <h2>{props.children}</h2>
            </div>
        </div>
    );
});

const Page = forwardRef((props, ref) => {
    return (
        <div className="page" ref={ref}>
            <div className="page-content">
                <div className="page-header">{props.number}</div>
                <div className="page-text">{props.children}</div>
                <div className="page-footer">{props.number + 1}</div>
            </div>
        </div>
    );
});

const BookFlipReader = ({ book }) => {
    const bookRef = useRef();
    const [pages, setPages] = useState([]);

    useEffect(() => {
        if (!book) return;

        // Logic to split content into pages
        const rawContent = book.isExternal ? book.description : book.content;
        // Handle literal \n or escaped \\n
        const content = rawContent.replace(/\\n/g, '\n');

        const paragraphs = content.split('\n');
        const wordsPerPage = 140;
        const pagedContent = [];
        let currentPageWords = [];

        paragraphs.forEach(para => {
            const words = para.split(' ');
            if (currentPageWords.length + words.length > wordsPerPage) {
                // If this paragraph exceeds the limit, push current and start new
                pagedContent.push(currentPageWords.join(' '));
                currentPageWords = words;
            } else {
                currentPageWords.push(...words);
                currentPageWords.push('\n\n'); // Add some spacing between paragraphs on same page
            }
        });

        if (currentPageWords.length > 0) {
            pagedContent.push(currentPageWords.join(' '));
        }

        // Add extra pages if needed for external books or metadata
        if (book.isExternal && pagedContent.length < 5) {
            for (let i = 0; i < 5; i++) {
                pagedContent.push(`Chapter ${i + 1}: The Continued Journey...\\n\\nThis is a simulation of the extended content available for ${book.title}. In the full edition, you would find dozens of pages following the main plot and deep character development.\\n\\nOpen Library community provides this classic edition for your reading pleasure. Enjoy the immersive flipping experience in Booksky!`);
            }
        }

        setPages(pagedContent);
    }, [book]);

    if (!book || pages.length === 0) return null;

    return (
        <div className="book-reader-wrapper">
            <HTMLFlipBook
                width={500}
                height={700}
                size="stretch"
                minWidth={315}
                maxWidth={1000}
                minHeight={400}
                maxHeight={1533}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                className="book-flip-engine"
                ref={bookRef}
            >
                <PageCover>{book.title}</PageCover>

                {pages.map((content, index) => (
                    <Page key={index} number={index + 1}>
                        {content}
                    </Page>
                ))}

                <PageCover>THE END</PageCover>
            </HTMLFlipBook>

            <div className="reader-controls">
                <button className="control-btn" onClick={() => bookRef.current.pageFlip().flipPrev()}>
                    <span className="icon">⏮</span> Prev
                </button>
                <div className="page-indicator">
                    Booksky Premium Reader
                </div>
                <button className="control-btn" onClick={() => bookRef.current.pageFlip().flipNext()}>
                    Next <span className="icon">⏭</span>
                </button>
            </div>
        </div>
    );
};

export default BookFlipReader;
