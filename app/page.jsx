"use client";
import { useState } from 'react';
import { LogIn, Server, Shield, Zap, Settings, MessageSquare, Bell, LogOut } from 'lucide-react';

export default function StareonProDashboard() {
    const [view, setView] = useState('landing'); 
    const [selectedServer, setSelectedServer] = useState(null);

    // Data dummy untuk simulasi (Nanti otomatis terisi saat login)
    const servers = [
        { id: '1', name: 'Stareon Official', icon: '🌟', members: '1.2k', role: 'Owner' },
        { id: '2', name: 'Minecraft Builder Community', icon: '🏗️', members: '850', role: 'Admin' }
    ];

    if (view === 'landing') return (
        <div className="full-page landing-bg">
            <div className="hero-content">
                <div className="logo-glow">🌟</div>
                <h1 className="title-premium">STAREON <span className="text-gradient">OFFICIAL</span></h1>
                <p className="subtitle">Kelola komunitasmu dengan dashboard yang lebih hebat dari Koya.</p>
                <button onClick={() => setView('selector')} className="btn-login-discord">
                    <LogIn size={20} /> Login with Discord
                </button>
            </div>
        </div>
    );

    if (view === 'selector') return (
        <div className="full-page main-bg">
            <div className="p-20">
                <h2 className="text-center mb-40 font-bold text-2xl">Pilih Server Kamu</h2>
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
                <center><button className="btn-logout" onClick={() => setView('landing')}>Logout</button></center>
            </div>
        </div>
    );

    return (
        <div className="full-page dashboard-layout">
            <div className="sidebar">
                <div className="sidebar-header">
                    <div className="mini-icon">{selectedServer.icon}</div>
                    <span className="font-bold">{selectedServer.name}</span>
                </div>
                <nav className="nav-menu">
                    <div className="nav-item active"><Settings size={18}/> Dashboard</div>
                    <div className="nav-item"><MessageSquare size={18}/> Pesan Welcome</div>
                    <div className="nav-item"><Shield size={18}/> Keamanan</div>
                    <div className="nav-item"><Zap size={18}/> Ekonomi Bot</div>
                </nav>
                <button className="btn-back-side" onClick={() => setView('selector')}>Ganti Server</button>
            </div>

            <div className="content-area">
                <div className="glass-card">
                    <h2 className="section-title"><Settings size={20} color="#38bdf8"/> Pengaturan Umum</h2>
                    <p className="text-sm opacity-60 mb-4">Konfigurasi dasar untuk server {selectedServer.name}</p>
                    
                    <div className="input-group">
                        <label className="text-xs font-bold uppercase tracking-wider">Pesan Selamat Datang</label>
                        <textarea className="input-premium" rows="3" placeholder="Contoh: Halo {user}, selamat datang di Stareon!" />
                    </div>

                    <div className="toggle-list">
                        <div className="toggle-item">
                            <div>
                                <p className="font-bold">Anti-Link</p>
                                <p className="text-xs opacity-50">Hapus otomatis link yang dikirim member.</p>
                            </div>
                            <input type="checkbox" className="apple-switch" />
                        </div>
                        <div className="toggle-item">
                            <div>
                                <p className="font-bold">Sistem Leveling</p>
                                <p className="text-xs opacity-50">Berikan XP setiap member chat.</p>
                            </div>
                            <input type="checkbox" className="apple-switch" defaultChecked />
                        </div>
                    </div>

                    <button className="btn-save-floating">SIMPAN PERUBAHAN</button>
                </div>
            </div>

            <style>{`
                .full-page { min-height: 100vh; width: 100vw; background: #020617; color: white; font-family: 'Inter', sans-serif; overflow-x: hidden; }
                .landing-bg { display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at top right, #1e1b4b, #020617); }
                .hero-content { text-align: center; padding: 20px; animation: fadeIn 0.8s ease; }
                .logo-glow { font-size: 80px; filter: drop-shadow(0 0 20px #38bdf8); margin-bottom: 20px; }
                .title-premium { font-size: 2.5rem; font-weight: 900; }
                .text-gradient { background: linear-gradient(to right, #38bdf8, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .btn-login-discord { margin: 30px auto; padding: 15px 30px; border-radius: 12px; background: #5865F2; border: none; color: white; font-weight: bold; display: flex; align-items: center; gap: 10px; cursor: pointer; transition: 0.3s; }
                
                .server-grid { display: flex; flex-direction: column; gap: 15px; padding: 0 15px; max-width: 500px; margin: 0 auto; }
                .server-card { background: #0f172a; border: 1px solid #1e293b; padding: 15px; border-radius: 16px; display: flex; align-items: center; gap: 15px; transition: 0.2s; }
                .server-card:active { transform: scale(0.95); background: #1e293b; }
                .server-icon-large { width: 50px; height: 50px; background: #1e293b; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
                
                .dashboard-layout { display: flex; flex-direction: column; }
                @media (min-width: 768px) { .dashboard-layout { flex-direction: row; } }
                .sidebar { width: 100%; background: #0f172a; padding: 20px; border-bottom: 1px solid #1e293b; }
                @media (min-width: 768px) { .sidebar { width: 260px; height: 100vh; border-right: 1px solid #1e293b; } }
                
                .nav-menu { margin-top: 20px; }
                .nav-item { padding: 12px; border-radius: 10px; margin-bottom: 5px; display: flex; align-items: center; gap: 10px; cursor: pointer; color: #94a3b8; }
                .nav-item.active { background: #1e293b; color: #38bdf8; }
                
                .content-area { flex: 1; padding: 20px; }
                .glass-card { background: #0f172a; border: 1px solid #1e293b; border-radius: 20px; padding: 20px; animation: slideUp 0.5s ease; }
                .input-premium { width: 100%; background: #020617; border: 1px solid #1e293b; border-radius: 10px; color: white; padding: 12px; margin-top: 8px; }
                
                .toggle-item { display: flex; justify-content: space-between; align-items: center; padding: 15px 0; border-bottom: 1px solid #1e293b; }
                .btn-save-floating { width: 100%; margin-top: 20px; padding: 15px; border-radius: 12px; background: #38bdf8; color: #020617; font-weight: bold; border: none; }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            `}</style>
        </div>
    );
}
