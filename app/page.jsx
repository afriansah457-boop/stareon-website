"use client";
import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
// Pastikan tidak ada ikon yang terhapus di baris ini
import { LogIn, Shield, Zap, Settings, MessageSquare, ArrowLeft, LogOut, LayoutDashboard } from 'lucide-react';

export default function StareonProDashboard() {
    const { data: session, status } = useSession();
    const [selectedServer, setSelectedServer] = useState(null);

    const servers = [
        { id: '1', name: 'Stareon Official', icon: '🌟', members: '1.2k', role: 'Owner' },
    ];

    if (status === "loading") {
        return (
            <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617', color: '#38bdf8' }}>
                Memuat data...
            </div>
        );
    }

    if (!session) {
        return (
            <div className="full-screen landing-bg">
                <div className="hero-content">
                    <div className="logo-glow">🌟</div>
                    <h1 className="title-premium">STAREON <span className="text-gradient">OFFICIAL</span></h1>
                    <p className="subtitle">Panel Kontrol Eksklusif untuk Komunitas Stareon.</p>
                    <button onClick={() => signIn('discord')} className="btn-login-discord">
                        <LogIn size={20} style={{ marginRight: '10px' }}/> Login with Discord
                    </button>
                </div>
                <style jsx global>{`
                    body { margin: 0; padding: 0; background: #020617; color: white; font-family: sans-serif; overflow: hidden; }
                    .full-screen { width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at top right, #1e1b4b, #020617); }
                    .hero-content { text-align: center; }
                    .logo-glow { font-size: 80px; text-shadow: 0 0 20px #38bdf8; margin-bottom: 20px; }
                    .title-premium { font-size: 2.5rem; font-weight: 900; margin: 0; }
                    .text-gradient { color: #38bdf8; }
                    .subtitle { color: #94a3b8; margin-top: 10px; }
                    .btn-login-discord { margin-top: 30px; padding: 15px 30px; border-radius: 12px; background: #5865F2; border: none; color: white; font-weight: bold; cursor: pointer; display: inline-flex; align-items: center; }
                `}</style>
            </div>
        );
    }

    if (!selectedServer) {
        return (
            <div className="full-screen main-bg">
                <div className="p-20">
                    <div className="profile-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <img src={session.user.image} alt="Avatar" className="user-avatar" />
                            <div>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>Selamat datang,</p>
                                <p style={{ margin: 0, fontWeight: 'bold' }}>{session.user.name}</p>
                            </div>
                        </div>
                        <button className="icon-btn-logout" onClick={() => signOut({ callbackUrl: '/' })}><LogOut size={20}/></button>
                    </div>

                    <h2 style={{ marginBottom: '20px' }}>Pilih Server</h2>
                    <div className="server-grid">
                        {servers.map(srv => (
                            <div key={srv.id} className="server-card" onClick={() => setSelectedServer(srv)}>
                                <div className="server-icon-box">{srv.icon}</div>
                                <div>
                                    <h3 style={{ margin: '0 0 5px 0' }}>{srv.name}</h3>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>{srv.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <style jsx>{`
                    .full-screen { width: 100vw; height: 100vh; background: #020617; overflow-y: auto; color: white; }
                    .p-20 { padding: 20px; max-width: 600px; margin: 0 auto; width: 100%; box-sizing: border-box; }
                    .profile-header { display: flex; justify-content: space-between; align-items: center; background: #0f172a; padding: 15px; border-radius: 15px; margin-bottom: 30px; border: 1px solid #1e293b; }
                    .user-avatar { width: 50px; height: 50px; border-radius: 50%; border: 2px solid #38bdf8; }
                    .icon-btn-logout { background: transparent; border: none; color: #ef4444; cursor: pointer; padding: 10px; }
                    .server-card { background: #0f172a; border: 1px solid #1e293b; padding: 15px; border-radius: 15px; display: flex; align-items: center; gap: 15px; cursor: pointer; margin-bottom: 15px; }
                    .server-icon-box { width: 50px; height: 50px; background: #1e293b; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; }
                `}</style>
            </div>
        );
    }

    return (
        <div className="full-screen dashboard-layout">
            <div className="sidebar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                    <button onClick={() => setSelectedServer(null)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}><ArrowLeft size={20}/></button>
                    <span style={{ fontWeight: 'bold' }}>{selectedServer.name}</span>
                </div>
                <div className="nav-list">
                    <div className="nav-item active"><LayoutDashboard size={18} style={{marginRight: '10px'}}/> Overview</div>
                    <div className="nav-item"><Settings size={18} style={{marginRight: '10px'}}/> Pengaturan</div>
                </div>
            </div>

            <div className="content-area">
                <div className="glass-card">
                    <h2 style={{ margin: '0 0 20px 0', color: '#38bdf8' }}>Pengaturan Dasar</h2>
                    <textarea style={{ width: '100%', background: '#020617', border: '1px solid #1e293b', padding: '15px', borderRadius: '10px', color: 'white', boxSizing: 'border-box' }} rows="3" placeholder="Pesan Selamat Datang..." />
                    <button style={{ width: '100%', background: '#38bdf8', color: '#020617', border: 'none', padding: '15px', borderRadius: '10px', fontWeight: 'bold', marginTop: '20px' }}>SIMPAN PERUBAHAN</button>
                </div>
            </div>
            <style jsx>{`
                .full-screen { width: 100vw; height: 100vh; background: #020617; color: white; display: flex; flex-direction: column; overflow: hidden; }
                .sidebar { background: #0f172a; padding: 20px; border-bottom: 1px solid #1e293b; }
                .nav-list { display: flex; gap: 10px; overflow-x: auto; }
                .nav-item { padding: 10px 15px; border-radius: 10px; color: #94a3b8; display: flex; align-items: center; white-space: nowrap; }
                .nav-item.active { background: #1e293b; color: #38bdf8; }
                .content-area { padding: 20px; flex: 1; overflow-y: auto; }
                .glass-card { background: #0f172a; border: 1px solid #1e293b; padding: 20px; border-radius: 15px; max-width: 600px; margin: 0 auto; }
                @media (min-width: 768px) {
                    .full-screen { flex-direction: row; }
                    .sidebar { width: 250px; height: 100vh; border-bottom: none; border-right: 1px solid #1e293b; }
                    .nav-list { flex-direction: column; }
                }
            `}</style>
        </div>
    );
}
