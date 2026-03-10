
const generateStory = (title, author, category) => {
    const intros = [
        "The sky was a bruised purple, the kind of color that only appears after a storm has spent its fury and left the world in a state of damp reflection.",
        "It began as a whisper in the dusty corners of the library, a sound so faint it could have been mistaken for the settling of ancient pages.",
        "They say time is a river, but in the heart of the city, it felt more like a labyrinth of neon lights and shadow, where every turn revealed a new secret.",
        "History is written by the victors, but the legends are whispered by the survivors in the flickering light of a dying campfire."
    ];

    const midSections = [
        "As the journey continued, the air grew thick with the scent of pine and old magic. Every step felt heavier than the last, as if the ground itself were trying to hold onto them. The path ahead was obscured by a thick fog, but there was a light glowing in the distance—a steady, golden pulse that seemed to beat in time with their own hearts.",
        "In the boardrooms of the high-towered corporations, the true power wasn't in the money, but in the information. The data flowed like blood through the digital veins of the city, and those who could tap into it were the new gods of the era. However, even gods have their weaknesses, and a single line of corrupted code could bring it all crashing down.",
        "The brush moved with a life of its own, capturing the raw emotion of the moment. It wasn't just about the colors or the shapes, but about the space between them—the silence that spoke louder than any shout. The artist knew that this would be their final work, the culmination of a lifetime spent chasing ghosts in the gallery.",
        "The research was conclusive, yet terrifying. The quantum fluctuations weren't random; they were patterned, like a language we had forgotten how to speak. Dr. Thorne stood before the monitor, watching the waves collapse into particles, realizing that we weren't just observing reality—we were dreaming it into existence."
    ];

    const conclusion = "In the end, the truth was simpler than any of them had imagined. It wasn't about the destination, or even the journey, but about the people they had become along the way. As the sun finally broke through the clouds, the world didn't look different, but they saw it through eyes that had finally learned how to see.";

    let story = `Welcome to "${title}" by ${author}. This is a deep exploration of ${category}.\\n\\n`;

    // We need ~6000 words. Each paragraph is ~50 words. So 120 paragraphs.
    for (let i = 1; i <= 40; i++) {
        story += `Page ${i}\\n\\n`;
        story += intros[i % intros.length] + " ";
        for (let j = 0; j < 5; j++) {
            story += midSections[(i + j) % midSections.length] + " ";
        }
        story += conclusion + "\\n\\n";
        story += "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ".repeat(4) + "\\n\\n";
    }

    return story;
};

export const DUMMY_BOOKS = [
    {
        id: 'seed-1',
        title: 'The Wandering Artist',
        author: 'Julien Sorel',
        category: 'Art',
        language: 'English',
        description: 'A deep dive into the soul of a painter navigating the bustling streets of 19th century Paris.',
        content: generateStory('The Wandering Artist', 'Julien Sorel', 'Art'),
        coverImage: '/assets/covers/wandering_artist.png',
        dateAdded: '2024-03-01T10:00:00Z',
        isFavorite: false
    },
    {
        id: 'seed-2',
        title: 'Quantum Whispers',
        author: 'Dr. Aris Thorne',
        category: 'Education',
        language: 'English',
        description: 'An educational odyssey through the strange and beautiful world of quantum mechanics.',
        content: generateStory('Quantum Whispers', 'Dr. Aris Thorne', 'Education'),
        coverImage: '/assets/covers/quantum_whispers.png',
        dateAdded: '2024-03-02T12:00:00Z',
        isFavorite: true
    },
    {
        id: 'seed-3',
        title: 'El Secreto del Valle',
        author: 'Elena Rivera',
        category: 'Fiction',
        language: 'Spanish',
        description: 'Una historia de misterio y romance ambientada en los valles escondidos de los Andes.',
        content: generateStory('El Secreto del Valle', 'Elena Rivera', 'Fiction'),
        coverImage: '/assets/covers/secreto_valle.png',
        dateAdded: '2024-03-03T09:00:00Z',
        isFavorite: false
    },
    {
        id: 'seed-4',
        title: 'The Silicon Empire',
        author: 'Marc Andreessen',
        category: 'Business',
        language: 'English',
        description: 'How technology reshaped the corporate landscape and created new titans of industry.',
        content: generateStory('The Silicon Empire', 'Marc Andreessen', 'Business'),
        coverImage: '/assets/covers/silicon_empire.png',
        dateAdded: '2024-03-04T15:00:00Z',
        isFavorite: false
    },
    {
        id: 'seed-5',
        title: 'Life of a Legend',
        author: 'Sarah Jenkins',
        category: 'Biography',
        language: 'English',
        description: 'The unauthorized story of an icon who changed the face of modern cinema.',
        content: generateStory('Life of a Legend', 'Sarah Jenkins', 'Biography'),
        coverImage: '/assets/covers/life_legend.png',
        dateAdded: '2024-03-05T08:30:00Z',
        isFavorite: true
    },
    {
        id: 'seed-6',
        title: 'The Lost Chronicles',
        author: 'Professor H. Langdon',
        category: 'History',
        language: 'English',
        description: 'Uncovering the forgotten civilizations that paved the way for modern humanity.',
        content: generateStory('The Lost Chronicles', 'Professor H. Langdon', 'History'),
        coverImage: '/assets/covers/lost_chronicles.png',
        dateAdded: '2024-03-06T11:20:00Z',
        isFavorite: false
    },
    {
        id: 'seed-7',
        title: 'Shadows of the Nexus',
        author: 'Stan Lee-esque',
        category: 'Comics',
        language: 'English',
        description: 'In a world beyond our own, one hero stands between civilization and the void.',
        content: generateStory('Shadows of the Nexus', 'Stan Lee-esque', 'Comics'),
        coverImage: '/assets/covers/shadows_nexus.png',
        dateAdded: '2024-03-07T14:45:00Z',
        isFavorite: false
    },
    {
        id: 'seed-8',
        title: 'Modern Business Strategies',
        author: 'Elon Musk-esque',
        category: 'Business',
        language: 'English',
        description: 'A comprehensive guide to disruptive innovation and startup scaling.',
        content: generateStory('Modern Business Strategies', 'Elon Musk-esque', 'Business'),
        coverImage: '/assets/covers/modern_business.png',
        dateAdded: '2024-03-08T09:15:00Z',
        isFavorite: false
    },
    {
        id: 'seed-9',
        title: 'The Art of War in Finance',
        author: 'Sun Tzu II',
        category: 'Business',
        language: 'English',
        description: 'Applying ancient philosophical wisdom to modern market movements.',
        content: generateStory('The Art of War in Finance', 'Sun Tzu II', 'Business'),
        coverImage: '/assets/covers/art_war_finance.png',
        dateAdded: '2024-03-09T16:20:00Z',
        isFavorite: false
    }
];
