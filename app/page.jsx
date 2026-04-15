"use client";
import { useState } from 'react';
import { LogIn, Shield, Zap, Settings, MessageSquare, Bell, User, ArrowLeft, LogOut } from 'lucide-react';

export default function StareonProDashboard() {
    const [view, setView] = useState('landing'); 
    const [selectedServer, setSelectedServer] = useState(null);

    // Draf Profil Kamu (Nanti otomatis diisi NextAuth)
    const mockUser = {
        username: 'Marvel Stareon',
        avatar: 'https://i.pravatar.cc/150?u=marvelstareon' // Contoh avatar
    };

    // Draf Server Kamu (Nanti otomatis diisi NextAuth)
    const servers = [
        { id: '1', name: 'Stareon Official', icon: '🌟', members: '1.2k', role: 'Owner' },
        { id: '2', name: 'Minecraft Community Bedrock', icon: '🏗️', members: '850', role: 'Admin' }
    ];

    if (view === 'landing') return (
        <div className="full-screen landing-bg">
            <div className="hero-content">
                <div className="logo-glow">🌟</div>
                <h1 className="title-premium">STAREON <span className="text-gradient">OFFICIAL</span></h1>
                <p className="subtitle">Kelola komunitasmu dengan dashboard yang lebih hebat dan unik.</p>
                <button onClick={() => setView('selector')} className="btn-login-discord">
                    <LogIn size={20} /> Login with Discord
                </button>
            </div>
        </div>
    );

    if (view === 'selector') return (
        <div className="full-screen main-bg">
            <div className="container p-20">
                <div className="flex-between mb-40">
                    <h2 className="text-2xl font-bold">Pilih Server Kamu</h2>
                    <div className="profile-mini">
                        <img src={mockUser.avatar} alt="Profile" className="avatar-mini" />
                        <span>{mockUser.username}</span>
                    </div>
                </div>
                <div className="server-grid">
                    {servers.map(srv => (
                        <div key={srv.id} className="server-card" onClick={() => { setSelectedServer(srv); setView('dashboard'); }}>
                            <div className="server-icon-large">{srv.icon}</div>
                            <div className="server-info">
                                <h3 className="font-bold">{srv.name}</h3>
                                <p className="text-sm opacity-60">{srv.members} Members • {srv.role}</p>
                            </div>
                            <div className="btn-setup-arrow">→</div>
                        </div>
                    ))}
                </div>
                <center><button className="btn-logout" onClick={() => setView('landing')}><LogOut size={16}/> Logout</button></center>
            </div>
        </div>
    );

    return (
        <div className="full-screen dashboard-layout">
            <div className="sidebar">
                <div className="sidebar-header flex-between">
                    <div className="flex-center gap-10">
                        <div className="mini-icon">{selectedServer.icon}</div>
                        <span className="font-bold">{selectedServer.name}</span>
                    </div>
                    <button className="btn-back-side" onClick={() => setView('selector')}><ArrowLeft size={16}/></button>
                </div>
                <nav className="nav-menu">
                    <div className="nav-item active"><Settings size={18}/> Dashboard</div>
                    <div className="nav-item"><MessageSquare size={18}/> Pesan Welcome</div>
                    <div className="nav-item"><Shield size={18}/> Keamanan</div>
                    <div className="nav-item"><Zap size={18}/> Ekonomi Bot</div>
                </nav>
            </div>

            <div className="content-area">
                <div className="glass-card">
                    <h2 className="section-title"><Settings size={20} color="#38bdf8"/> Pengaturan Umum</h2>
                    
                    <div className="input-group">
                        <label className="text-xs font-bold uppercase tracking-wider">Pesan Selamat Datang</label>
                        <textarea className="input-premium" rows="3" placeholder="Halo {user}, selamat datang di Stareon!" />
                    </div>

                    <div className="toggle-list">
                        <div className="toggle-item">
                            <span>🛡️ Anti-Link System</span>
                            <input type="checkbox" className="apple-switch" />
                        </div>
                        <div className="toggle-item">
                            <span>🏆 Weekly Leaderboard</span>
                            <input type="checkbox" className="apple-switch" defaultChecked />
                        </div>
                    </div>

                    <button className="btn-save-floating">SIMPAN PERUBAHAN</button>
                </div>
            </div>

            <style>{`
                /* Global Reset untuk memastikan Full Screen */
                html, body { margin: 0; padding: 0; width: 100vw; height: 100vh; overflow: hidden; font-family: 'Inter', sans-serif; background: #020617; color: white; -webkit-font-smoothing: antialiased; }
                
                .full-screen { width: 100vw; height: 100dvh; display: flex; flex-direction: column; overflow-x: hidden; position: relative; }
                .landing-bg { align-items: center; justify-content: center; background: radial-gradient(circle at top right, #1e1b4b, #020617); }
                .main-bg { background: #020617; }
                
                .p-20 { padding: 20px; box-sizing: border-box; }
                .flex-between { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
                .flex-center { display: flex; align-items: center; gap: 5px; }
                .gap-10 { gap: 10px; }

                /* Landing Page */
                .hero-content { text-align: center; padding: 40px; animation: fadeIn 0.8s ease; }
                .logo-glow { font-size: 80px; filter: drop-shadow(0 0 20px #38bdf8); margin-bottom: 20px; }
                .title-premium { font-size: 2.5rem; font-weight: 900; line-height: 1.1; margin: 0; }
                .text-gradient { background: linear-gradient(to right, #38bdf8, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .subtitle { color: #94a3b8; margin-top: 15px; font-size: 1rem; }
                .btn-login-discord { margin: 30px auto; padding: 15px 30px; border-radius: 12px; background: #5865F2; border: none; color: white; font-weight: bold; display: flex; align-items: center; gap: 10px; cursor: pointer; transition: 0.3s; }

                /* Selector */
                .profile-mini { display: flex; align-items: center; gap: 10px; background: #0f172a; padding: 5px 15px 5px 5px; border-radius: 50px; border: 1px solid #1e293b; }
                .avatar-mini { width: 35px; height: 35px; border-radius: 50%; border: 2px solid #1e293b; }
                .server-grid { display: flex; flex-direction: column; gap: 15px; max-width: 500px; margin: 0 auto; padding-bottom: 40px; }
                .server-card { background: #0f172a; border: 1px solid #1e293b; padding: 15px; border-radius: 16px; display: flex; align-items: center; gap: 15px; transition: 0.2s; cursor: pointer; }
                .server-card:active { transform: scale(0.97); background: #1e293b; }
                .server-icon-large { width: 50px; height: 50px; background: #1e293b; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; border: 1px solid #1e293b; }
                .btn-logout { margin-top: 40px; display: flex; gap: 5px; align-items: center; background: none; color: #ef4444; border: 1px solid #ef4444; padding: 8px 15px; border-radius: 8px; font-size: 14px; cursor: pointer; }

                /* Dashboard */
                .dashboard-layout { display: flex; flex-direction: column; height: 100dvh; }
                @media (min-width: 768px) { .dashboard-layout { flex-direction: row; } }
                .sidebar { width: 100%; background: #0f172a; padding: 20px; border-bottom: 1px solid #1e293b; box-sizing: border-box; }
                @media (min-width: 768px) { .sidebar { width: 260px; height: 100vh; border-right: 1px solid #1e293b; } }
                .nav-menu { margin-top: 20px; }
                .nav-item { padding: 12px; border-radius: 10px; margin-bottom: 5px; display: flex; align-items: center; gap: 10px; cursor: pointer; color: #94a3b8; transition: 0.2s; }
                .nav-item.active { background: #1e293b; color: #38bdf8; font-weight: 500; }
                .content-area { flex: 1; padding: 20px; overflow-y: auto; background: #020617; }
                .glass-card { background: #0f172a; border: 1px solid #1e293b; border-radius: 20px; padding: 20px; animation: slideUp 0.5s ease; max-width: 600px; margin: 0 auto; }
                .input-premium { width: 100%; background: #020617; border: 1px solid #1e293b; border-radius: 10px; color: white; padding: 12px; margin-top: 8px; box-sizing: border-box; }
                .toggle-item { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid #1e293b; }
                .btn-save-floating { width: 100%; margin-top: 20px; padding: 15px; border-radius: 12px; background: #38bdf8; color: #020617; font-weight: bold; border: none; cursor: pointer; transition: 0.3s; }
                .btn-save-floating:active { transform: scale(0.98); background: #67e8f9; }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            `}</style>
        </div>
    );
}
