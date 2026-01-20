-- Portfolio Content Tables for Supabase

-- About section
CREATE TABLE IF NOT EXISTS about (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL DEFAULT 'Dean Rabbani',
    age TEXT NOT NULL DEFAULT '17',
    bio TEXT NOT NULL DEFAULT 'a 17-year-old fullstack developer from Indonesia. I love building modern web & mobile apps with clean code.',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Timeline/Journey
CREATE TABLE IF NOT EXISTS timeline (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    year TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    tech TEXT[] DEFAULT '{}',
    github_url TEXT DEFAULT '#',
    live_url TEXT DEFAULT '#',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Connect (GitHub info)
CREATE TABLE IF NOT EXISTS connect (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    github_username TEXT NOT NULL DEFAULT 'dynrbni',
    contributions TEXT NOT NULL DEFAULT '1,811',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact info
CREATE TABLE IF NOT EXISTS contact (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL DEFAULT 'deanrabbani20@gmail.com',
    github_url TEXT DEFAULT 'https://github.com/dynrbni',
    linkedin_url TEXT DEFAULT 'https://www.linkedin.com/in/muhammad-dean-rabbani-7475862b2/',
    twitter_url TEXT DEFAULT 'https://x.com/dynrbni',
    instagram_url TEXT DEFAULT 'https://instagram.com/dynrbni',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Footer
CREATE TABLE IF NOT EXISTS footer (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    copyright TEXT NOT NULL DEFAULT '© 2026 Dean Rabbani. All rights reserved.',
    message TEXT DEFAULT '#ST4NDWITHPALESTINE',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default data
INSERT INTO about (name, age, bio) VALUES 
('Dean Rabbani', '17', 'a 17-year-old fullstack developer from Indonesia. I love building modern web & mobile apps with clean code.');

INSERT INTO skills (name, sort_order) VALUES 
('React', 1),
('Next.js', 2),
('TypeScript', 3),
('Node.js', 4),
('React Native', 5),
('TailwindCSS', 6);

INSERT INTO timeline (year, title, description, sort_order) VALUES 
('2024', 'Fullstack Developer', 'Building web & mobile apps', 1),
('2023', 'Learning React & Next.js', 'Deep dive into React ecosystem', 2),
('2022', 'Started Coding', 'First lines of HTML & CSS', 3);

INSERT INTO projects (name, description, tech, github_url, live_url, sort_order) VALUES 
('TamiasPOS', 'Complete point of sale system with inventory management.', ARRAY['React Native', 'Expo', 'Supabase'], '#', '#', 1),
('Binernesia Course', 'Course platform with video streaming and progress tracking.', ARRAY['Next.js', 'TypeScript', 'PostgreSQL'], '#', '#', 2),
('PerpusTB', 'Library Management System Web Application.', ARRAY['React', 'Node.js', 'MySQL'], '#', '#', 3);

INSERT INTO connect (github_username, contributions) VALUES 
('dynrbni', '1,811');

INSERT INTO contact (email, github_url, linkedin_url, twitter_url, instagram_url) VALUES 
('deanrabbani20@gmail.com', 'https://github.com/dynrbni', 'https://www.linkedin.com/in/muhammad-dean-rabbani-7475862b2/', 'https://x.com/dynrbni', 'https://instagram.com/dynrbni');

INSERT INTO footer (copyright, message) VALUES 
('© 2026 Dean Rabbani. All rights reserved.', '#ST4NDWITHPALESTINE');

-- Enable RLS (optional - you can disable if you want public access)
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE connect ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE footer ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access" ON about FOR SELECT USING (true);
CREATE POLICY "Public read access" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read access" ON timeline FOR SELECT USING (true);
CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access" ON connect FOR SELECT USING (true);
CREATE POLICY "Public read access" ON contact FOR SELECT USING (true);
CREATE POLICY "Public read access" ON footer FOR SELECT USING (true);

-- Create policies for authenticated write access (using service role)
CREATE POLICY "Service role write" ON about FOR ALL USING (true);
CREATE POLICY "Service role write" ON skills FOR ALL USING (true);
CREATE POLICY "Service role write" ON timeline FOR ALL USING (true);
CREATE POLICY "Service role write" ON projects FOR ALL USING (true);
CREATE POLICY "Service role write" ON connect FOR ALL USING (true);
CREATE POLICY "Service role write" ON contact FOR ALL USING (true);
CREATE POLICY "Service role write" ON footer FOR ALL USING (true);
