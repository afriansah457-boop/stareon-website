"use client";
import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { LogIn, Shield, Zap, Settings, MessageSquare, ArrowLeft, LogOut, LayoutDashboard, Ticket, Megaphone, PlusCircle } from 'lucide-react';

export default function StareonProDashboard() {
    const { data: session, status } = useSession();
    const [selectedServer, setSelectedServer] = useState(null);
    const [guilds, setGuilds] = useState([]);
    const [loadingGuilds, setLoadingGuilds] = useState(false);
    const [activeTab, setActiveTab] = useState('welcome');

    useEffect(() => {
        if (session?.accessToken) {
            setLoadingGuilds(true);
            fetch('https://discord.com/api/users/@me/guilds', {
                headers: { Authorization: `Bearer ${session.accessToken}` }
            })
            .then(res => res.json())
            .then(data => {
                const adminServers = data.filter(g => g.owner || (g.permissions & 0x8) === 0x8);
                setGuilds(adminServers);
                setLoadingGuilds(false);
            })
            .catch(() => setLoadingGuilds(false));
        }
    }, [session]);

    if (status === "loading") return <div className="loading-screen"><div className="spinner"></div> Menghubungkan...</div>;

    // --- VIEW 1: LANDING PAGE ---
    if (!session) return (
        <div className="full-screen landing-bg">
            <div className="hero-content">
                <div className="logo-glow">🌟</div>
                <h1 className="title-premium">STAREON <span className="text-gradient">OFFICIAL</span></h1>
                <p className="subtitle">Panel Kontrol Eksklusif untuk Komunitasmu.</p>
                <button onClick={() => signIn('discord')} className="btn-login-discord">
                    <LogIn size={20} style={{marginRight:'10px'}}/> Login with Discord
                </button>
            </div>
            <style jsx global>{`
                body { margin: 0; padding: 0; background: #020617; color: white; font-family: 'Inter', sans-serif; overflow: hidden; }
                .full-screen { width: 100vw; height: 100dvh; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at top right, #1e1b4b, #020617); }
                .hero-content { text-align: center; }
                .logo-glow { font-size: 80px; filter: drop-shadow(0 0 20px #38bdf8); margin-bottom: 20px; }
                .title-premium { font-size: 2.5rem; font-weight: 900; margin: 0; }
                .text-gradient { background: linear-gradient(to right, #38bdf8, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                .subtitle { color: #94a3b8; margin-top: 15px; }
                .btn-login-discord { margin-top: 30px; padding: 15px 30px; border-radius: 12px; background: #5865F2; border: none; color: white; font-weight: bold; cursor: pointer; display: inline-flex; align-items: center; transition: 0.3s; }
                .loading-screen { width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; background: #020617; color: #38bdf8; font-weight: bold; gap: 15px; }
                .spinner { width: 25px; height: 25px; border: 3px solid rgba(56, 189, 248, 0.3); border-top-color: #38bdf8; border-radius: 50%; animation: spin 1s linear infinite; }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );

    // --- VIEW 2: SERVER SELECTOR ---
    if (!selectedServer) return (
        <div className="full-screen main-bg" style={{ overflowY: 'auto' }}>
            <div className="p-20">
                <div className="profile-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <img src={session.user.image} alt="Avatar" className="user-avatar" />
                        <div>
                            <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>Halo,</p>
                            <p style={{ margin: 0, fontWeight: 'bold' }}>{session.user.name}</p>
                        </div>
                    </div>
                    <button className="icon-btn-logout" onClick={() => signOut({ callbackUrl: '/' })}><LogOut size={20}/></button>
                </div>

                <h2 style={{ marginBottom: '20px' }}>Server Kamu</h2>
                {loadingGuilds ? (
                    <div style={{ textAlign: 'center', color: '#38bdf8', marginTop: '50px' }}>Memuat daftar server...</div>
                ) : (
                    <div className="server-grid">
                        {guilds.length === 0 && <p style={{color: '#94a3b8'}}>Kamu belum menjadi Admin di server manapun.</p>}
                        {guilds.map(srv => {
                            // LOGIKA SAKTI: Cek Bot Join (Sementara diset false agar kamu bisa lihat tombol invite untuk ngetes)
                            // Nanti kalau API bot sudah jalan, variabel ini akan mengecek database otomatis.
                            const isBotJoined = false; 

                            const inviteLink = `https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || '1493195682834681937'}&permissions=8&scope=bot%20applications.commands`;
                            
                            return (
                                <div key={srv.id} className="server-card">
                                    <div className="server-icon-box">
                                        {srv.icon ? <img src={`https://cdn.discordapp.com/icons/${srv.id}/${srv.icon}.png`} width="60" style={{borderRadius: '12px'}}/> : '🌟'}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ margin: '0 0 5px 0', fontSize: '1rem' }}>{srv.name}</h3>
                                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>{srv.owner ? '👑 Owner' : '🛡️ Admin'}</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {/* Manage sengaja dimunculkan terus untuk kebutuhan test UI dashboard */}
                                        <button onClick={() => setSelectedServer(srv)} className="btn-manage">Manage</button>
                                        
                                        {/* Invite hanya muncul jika bot belum join */}
                                        {!isBotJoined && (
                                            <a href={inviteLink} target="_blank" className="btn-invite"><PlusCircle size={14} style={{marginRight: '5px'}}/> Invite Bot</a>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <style jsx>{`
                .full-screen { width: 100vw; height: 100vh; background: #020617; color: white; }
                .p-20 { padding: 20px; max-width: 600px; margin: 0 auto; width: 100%; box-sizing: border-box; }
                .profile-header { display: flex; justify-content: space-between; align-items: center; background: #0f172a; padding: 15px; border-radius: 15px; margin-bottom: 30px; border: 1px solid #1e293b; }
                .user-avatar { width: 50px; height: 50px; border-radius: 50%; border: 2px solid #38bdf8; }
                .icon-btn-logout { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #ef4444; padding: 10px; border-radius: 12px; cursor: pointer; }
                .server-card { background: #0f172a; border: 1px solid #1e293b; padding: 15px; border-radius: 15px; display: flex; align-items: center; gap: 15px; margin-bottom: 15px; }
                .server-icon-box { width: 60px; height: 60px; background: #1e293b; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; overflow: hidden; }
                .btn-manage { background: #38bdf8; color: #020617; border: none; padding: 8px 15px; border-radius: 8px; font-weight: bold; cursor: pointer; width: 100%; }
                .btn-invite { background: transparent; color: #38bdf8; border: 1px solid #38bdf8; padding: 6px 15px; border-radius: 8px; font-size: 0.8rem; cursor: pointer; text-decoration: none; display: flex; align-items: center; justify-content: center; }
            `}</style>
        </div>
    );

    // --- VIEW 3: DASHBOARD MENU ---
    return (
        <div className="full-screen dashboard-layout">
            <div className="sidebar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                    <button onClick={() => { setSelectedServer(null); setActiveTab('welcome'); }} className="back-btn"><ArrowLeft size={20}/></button>
                    <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{selectedServer.name}</span>
                </div>
                <div className="nav-list">
                    <div className={`nav-item ${activeTab === 'welcome' ? 'active' : ''}`} onClick={() => setActiveTab('welcome')}><MessageSquare size={18} style={{marginRight: '10px'}}/> Welcome & Goodbye</div>
                    <div className={`nav-item ${activeTab === 'antilink' ? 'active' : ''}`} onClick={() => setActiveTab('antilink')}><Shield size={18} style={{marginRight: '10px'}}/> Anti-Link System</div>
                    <div className={`nav-item ${activeTab === 'leveling' ? 'active' : ''}`} onClick={() => setActiveTab('leveling')}><Zap size={18} style={{marginRight: '10px'}}/> Leveling (Credix Lite)</div>
                    <div className={`nav-item ${activeTab === 'announce' ? 'active' : ''}`} onClick={() => setActiveTab('announce')}><Megaphone size={18} style={{marginRight: '10px'}}/> Announcement</div>
                    <div className={`nav-item ${activeTab === 'ticket' ? 'active' : ''}`} onClick={() => setActiveTab('ticket')}><Ticket size={18} style={{marginRight: '10px'}}/> Ticket Setup</div>
                </div>
            </div>

            <div className="content-area">
                <div className="glass-card">
                    {/* MENU 1: WELCOME & GOODBYE (DIPERBARUI) */}
                    {activeTab === 'welcome' && (
                        <div>
                            <h2 className="tab-title"><MessageSquare size={20}/> Welcome & Goodbye</h2>
                            
                            <label className="input-label">ID Channel Welcome</label>
                            <input type="text" className="modern-input" placeholder="Masukkan ID Channel... (Misal: 123456789)" />
                            
                            <label className="input-label" style={{marginTop: '15px'}}>Pesan Welcome</label>
                            <textarea className="modern-input" rows="2" placeholder="Halo {user}, selamat datang di server!" />
                            
                            <hr style={{ borderColor: '#1e293b', margin: '25px 0' }} />

                            <label className="input-label">ID Channel Goodbye</label>
                            <input type="text" className="modern-input" placeholder="Masukkan ID Channel... (Misal: 123456789)" />
                            
                            <label className="input-label" style={{marginTop: '15px'}}>Pesan Goodbye</label>
                            <textarea className="modern-input" rows="2" placeholder="Selamat tinggal {user}, sampai jumpa lagi." />
                        </div>
                    )}

                    {/* MENU 2: ANTI-LINK */}
                    {activeTab === 'antilink' && (
                        <div>
                            <h2 className="tab-title"><Shield size={20}/> Anti-Link System</h2>
                            <p className="tab-desc">Hapus otomatis link jika member melakukan spam link yang sama sebanyak 2 kali berturut-turut.</p>
                            <div className="toggle-box">
                                <span>Aktifkan Anti-Link Spam</span>
                                <input type="checkbox" defaultChecked style={{width: '20px', height: '20px'}}/>
                            </div>
                        </div>
                    )}

                    {/* MENU 3: LEVELING (CREDIX LITE) */}
                    {activeTab === 'leveling' && (
                        <div>
                            <h2 className="tab-title"><Zap size={20}/> Leveling (Credix Lite)</h2>
                            <p className="tab-desc">Member mendapatkan poin Credix Lite dari aktivitas chat teks dan obrolan di Voice Channel.</p>
                            <div className="toggle-box">
                                <span>XP dari Text Chat</span>
                                <input type="checkbox" defaultChecked style={{width: '20px', height: '20px'}}/>
                            </div>
                            <div className="toggle-box" style={{marginTop: '10px'}}>
                                <span>XP dari Voice Channel</span>
                                <input type="checkbox" defaultChecked style={{width: '20px', height: '20px'}}/>
                            </div>
                        </div>
                    )}

                    {/* MENU 4: ANNOUNCEMENT */}
                    {activeTab === 'announce' && (
                        <div>
                            <h2 className="tab-title"><Megaphone size={20}/> Kirim Announcement</h2>
                            <p className="tab-desc">Kirim pengumuman resmi ke channel server langsung dari web ini.</p>
                            <label className="input-label">Pilih Channel Tujuan (ID Channel)</label>
                            <input type="text" className="modern-input" placeholder="Masukkan ID Channel Discord..." />
                            <label className="input-label" style={{marginTop: '15px'}}>Isi Pengumuman</label>
                            <textarea className="modern-input" rows="4" placeholder="Ketik pengumuman di sini..." />
                            <button className="btn-action-pro" style={{background: '#10b981'}}>KIRIM PENGUMUMAN SEKARANG</button>
                        </div>
                    )}

                    {/* MENU 5: TICKET SETUP */}
                    {activeTab === 'ticket' && (
                        <div>
                            <h2 className="tab-title"><Ticket size={20}/> Advanced Ticket System</h2>
                            <p className="tab-desc">Kirim panel tiket canggih (dengan Dropdown & Formulir) ke channel pilihanmu.</p>
                            
                            <label className="input-label">ID Channel (Tempat Panel Tiket Dikirim)</label>
                            <input type="text" className="modern-input" placeholder="Masukkan ID Channel (misal: 123456789...)" />
                            
                            <label className="input-label" style={{marginTop: '15px'}}>Pesan Panel Tiket</label>
                            <textarea className="modern-input" rows="2" placeholder="Pilih kategori bantuan di bawah ini!" />
                            
                            <div className="toggle-box" style={{marginTop: '15px'}}>
                                <div>
                                    <span style={{display: 'block'}}>Gunakan Dropdown Kategori?</span>
                                    <span style={{fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'normal'}}>Member bisa memilih (Support, Report, Bantuan Umum)</span>
                                </div>
                                <input type="checkbox" defaultChecked style={{width: '20px', height: '20px'}}/>
                            </div>

                            <div className="toggle-box" style={{marginTop: '10px'}}>
                                <div>
                                    <span style={{display: 'block'}}>Munculkan Formulir (Modal)?</span>
                                    <span style={{fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'normal'}}>Member wajib mengisi form alasan sebelum tiket terbuka</span>
                                </div>
                                <input type="checkbox" defaultChecked style={{width: '20px', height: '20px'}}/>
                            </div>

                            <label className="input-label" style={{marginTop: '15px'}}>ID Role Admin (Untuk di-Ping)</label>
                            <input type="text" className="modern-input" placeholder="Masukkan ID Role Admin/Staff Discord..." />
                            
                            <button className="btn-action-pro" style={{background: '#6366f1'}}>KIRIM PANEL TIKET KE DISCORD</button>
                        </div>
                    )}

                    {/* TOMBOL SIMPAN GLOBAL */}
                    {(activeTab === 'welcome' || activeTab === 'antilink' || activeTab === 'leveling') && (
                        <button className="btn-save-pro">SIMPAN PENGATURAN</button>
                    )}
                </div>
            </div>
            
            <style jsx>{`
                .full-screen { width: 100vw; height: 100vh; background: #020617; color: white; display: flex; flex-direction: column; overflow: hidden; }
                .sidebar { background: #0f172a; padding: 20px; border-bottom: 1px solid #1e293b; }
                .back-btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; width: 40px; height: 40px; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
                .nav-list { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 5px; }
                .nav-list::-webkit-scrollbar { display: none; }
                .nav-item { padding: 12px 15px; border-radius: 12px; color: #94a3b8; display: flex; align-items: center; white-space: nowrap; cursor: pointer; font-size: 0.9rem; transition: 0.2s; }
                .nav-item.active { background: #1e293b; color: #38bdf8; font-weight: bold; border-left: 3px solid #38bdf8; }
                
                .content-area { padding: 20px; flex: 1; overflow-y: auto; background: #020617; }
                .glass-card { background: #0f172a; border: 1px solid #1e293b; padding: 25px; border-radius: 20px; max-width: 600px; margin: 0 auto; animation: slideUp 0.3s ease; }
                .tab-title { margin: 0 0 10px 0; color: #38bdf8; display: flex; align-items: center; gap: 10px; font-size: 1.3rem; }
                .tab-desc { font-size: 0.85rem; color: #94a3b8; margin-bottom: 20px; }
                .input-label { font-size: 0.75rem; font-weight: bold; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.5px; display: block; }
                .modern-input { width: 100%; background: #020617; border: 1px solid #1e293b; padding: 15px; border-radius: 12px; color: white; margin-top: 8px; box-sizing: border-box; font-family: inherit; font-size: 0.9rem; }
                .modern-input:focus { outline: none; border-color: #38bdf8; }
                .toggle-box { display: flex; justify-content: space-between; align-items: center; background: #020617; padding: 15px; border-radius: 12px; border: 1px solid #1e293b; font-weight: bold; }
                
                .btn-save-pro { width: 100%; background: #38bdf8; color: #020617; border: none; padding: 16px; border-radius: 12px; font-weight: 900; margin-top: 25px; cursor: pointer; transition: 0.2s; }
                .btn-save-pro:active { transform: scale(0.98); background: #7dd3fc; }
                .btn-action-pro { width: 100%; color: white; border: none; p
