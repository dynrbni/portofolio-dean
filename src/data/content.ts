// Code files data with syntax highlighting
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

export const projects = [
    {
        name: 'TamiasPOS',
        description: 'Complete point of sale system with inventory management and real-time analytics dashboard.',
        tech: ['React Native', 'Expo', 'Supabase'],
        image: '/project-pos.png',
        github: '#',
        live: '#',
    },
    {
        name: 'Binernesia Course',
        description: 'Course platform with video streaming, progress tracking, and community features.',
        tech: ['Next.js', 'TypeScript', 'PostgreSQL'],
        image: '/project-learning.png',
        github: '#',
        live: '#',
    },
    {
        name: 'PerpusTB',
        description: 'Library Management System Web Application with multiple features and modern design.',
        tech: ['React', 'Node.js', 'MySQL'],
        image: '/project-library.png',
        github: '#',
        live: '#',
    },
];
