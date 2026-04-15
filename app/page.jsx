"use client";
import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { LogIn, Shield, Zap, Settings, MessageSquare, ArrowLeft, LogOut, LayoutDashboard } from 'lucide-react';

export default function StareonProDashboard() {
    const { data: session, status } = useSession();
    const [selectedServer, setSelectedServer] = useState(null);

    // Daftar server (Ini tampilan visual, nanti bisa disinkronkan dengan database/bot)
    const servers = [
        { id: '1', name: 'Stareon Official', icon: '🌟', members: '1.2k', role: 'Owner' },
    ];

    // Tampilan saat web sedang mengecek status login ke Discord
    if (status === "loading") return (
        <div className="loading-screen">
            <div className="spinner"></div> Menghubungkan ke Stareon...
        </div>
    );

    // --- VIEW 1: LANDING PAGE (Halaman awal jika belum login) ---
    if (!session) return (
        <div className="full-screen landing-bg">
            <div className="hero-content">
                <div className="logo-glow">🌟</div>
                <h1 className="title-premium">STAREON <span className="text-gradient">OFFICIAL</span></h1>
                <p className="subtitle">Panel Kontrol Eksklusif untuk Komunitas Stareon.</p>
                <button onClick={() => signIn('discord')} className="btn-login-discord">
                    <LogIn size={20} /> Login with Discord
                </button>
            </div>
            {/* CSS Global ada di bagian bawah */}
        </div>
    );

    // --- VIEW 2: SERVER SELECTOR (Jika sudah login, menampilkan profil aslimu) ---
    if (!selectedServer) return (
        <div className="full-screen main-bg">
            <div className="p-20">
                <div className="profile-header">
                    <div className="user-info">
                        <img src={session.user.image} alt="Avatar" className="user-avatar" />
                        <div>
                            <p className="welcome-text">Selamat datang,</p>
                            <p className="username-text">{session.user.name}</p>
                        </div>
                    </div>
                    <button className="icon-btn-logout" onClick={() => signOut()}><LogOut size={20}/></button>
                </div>

                <h2 className="section-title-main">Pilih Server</h2>
                <div className="server-grid">
                    {servers.map(srv => (
                        <div key={srv.id} className="server-card" onClick={() => setSelectedServer(srv)}>
                            <div className="server-icon-box">{srv.icon}</div>
                            <div className="server-details">
                                <h3>{srv.name}</h3>
                                <p>{srv.role}</p>
                            </div>
                            <div className="arrow-go">→</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // --- VIEW 3: DASHBOARD UTAMA (Panel pengaturan server) ---
    return (
        <div className="full-screen dashboard-layout">
            <div className="sidebar">
                <div className="sidebar-top">
                    <button className="back-btn" onClick={() => setSelectedServer(null)}><ArrowLeft size={20}/></button>
                    <div className="mini-server-info">
                        <div className="mini-icon">{selectedServer.icon}</div>
                        <span>{selectedServer.name}</span>
                    </div>
                </div>
                <nav className="nav-list">
                    <div className="nav-item active"><LayoutDashboard size={18}/> Overview</div>
                    <div className="nav-item"><MessageSquare size={18}/> Welcome</div>
                    <div className="nav-item"><Shield size={18}/> Moderasi</div>
                    <div className="nav-item"><Zap size={18}/> Ekonomi</div>
                </nav>
            </div>

            <div className="content-area">
                <div className="glass-card">
                    <h2 className="card-title" style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: '#38bdf8'}}>
                        <Settings size={20}/> Pengaturan Dasar
                    </h2>
                    <div className="input-group">
                        <label style={{fontSize: '0.8rem', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase'}}>Pesan Selamat Datang</label>
                        <textarea className="modern-input" rows="3" placeholder="Contoh: Halo {user}, selamat datang di server!" />
                    </div>
                    <div className="input-group" style={{marginTop: '15px'}}>
                        <label style={{fontSize: '0.8rem', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase'}}>Hadiah Daily (Credix)</label>
                        <input type="number" className="modern-input" placeholder="100" />
                    </div>
                    <button className="btn-save-pro">SIMPAN PERUBAHAN</button>
                </div>
            </div>

            <style>{`
                /* GLOBAL RESET UNTUK FULL SCREEN TOTAL */
                html, body { margin: 0; padding: 0; width: 100vw; height: 100vh; overflow: hidden; font-family: 'Inter', sans-serif; background: #020617; color: white; -webkit-font-smoothing: antialiased; }
                * { box-sizing: border-box; }
                
                .full-screen { width: 100vw; height: 100dvh; display: flex; flex-direction: column; overflow-x: hidden; position: relative; background: #020617; }
                
                /* LOADING SCREEN */
                .loading-screen { width: 100vw; height: 100dvh; display: flex; align-items: center; justify-content: center; background: #020617; color: #38bdf8; font-weight: bold; gap: 15px; }
                .spinner { width: 25px; height: 25px; border: 3px solid rgba(56, 189, 248, 0.3); border-top-color: #38bdf8; border-radius: 50%; animation: spin 1s linear infinite; }
                @keyframes spin { to { transform: rotate(360deg); } }

                /* LANDING PAGE */
                .landing-bg { align-items: center; justify-content: center; background: radial-gradient(circle at top right, #1e1b4b, #020617); }
                .hero-content { text-align: center; padding: 40px; animation: fadeIn 0.8s ease; }
                .logo-glow { font-size: 80px; filter: drop-shadow(0 0 20px #38bdf8); margin-bottom: 20px; }
                .title-premium { font-size: 2.5rem; font-weight: 900; line-height: 1.1; margin: 0; }
                .text-gradient { background: linear-gradient(to right, #38bdf8, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .subtitle { color: #94a3b8; margin-top: 15px; font-size: 1rem; }
                .btn-login-discord { margin: 30px auto 0; padding: 15px 30px; border-radius: 12px; background: #5865F2; border: none; color: white; font-weight: bold; display: flex; align-items: center; gap: 10px; cursor: pointer; transition: 0.3s; box-shadow: 0 10px 25px rgba(88, 101, 242, 0.3); }
                .btn-login-discord:active { transform: scale(0.95); }

                /* PROFILE & SELECTOR (Menu Pilih Server) */
                .main-bg { background: #020617; overflow-y: auto; }
                .p-20 { padding: 20px; max-width: 600px; margin: 0 auto; width: 100%; }
                .profile-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; background: rgba(15, 23, 42, 0.8); padding: 15px 20px; border-radius: 20px; border: 1px solid #1e293b; backdrop-filter: blur(10px); }
                .user-info { display: flex; align-items: center; gap: 15px; }
                .user-avatar { width: 50px; height: 50px; border-radius: 50%; border: 2px solid #38bdf8; }
                .username-text { font-weight: bold; font-size: 1.1rem; margin: 0; }
                .welcome-text { font-size: 0.8rem; color: #94a3b8; margin: 0 0 2px 0; }
                .icon-btn-logout { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #ef4444; padding: 10px; border-radius: 12px; cursor: pointer; transition: 0.2s; display: flex; align-items: center; justify-content: center; }
                .icon-btn-logout:active { background: #ef4444; color: white; }

                .section-title-main { font-size: 1.5rem; margin-bottom: 20px; font-weight: 800; color: white; }
                .server-grid { display: flex; flex-direction: column; gap: 15px; padding-bottom: 40px; }
                .server-card { background: #0f172a; border: 1px solid #1e293b; padding: 20px; border-radius: 20px; display: flex; align-items: center; gap: 15px; cursor: pointer; transition: 0.2s; }
                .server-card:active { transform: scale(0.97); background: #1e293b; border-color: #38bdf8; }
                .server-icon-box { width: 60px; height: 60px; background: #1e293b; border-radius: 15px; display: flex; align-items: center; justify-content: center; font-size: 30px; }
                .server-details h3 { font-size: 1.1rem; margin: 0 0 5px 0; }
                .server-details p { font-size: 0.85rem; color: #94a3b8; margin: 0; }
                .arrow-go { margin-left: auto; color: #38bdf8; font-weight: bold; font-size: 1.2rem; }

                /* DASHBOARD LAYOUT */
                .dashboard-layout { display: flex; flex-direction: column; height: 100dvh; background: #020617; }
                @media (min-width: 768px) { .dashboard-layout { flex-direction: row; } }
                
                .sidebar { width: 100%; background: #0f172a; padding: 20px; border-bottom: 1px solid #1e293b; }
                @media (min-width: 768px) { .sidebar { width: 280px; height: 100vh; border-right: 1px solid #1e293b; border-bottom: none; } }
                
                .sidebar-top { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }
                .back-btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; width: 40px; height: 40px; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
                .back-btn:active { background: #1e293b; }
                .mini-server-info { display: flex; align-items: center; gap: 10px; font-weight: bold; font-size: 1.1rem; }
                .mini-icon { background: #1e293b; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 8px; font-size: 16px; }
                
                .nav-list { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 5px; }
                .nav-list::-webkit-scrollbar { display: none; }
                @media (min-width: 768px) { .nav-list { flex-direction: column; overflow-x: hidden; } }
                
                .nav-item { padding: 12px 15px; border-radius: 12px; white-space: nowrap; color: #94a3b8; font-size: 0.95rem; display: flex; align-items: center; gap: 10px; cursor: pointer; transition: 0.2s; }
                .nav-item.active { background: #1e293b; color: #38bdf8; font-weight: bold; }

                .content-area { padding: 20px; flex: 1; overflow-y: auto; }
                .glass-card { background: #0f172a; border: 1px solid #1e293b; padding: 25px; border-radius: 24px; max-width: 700px; margin: 0 auto; animation: slideUp 0.5s ease; }
                .modern-input { width: 100%; background: #020617; border: 1px solid #1e293b; padding: 15px; border-radius: 12px; color: white; margin-top: 8px; font-family: inherit; font-size: 0.95rem; transition: 0.3s; }
                .modern-input:focus { outline: none; border-color: #38bdf8; box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1); }
                .btn-save-pro { width: 100%; background: #38bdf8; color: #020617; border: none; padding: 16px; border-radius: 14px; font-weight: 900; letter-spacing: 0.5px; margin-top: 25px; cursor: pointer; transition: 0.2s; }
                .btn-save-pro:active { transform: scale(0.98); background: #7dd3fc; }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            `}</style>
        </div>
    );
}
