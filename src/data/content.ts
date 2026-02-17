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
    bio: 'a 17-year-old fullstack developer based on Depok, Indonesia. Im student at SMK Taruna Bhakti Depok. I love building modern website or mobile apps with chilling songs and place. Nice to meet you! :)',
};

// ============ Skills ============
export const skills = [
    { id: '1', name: 'React' },
    { id: '2', name: 'Next.js' },
    { id: '16', name: 'JavaScript' },
    { id: '3', name: 'TypeScript' },
    { id: '23', name: 'Vercel'},
    { id: '4', name: 'Node.js' },
    { id: '5', name: 'React Native' },
    { id: '6', name: 'TailwindCSS' },
    { id: '7', name: 'Supabase' },
    { id: '8', name: 'PostgreSQL' },
    { id: '9', name: 'MySQL' },
    { id: '10', name: 'Prisma' },
    { id: '11', name: 'Express.js' },
    { id: '12', name: 'Git' },
    { id: '13', name: 'Linux' },
    { id: '14', name: 'Docker' },
    { id: '15', name: 'Python' },
    { id: '17', name: 'Dart' },
    { id: '18', name: 'Flutter' },
    { id: '19', name: 'Figma' },
    { id: '21', name: 'VS Code' },
    { id: '22', name: 'GitHub' },
];

// ============ Timeline ============
export const timeline = [
    { id: '1', year: '2020', title: 'First line of Codes', description: 'Touching HTML and CSS for the first time and making simple websites with that.' },
    { id: '2', year: '2021', title: 'Entering Islamic Boarding Schools', description: 'Started my journey in an Islamic boarding school in Bogor and i cannot learn about new tech stack and my skills has been stuck on HTML CSS only.' },
    { id: '3', year: '2023', title: 'Starting to Writing Code Again', description: 'After a long break for 2 years without learning about coding, I started coding again and learned more about web development, and touching JavaScript for the first time.' },
    { id: '4', year: '2024', title: 'Framework is My Freind', description: 'After Graduating from my Islamic boarding school, I started learning more about JavaScript frameworks like Vue.js React and Next.js.' },
    { id: '5', year: '2024', title: 'Learning to Build Projects', description: 'I started building projects to improve my skills and also to make an impact on the world.' },
    { id: '6', year: '2025', title: 'Starting to Learn Mobile Development', description: 'I started learning mobile development with Flutter and Dart to build cross-platform apps. and now Im Prefer using React Native to build mobile applications.' },
    { id: '7', year: '2025', title: 'Be a Fullstack Web Developer', description: 'I leaning about databases and Backend Web Development with Next.js Route, Node.js, Express.js and FastAPI Python.' },
    { id: '8', year: '2026', title: 'Searching Wife', description: 'Just a jokes HAHAHA #mybinigweh' },
];

// ============ Projects ============
export const projects = [
    {
        id: '1',
        name: 'TamiasPOS',
        description: 'Complete point of sale system with inventory management and real-time analytics dashboard.',
        tech: ['Next.js', 'React Native', 'Expo', 'PostgreSQL', 'Express.js', 'Prisma', 'WebSocket', 'Vercel'],
        image_url: '/project-pos.png',
        github_url: 'Private Repository',
        live_url: 'https://tamias-pos.vercel.app',
    },
    {
        id: '2',
        name: 'Binernesia Course',
        description: 'Course platform with video streaming, progress tracking, and community features.',
        tech: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Supabase', 'Vercel', 'Railway'],
        image_url: '/project-learning.png',
        github_url: 'Private Repository',
        live_url: 'https://binernesia.vercel.app',
    },
    {
        id: '3',
        name: 'PerpusTB',
        description: 'Library Management System Web Application with multiple features and modern design.',
        tech: ['React', 'Next.js', 'Node.js', 'MySQL', 'Express.js', 'Prisma', 'Vercel', 'Railway'],
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
