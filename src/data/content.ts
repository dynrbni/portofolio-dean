export const files = [
    {
        name: 'aboutMe.js',
        code: [
            [{ text: '// Welcome to my portfolio!', class: 'comment' }],
            [
                { text: 'const', class: 'keyword' },
                { text: ' ', class: '' },
                { text: 'developer', class: 'variable' },
                { text: ' ', class: '' },
                { text: '=', class: 'operator' },
                { text: ' ', class: '' },
                { text: '{', class: 'bracket' },
            ],
            [
                { text: '  ', class: '' },
                { text: 'name', class: 'property' },
                { text: ':', class: 'punctuation' },
                { text: ' ', class: '' },
                { text: '"Dean Rabbani"', class: 'string' },
                { text: ',', class: 'punctuation' },
            ],
            [
                { text: '  ', class: '' },
                { text: 'role', class: 'property' },
                { text: ':', class: 'punctuation' },
                { text: ' ', class: '' },
                { text: '"Fullstack Developer"', class: 'string' },
                { text: ',', class: 'punctuation' },
            ],
            [
                { text: '  ', class: '' },
                { text: 'age', class: 'property' },
                { text: ':', class: 'punctuation' },
                { text: ' ', class: '' },
                { text: '17', class: 'number' },
                { text: ',', class: 'punctuation' },
            ],
            [
                { text: '  ', class: '' },
                { text: 'openToWork', class: 'property' },
                { text: ':', class: 'punctuation' },
                { text: ' ', class: '' },
                { text: 'true', class: 'boolean-true' },
                { text: ',', class: 'punctuation' },
            ],
            [
                { text: '  ', class: '' },
                { text: 'isTaken', class: 'property' },
                { text: ':', class: 'punctuation' },
                { text: ' ', class: '' },
                { text: 'false', class: 'boolean-false' },
                { text: ',', class: 'punctuation' },
            ],
            [
                { text: '}', class: 'bracket' },
                { text: ';', class: 'punctuation' },
            ],
        ],
    },
];

// ============ About ============
export const about = {
    name: 'Dean Rabbani',
    age: '17',
    bio: 'a 17-year-old fullstack developer from Indonesia. I love building modern web & mobile apps with clean code.',
};

// ============ Skills ============
export const skills = [
    { id: '1', name: 'React' },
    { id: '2', name: 'Next.js' },
    { id: '3', name: 'TypeScript' },
    { id: '4', name: 'Node.js' },
    { id: '5', name: 'React Native' },
    { id: '6', name: 'TailwindCSS' },
];

// ============ Timeline ============
export const timeline = [
    { id: '1', year: '2024', title: 'Fullstack Developer', description: 'Building web & mobile apps' },
    { id: '2', year: '2023', title: 'Learning React & Next.js', description: 'Deep dive into React ecosystem' },
    { id: '3', year: '2022', title: 'Started Coding', description: 'First lines of HTML & CSS' },
];

// ============ Projects ============
export const projects = [
    {
        id: '1',
        name: 'TamiasPOS',
        description: 'Complete point of sale system with inventory management and real-time analytics dashboard.',
        tech: ['React Native', 'Expo', 'Supabase'],
        image_url: '/project-pos.png',
        github_url: '#',
        live_url: '#',
    },
    {
        id: '2',
        name: 'Binernesia Course',
        description: 'Course platform with video streaming, progress tracking, and community features.',
        tech: ['Next.js', 'TypeScript', 'PostgreSQL'],
        image_url: '/project-learning.png',
        github_url: '#',
        live_url: '#',
    },
    {
        id: '3',
        name: 'PerpusTB',
        description: 'Library Management System Web Application with multiple features and modern design.',
        tech: ['React', 'Node.js', 'MySQL'],
        image_url: '/project-library.png',
        github_url: '#',
        live_url: '#',
    },
];

// ============ Connect (GitHub) ============
export const connect = {
    github_username: 'dynrbni',
};

// ============ Contact ============
export const contact = {
    email: 'deanrabbani20@gmail.com',
    github_url: 'https://github.com/dynrbni',
    linkedin_url: 'https://www.linkedin.com/in/muhammad-dean-rabbani-7475862b2/',
    twitter_url: 'https://x.com/dynrbni',
    instagram_url: 'https://instagram.com/dynrbni',
};

// ============ Footer ============
export const footer = {
    copyright: '© 2026 Dean Rabbani. All rights reserved.',
    message: '#ST4NDWITHPALESTINE',
};
