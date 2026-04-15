"use client";
import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { LogIn, Shield, Zap, Settings, MessageSquare, Bell, ArrowLeft, LogOut, LayoutDashboard } from 'lucide-react';

export default function StareonProDashboard() {
    const { data: session, status } = useSession();
    const [selectedServer, setSelectedServer] = useState(null);

    // Daftar server (Nanti kita buat otomatis, sekarang buat tampilannya dulu)
    const servers = [
        { id: '1', name: 'Stareon Official', icon: '🌟', members: '1.2k', role: 'Owner' },
    ];

    // Tampilan saat Loading
    if (status === "loading") return <div className="loading-screen">Menghubungkan ke Discord...</div>;

    // --- VIEW 1: LANDING PAGE (Jika Belum Login) ---
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
        </div>
    );

    // --- VIEW 2: SERVER SELECTOR (Jika Sudah Login tapi belum pilih server) ---
    if (!selectedServer) return (
        <div className="full-screen main-bg">
            <div className="p-20">
                <div className="profile-header">
                    <div className="user-info">
                        <img src={session.user.image} alt="Avatar" className="user-avatar" />
                        <div>
                            <p className="welcome-text">Halo,</p>
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

    // --- VIEW 3: DASHBOARD UTAMA ---
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
                    <h2 className="card-title"><Settings size={18}/> Configuration</h2>
                    <div className="input-group">
                        <label>Pesan Selamat Datang</label>
                        <textarea className="modern-input" placeholder="Ketik pesan..." />
                    </div>
                    <button className="btn-save-pro">SIMPAN PERUBAHAN</button>
                </div>
            </div>

            <style>{`
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body, html { width: 100%; height: 100%; overflow: hidden; background: #020617; color: white; font-family: 'Inter', sans-serif; }
                
                .full-screen { width: 100vw; height: 100dvh; overflow-y: auto; position: relative; }
                .loading-screen { height: 100vh; display: flex; align-items: center; justify-content: center; background: #020617; color: #38bdf8; }

                /* Landing */
                .landing-bg { display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at top right, #1e1b4b, #020617); }
                .hero-content { text-align: center; padding: 20px; }
                .logo-glow { font-size: 70px; filter: drop-shadow(0 0 15px #38bdf8); margin-bottom: 10px; }
                .title-premium { font-size: 2.2rem; font-weight: 900; }
                .text-gradient { background: linear-gradient(to right, #38bdf8, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .btn-login-discord { margin: 30px auto; padding: 14px 25px; border-radius: 12px; background: #5865F2; border: none; color: white; font-weight: bold; display: flex; align-items: center; gap: 10px; cursor: pointer; }

                /* Profile & Server Selector */
                .p-20 { padding: 20px; }
                .profile-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; background: #0f172a; padding: 15px; border-radius: 20px; border: 1px solid #1e293b; }
                .user-info { display: flex; align-items: center; gap: 12px; }
                .user-avatar { width: 45px; height: 45px; border-radius: 50%; border: 2px solid #38bdf8; }
                .username-text { font-weight: bold; font-size: 1.1rem; }
                .welcome-text { font-size: 0.8rem; opacity: 0.6; }
                .icon-btn-logout { background: none; border: none; color: #ef4444; cursor: pointer; }

                .section-title-main { font-size: 1.5rem; margin-bottom: 20px; font-weight: 800; }
                .server-card { background: #0f172a; border: 1px solid #1e293b; padding: 18px; border-radius: 20px; display: flex; align-items: center; gap: 15px; margin-bottom: 15px; cursor: pointer; transition: 0.2s; }
                .server-card:active { transform: scale(0.96); background: #1e293b; }
                .server-icon-box { width: 55px; height: 55px; background: #1e293b; border-radius: 15px; display: flex; align-items: center; justify-content: center; font-size: 28px; }
                .server-details h3 { font-size: 1rem; }
                .server-details p { font-size: 0.8rem; opacity: 0.5; }
                .arrow-go { margin-left: auto; color: #38bdf8; font-weight: bold; }

                /* Dashboard */
                .dashboard-layout { display: flex; flex-direction: column; }
                @media (min-width: 768px) { .dashboard-layout { flex-direction: row; } }
                .sidebar { background: #0f172a; padding: 20px; border-bottom: 1px solid #1e293b; }
                .sidebar-top { display: flex; align-items: center; gap: 15px; }
                .back-btn { background: none; border: none; color: white; cursor: pointer; }
                .mini-server-info { display: flex; align-items: center; gap: 8px; font-weight: bold; }
                .nav-list { margin-top: 20px; display: flex; gap: 10px; overflow-x: auto; padding-bottom: 10px; }
                @media (min-width: 768px) { .nav-list { flex-direction: column; overflow-x: hidden; } }
                .nav-item { padding: 10px 15px; border-radius: 10px; white-space: nowrap; color: #94a3b8; font-size: 0.9rem; display: flex; align-items: center; gap: 8px; }
                .nav-item.active { background: #1e293b; color: #38bdf8; font-weight: bold; }

                .content-area { padding: 20px; flex: 1; }
                .glass-card { background: #0f172a; border: 1px solid #1e293b; padding: 20px; border-radius: 24px; }
                .modern-input { width: 100%; background: #020617; border: 1px solid #1e293b; padding: 12px; border-radius: 12px; color: white; margin-top: 10px; }
                .btn-save-pro { width: 100%; background: #38bdf8; color: #020617; border: none; padding: 15px; border-radius: 15px; font-weight: bold; margin-top: 20px; cursor: pointer; }
            `}</style>
        </div>
    );
    
}

  
