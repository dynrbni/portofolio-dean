'use client';

import { useState, useEffect, useRef } from 'react';
import { supabaseAdmin } from '@/lib/supabase';

const SECRET_KEY = 'deandean20';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [keyInput, setKeyInput] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [activeTab, setActiveTab] = useState('about');
    const [uploading, setUploading] = useState<string | null>(null);

    const [about, setAbout] = useState({ id: '', name: '', age: '', bio: '' });
    const [skills, setSkills] = useState<Array<{ id: string; name: string; sort_order: number }>>([]);
    const [timeline, setTimeline] = useState<Array<{ id: string; year: string; title: string; description: string; sort_order: number }>>([]);
    const [projects, setProjects] = useState<Array<{ id: string; name: string; description: string; tech: string[]; techInput: string; github_url: string; live_url: string; image_url: string; sort_order: number }>>([]);
    const [connect, setConnect] = useState({ id: '', github_username: '', contributions: '' });
    const [contact, setContact] = useState({ id: '', email: '', github_url: '', linkedin_url: '', twitter_url: '', instagram_url: '' });
    const [footer, setFooter] = useState({ id: '', copyright: '', message: '' });

    const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

    useEffect(() => {
        const auth = localStorage.getItem('portfolio_admin_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
            loadData();
        }
    }, []);

    const loadData = async () => {
        setLoading(true);
        const [aboutRes, skillsRes, timelineRes, projectsRes, connectRes, contactRes, footerRes] = await Promise.all([
            supabaseAdmin.from('about').select('*').single(),
            supabaseAdmin.from('skills').select('*').order('sort_order'),
            supabaseAdmin.from('timeline').select('*').order('sort_order'),
            supabaseAdmin.from('projects').select('*').order('sort_order'),
            supabaseAdmin.from('connect').select('*').single(),
            supabaseAdmin.from('contact').select('*').single(),
            supabaseAdmin.from('footer').select('*').single(),
        ]);

        if (aboutRes.data) setAbout(aboutRes.data);
        if (skillsRes.data) setSkills(skillsRes.data);
        if (timelineRes.data) setTimeline(timelineRes.data);
        if (projectsRes.data) setProjects(projectsRes.data.map((p: { id: string; name: string; description: string; tech: string[]; github_url: string; live_url: string; image_url: string; sort_order: number }) => ({ ...p, techInput: p.tech?.join(', ') || '' })));
        if (connectRes.data) setConnect(connectRes.data);
        if (contactRes.data) setContact(contactRes.data);
        if (footerRes.data) setFooter(footerRes.data);
        setLoading(false);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (keyInput === SECRET_KEY) {
            setIsAuthenticated(true);
            localStorage.setItem('portfolio_admin_auth', 'true');
            setError('');
            loadData();
        } else {
            setError('Invalid key!');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('portfolio_admin_auth');
    };

    const uploadImage = async (file: File, projectId: string, index: number) => {
        setUploading(projectId);
        const fileExt = file.name.split('.').pop();
        const fileName = `project-${projectId}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabaseAdmin.storage.from('images').upload(fileName, file, {
            cacheControl: '3600',
            upsert: true
        });

        if (uploadError) {
            alert('Upload failed: ' + uploadError.message);
            setUploading(null);
            return;
        }

        const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/images/${fileName}`;

        const p = [...projects];
        p[index].image_url = imageUrl;
        setProjects(p);

        const { error: dbError } = await supabaseAdmin.from('projects').update({ image_url: imageUrl }).eq('id', projectId);

        if (dbError) {
            alert('Database save failed: ' + dbError.message);
            console.error('DB Error:', dbError);
        } else {
            alert('Image uploaded and saved!');
        }

        setUploading(null);
    };

    const handleSave = async () => {
        setLoading(true);
        await Promise.all([
            supabaseAdmin.from('about').update({ name: about.name, age: about.age, bio: about.bio }).eq('id', about.id),
            supabaseAdmin.from('connect').update({ github_username: connect.github_username, contributions: connect.contributions }).eq('id', connect.id),
            supabaseAdmin.from('contact').update({ email: contact.email, github_url: contact.github_url, linkedin_url: contact.linkedin_url, twitter_url: contact.twitter_url, instagram_url: contact.instagram_url }).eq('id', contact.id),
            supabaseAdmin.from('footer').update({ copyright: footer.copyright, message: footer.message }).eq('id', footer.id),
        ]);

        for (const item of skills) {
            if (item.id) {
                await supabaseAdmin.from('skills').update({ name: item.name, sort_order: item.sort_order }).eq('id', item.id);
            }
        }

        for (const item of timeline) {
            if (item.id) {
                await supabaseAdmin.from('timeline').update({ year: item.year, title: item.title, description: item.description, sort_order: item.sort_order }).eq('id', item.id);
            }
        }

        for (const item of projects) {
            if (item.id) {
                const techArray = item.techInput ? item.techInput.split(',').map(s => s.trim()).filter(Boolean) : item.tech;
                await supabaseAdmin.from('projects').update({ name: item.name, description: item.description, tech: techArray, github_url: item.github_url, live_url: item.live_url, image_url: item.image_url || '', sort_order: item.sort_order }).eq('id', item.id);
            }
        }

        setLoading(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const addSkill = async () => {
        const { data } = await supabaseAdmin.from('skills').insert({ name: 'New Skill', sort_order: skills.length }).select().single();
        if (data) setSkills([...skills, data]);
    };

    const deleteSkill = async (id: string) => {
        await supabaseAdmin.from('skills').delete().eq('id', id);
        setSkills(skills.filter(s => s.id !== id));
    };

    const addTimelineItem = async () => {
        const { data } = await supabaseAdmin.from('timeline').insert({ year: '', title: '', description: '', sort_order: timeline.length }).select().single();
        if (data) setTimeline([...timeline, data]);
    };

    const deleteTimelineItem = async (id: string) => {
        await supabaseAdmin.from('timeline').delete().eq('id', id);
        setTimeline(timeline.filter(t => t.id !== id));
    };

    const addProject = async () => {
        const { data } = await supabaseAdmin.from('projects').insert({ name: '', description: '', tech: [], github_url: '#', live_url: '#', image_url: '', sort_order: projects.length }).select().single();
        if (data) setProjects([...projects, { ...data, techInput: '' }]);
    };

    const deleteProject = async (id: string) => {
        await supabaseAdmin.from('projects').delete().eq('id', id);
        setProjects(projects.filter(p => p.id !== id));
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0f0f17] flex items-center justify-center px-5">
                <form onSubmit={handleLogin} className="bg-[#1a1a2e] border border-white/10 rounded-xl p-8 w-full max-w-sm">
                    <h1 className="text-2xl font-bold font-mono text-center mb-6 text-white">
                        <span className="text-purple-400">&lt;</span> Admin <span className="text-purple-400">/&gt;</span>
                    </h1>
                    <input
                        type="password"
                        value={keyInput}
                        onChange={(e) => setKeyInput(e.target.value)}
                        placeholder="Enter secret key..."
                        className="w-full px-4 py-3 bg-[#0f0f17] border border-white/10 rounded-lg text-white font-mono mb-4 focus:outline-none focus:border-purple-400"
                    />
                    {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
                    <button type="submit" className="w-full py-3 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 font-mono hover:bg-purple-500/30 transition-colors">
                        Login
                    </button>
                </form>
            </div>
        );
    }

    const tabs = ['about', 'skills', 'timeline', 'projects', 'connect', 'contact', 'footer'];

    return (
        <div className="min-h-screen bg-[#0f0f17] text-white">
            <div className="bg-[#1a1a2e] border-b border-white/10 px-5 py-4">
                <div className="max-w-4xl mx-auto flex flex-wrap justify-between items-center gap-4">
                    <h1 className="text-xl font-bold font-mono">
                        <span className="text-purple-400">&lt;</span> Admin Panel <span className="text-purple-400">/&gt;</span>
                    </h1>
                    <div className="flex gap-3">
                        <button onClick={handleSave} disabled={loading} className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 font-mono text-sm hover:bg-green-500/30 transition-colors disabled:opacity-50">
                            {loading ? 'Saving...' : saved ? '✓ Saved!' : 'Save Changes'}
                        </button>
                        <button onClick={handleLogout} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 font-mono text-sm hover:bg-white/10 transition-colors">
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-5 py-8">
                <div className="flex flex-wrap gap-2 mb-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-lg font-mono text-sm capitalize transition-colors ${activeTab === tab ? 'bg-purple-500/20 border border-purple-500/30 text-purple-400' : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="bg-[#1a1a2e] border border-white/10 rounded-xl p-6">

                    {activeTab === 'about' && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold font-mono mb-4">About Me</h2>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Name</label>
                                <input type="text" value={about.name} onChange={(e) => setAbout({ ...about, name: e.target.value })} className="w-full px-4 py-3 bg-[#0f0f17] border border-white/10 rounded-lg text-white font-mono focus:outline-none focus:border-purple-400" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Age</label>
                                <input type="text" value={about.age} onChange={(e) => setAbout({ ...about, age: e.target.value })} className="w-full px-4 py-3 bg-[#0f0f17] border border-white/10 rounded-lg text-white font-mono focus:outline-none focus:border-purple-400" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Bio</label>
                                <textarea value={about.bio} onChange={(e) => setAbout({ ...about, bio: e.target.value })} rows={3} className="w-full px-4 py-3 bg-[#0f0f17] border border-white/10 rounded-lg text-white font-mono focus:outline-none focus:border-purple-400 resize-none" />
                            </div>
                        </div>
                    )}


                    {activeTab === 'skills' && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold font-mono mb-4">Skills</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {skills.map((skill, index) => (
                                    <div key={skill.id} className="flex items-center gap-2 bg-[#0f0f17] border border-white/10 rounded-lg p-3">
                                        <input
                                            type="text"
                                            value={skill.name}
                                            onChange={(e) => { const s = [...skills]; s[index].name = e.target.value; setSkills(s); }}
                                            className="flex-1 bg-transparent text-white font-mono text-sm focus:outline-none"
                                        />
                                        <button onClick={() => deleteSkill(skill.id)} className="text-red-400 hover:text-red-300 text-lg">×</button>
                                    </div>
                                ))}
                            </div>
                            <button onClick={addSkill} className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 font-mono text-sm">+ Add Skill</button>
                        </div>
                    )}


                    {activeTab === 'timeline' && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold font-mono mb-4">Timeline / Journey</h2>
                            {timeline.map((item, index) => (
                                <div key={item.id} className="bg-[#0f0f17] border border-white/10 rounded-lg p-4 space-y-3">
                                    <div className="flex gap-4">
                                        <input type="text" value={item.year} onChange={(e) => { const t = [...timeline]; t[index].year = e.target.value; setTimeline(t); }} placeholder="Year" className="w-20 px-3 py-2 bg-[#1a1a2e] border border-white/10 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-purple-400" />
                                        <input type="text" value={item.title} onChange={(e) => { const t = [...timeline]; t[index].title = e.target.value; setTimeline(t); }} placeholder="Title" className="flex-1 px-3 py-2 bg-[#1a1a2e] border border-white/10 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-purple-400" />
                                    </div>
                                    <input type="text" value={item.description} onChange={(e) => { const t = [...timeline]; t[index].description = e.target.value; setTimeline(t); }} placeholder="Description" className="w-full px-3 py-2 bg-[#1a1a2e] border border-white/10 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-purple-400" />
                                    <button onClick={() => deleteTimelineItem(item.id)} className="text-red-400 text-sm hover:text-red-300">Remove</button>
                                </div>
                            ))}
                            <button onClick={addTimelineItem} className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 font-mono text-sm">+ Add Entry</button>
                        </div>
                    )}


                    {activeTab === 'projects' && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold font-mono mb-4">Projects</h2>
                            {projects.map((project, index) => (
                                <div key={project.id} className="bg-[#0f0f17] border border-white/10 rounded-lg p-4 space-y-3">
                                    <input type="text" value={project.name} onChange={(e) => { const p = [...projects]; p[index].name = e.target.value; setProjects(p); }} placeholder="Project Name" className="w-full px-3 py-2 bg-[#1a1a2e] border border-white/10 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-purple-400" />
                                    <textarea value={project.description} onChange={(e) => { const p = [...projects]; p[index].description = e.target.value; setProjects(p); }} placeholder="Description" rows={2} className="w-full px-3 py-2 bg-[#1a1a2e] border border-white/10 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-purple-400 resize-none" />
                                    <input type="text" value={project.techInput} onChange={(e) => { const p = [...projects]; p[index].techInput = e.target.value; setProjects(p); }} placeholder="Tech Stack (comma-separated, e.g: React, Node.js, Tailwind)" className="w-full px-3 py-2 bg-[#1a1a2e] border border-white/10 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-purple-400" />


                                    <div>
                                        <label className="block text-xs text-gray-500 mb-2">🖼️ Project Screenshot</label>
                                        <div className="flex gap-3 items-start">
                                            {project.image_url && (
                                                <img src={project.image_url} alt="Preview" className="w-24 h-16 object-cover rounded-lg border border-white/10" />
                                            )}
                                            <div className="flex-1">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    ref={(el) => { fileInputRefs.current[project.id] = el; }}
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) uploadImage(file, project.id, index);
                                                    }}
                                                    className="hidden"
                                                />
                                                <button
                                                    onClick={() => fileInputRefs.current[project.id]?.click()}
                                                    disabled={uploading === project.id}
                                                    className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 font-mono text-sm hover:bg-blue-500/30 transition-colors disabled:opacity-50"
                                                >
                                                    {uploading === project.id ? 'Uploading...' : project.image_url ? 'Change Image' : 'Upload Image'}
                                                </button>
                                                {project.image_url && (
                                                    <button
                                                        onClick={() => { const p = [...projects]; p[index].image_url = ''; setProjects(p); }}
                                                        className="ml-2 px-3 py-2 text-red-400 text-sm hover:text-red-300"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="block text-xs text-gray-500 mb-1">🔗 GitHub Repository URL</label>
                                            <input type="text" value={project.github_url} onChange={(e) => { const p = [...projects]; p[index].github_url = e.target.value; setProjects(p); }} placeholder="https://github.com/user/repo" className="w-full px-3 py-2 bg-[#1a1a2e] border border-white/10 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-purple-400" />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-xs text-gray-500 mb-1">🌐 Live Project URL</label>
                                            <input type="text" value={project.live_url} onChange={(e) => { const p = [...projects]; p[index].live_url = e.target.value; setProjects(p); }} placeholder="https://myproject.com" className="w-full px-3 py-2 bg-[#1a1a2e] border border-white/10 rounded-lg text-white font-mono text-sm focus:outline-none focus:border-purple-400" />
                                        </div>
                                    </div>
                                    <button onClick={() => deleteProject(project.id)} className="text-red-400 text-sm hover:text-red-300">Remove Project</button>
                                </div>
                            ))}
                            <button onClick={addProject} className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 font-mono text-sm">+ Add Project</button>
                        </div>
                    )}


                    {activeTab === 'connect' && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold font-mono mb-4">GitHub Connect</h2>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">GitHub Username</label>
                                <input type="text" value={connect.github_username} onChange={(e) => setConnect({ ...connect, github_username: e.target.value })} className="w-full px-4 py-3 bg-[#0f0f17] border border-white/10 rounded-lg text-white font-mono focus:outline-none focus:border-purple-400" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Total Contributions</label>
                                <input type="text" value={connect.contributions} onChange={(e) => setConnect({ ...connect, contributions: e.target.value })} className="w-full px-4 py-3 bg-[#0f0f17] border border-white/10 rounded-lg text-white font-mono focus:outline-none focus:border-purple-400" />
                            </div>
                        </div>
                    )}


                    {activeTab === 'contact' && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold font-mono mb-4">Contact Info</h2>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Email</label>
                                <input type="text" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className="w-full px-4 py-3 bg-[#0f0f17] border border-white/10 rounded-lg text-white font-mono focus:outline-none focus:border-purple-400" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">GitHub URL</label>
                                <input type="text" value={contact.github_url} onChange={(e) => setContact({ ...contact, github_url: e.target.value })} className="w-full px-4 py-3 bg-[#0f0f17] border border-white/10 rounded-lg text-white font-mono focus:outline-none focus:border-purple-400" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">LinkedIn URL</label>
                                <input type="text" value={contact.linkedin_url} onChange={(e) => setContact({ ...contact, linkedin_url: e.target.value })} className="w-full px-4 py-3 bg-[#0f0f17] border border-white/10 rounded-lg text-white font-mono focus:outline-none focus:border-purple-400" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">X (Twitter) URL</label>
                                <input type="text" value={contact.twitter_url} onChange={(e) => setContact({ ...contact, twitter_url: e.target.value })} className="w-full px-4 py-3 bg-[#0f0f17] border border-white/10 rounded-lg text-white font-mono focus:outline-none focus:border-purple-400" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Instagram URL</label>
                                <input type="text" value={contact.instagram_url} onChange={(e) => setContact({ ...contact, instagram_url: e.target.value })} className="w-full px-4 py-3 bg-[#0f0f17] border border-white/10 rounded-lg text-white font-mono focus:outline-none focus:border-purple-400" />
                            </div>
                        </div>
                    )}


                    {activeTab === 'footer' && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold font-mono mb-4">Footer</h2>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Copyright Text</label>
                                <input type="text" value={footer.copyright} onChange={(e) => setFooter({ ...footer, copyright: e.target.value })} className="w-full px-4 py-3 bg-[#0f0f17] border border-white/10 rounded-lg text-white font-mono focus:outline-none focus:border-purple-400" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Message</label>
                                <input type="text" value={footer.message} onChange={(e) => setFooter({ ...footer, message: e.target.value })} className="w-full px-4 py-3 bg-[#0f0f17] border border-white/10 rounded-lg text-white font-mono focus:outline-none focus:border-purple-400" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
