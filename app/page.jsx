"use client";
import { useState, useEffect } from 'react';

export default function Dashboard() {
    const [config, setConfig] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [announceMsg, setAnnounceMsg] = useState('');
    const [announceChannel, setAnnounceChannel] = useState('');

    useEffect(() => {
        fetch('/api/config')
            .then(res => res.json())
            .then(data => {
                setConfig(data);
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setConfig(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        await fetch('/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config)
        });
        setTimeout(() => {
            alert('✨ Berhasil! Otak bot Stareon sudah diperbarui.');
            setSaving(false);
        }, 800);
    };

    const handleAnnounce = () => {
        if(!announceChannel || !announceMsg) return alert('⚠️ Isi Channel ID dan Pesannya dulu!');
        alert('🚀 Pesan dimasukkan ke antrean! (Fitur pengiriman Discord akan segera diaktifkan di bot)');
        setAnnounceMsg('');
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#09090b', color: '#38bdf8', fontFamily: 'sans-serif', fontSize: '20px' }}>
                <div className="spinner"></div> Memuat Database Stareon...
                <style>{`
                    .spinner { width: 40px; height: 40px; border: 4px solid rgba(56, 189, 248, 0.3); border-top-color: #38bdf8; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 15px; }
                    @keyframes spin { to { transform: rotate(360deg); } }
                `}</style>
            </div>
        );
    }

    return (
        <div className="animated-bg">
            <style>{`
                .animated-bg {
                    min-height: 100vh;
                    background: linear-gradient(-45deg, #0f172a, #1e1b4b, #020617, #172554);
                    background-size: 400% 400%;
                    animation: gradientBG 15s ease infinite;
                    padding: 40px 20px;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    color: white;
                }
                @keyframes gradientBG {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .glass-panel {
                    max-width: 700px;
                    margin: 0 auto;
                    background: rgba(30, 41, 59, 0.4);
                    backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    padding: 35px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .section-title {
                    font-size: 1.2rem;
                    font-weight: bold;
                    margin-bottom: 15px;
                    padding-bottom: 10px;
                    border-bottom: 2px solid rgba(56, 189, 248, 0.3);
                    color: #38bdf8;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .input-field {
                    width: 100%; padding: 14px; border-radius: 12px;
                    background: rgba(15, 23, 42, 0.6); color: white;
                    border: 1px solid rgba(255,255,255,0.1); box-sizing: border-box;
                    transition: all 0.3s ease;
                }
                .input-field:focus {
                    outline: none; border-color: #38bdf8;
                    box-shadow: 0 0 15px rgba(56, 189, 248, 0.3);
                    transform: translateY(-2px);
                }
                .toggle-box {
                    display: flex; justify-content: space-between; align-items: center;
                    background: rgba(15, 23, 42, 0.4); padding: 15px 20px;
                    border-radius: 12px; margin-bottom: 15px;
                    border: 1px solid rgba(255,255,255,0.05);
                    transition: 0.3s;
                }
                .toggle-box:hover { background: rgba(15, 23, 42, 0.8); transform: scale(1.01); }
                .btn-save {
                    width: 100%; padding: 16px; border-radius: 12px;
                    background: linear-gradient(90deg, #0284c7, #3b82f6);
                    color: white; border: none; font-weight: bold; font-size: 1.1rem;
                    cursor: pointer; transition: all 0.3s ease;
                    text-transform: uppercase; letter-spacing: 1px;
                    box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
                }
                .btn-save:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 15px 25px rgba(59, 130, 246, 0.5);
                }
                .btn-send {
                    background: linear-gradient(90deg, #16a34a, #22c55e);
                    padding: 12px 20px; border-radius: 10px; border: none;
                    color: white; font-weight: bold; cursor: pointer; transition: 0.3s;
                }
                .btn-send:hover { transform: scale(1.05); box-shadow: 0 5px 15px rgba(34, 197, 94, 0.4); }
                .float-icon { animation: float 3s ease-in-out infinite; display: inline-block; }
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-5px); }
                    100% { transform: translateY(0px); }
                }
            `}</style>

            <div className="glass-panel">
                <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem', textShadow: '0 0 20px rgba(56, 189, 248, 0.5)' }}>
                    <span className="float-icon">🌌</span> STAREON PANEL
                </h1>

                {/* --- WELCOME & TICKET --- */}
                <div style={{ marginBottom: '30px' }}>
                    <div className="section-title">👋 Salam & Support</div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '5px', display: 'block' }}>Welcome Message</label>
                        <textarea className="input-field" name="welcomeMsg" value={config.welcomeMsg || ''} onChange={handleChange} rows="2" placeholder="Halo {user}..." />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '5px', display: 'block' }}>Goodbye Message</label>
                        <textarea className="input-field" name="goodbyeMsg" value={config.goodbyeMsg || ''} onChange={handleChange} rows="2" />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '5px', display: 'block' }}>ID Role Staff Tiket (Yang di-ping saat ada tiket)</label>
                        <input type="text" className="input-field" name="ticketRole" value={config.ticketRole || ''} onChange={handleChange} placeholder="Contoh: 1234567890..." />
                    </div>
                </div>

                {/* --- EKONOMI & REWARD --- */}
                <div style={{ marginBottom: '30px' }}>
                    <div className="section-title">💰 Ekonomi & Reward (Credix)</div>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '5px', display: 'block' }}>Hadiah /daily</label>
                            <input type="number" className="input-field" name="rewardDaily" value={config.rewardDaily || 100} onChange={handleChange} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '5px', display: 'block' }}>Hadiah /weekly</label>
                            <input type="number" className="input-field" name="rewardWeekly" value={config.rewardWeekly || 500} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                {/* --- MODERASI --- */}
                <div style={{ marginBottom: '30px' }}>
                    <div className="section-title">🛡️ Moderasi & Keamanan</div>
                    <div className="toggle-box">
                        <label style={{ fontWeight: 'bold' }}>🔗 Sistem Anti-Link</label>
                        <input type="checkbox" name="antiLink" checked={config.antiLink || false} onChange={handleChange} style={{ transform: 'scale(1.5)', cursor: 'pointer' }} />
                    </div>
                    <div className="toggle-box">
                        <label style={{ fontWeight: 'bold' }}>⚠️ Sistem Anti-Spam</label>
                        <input type="checkbox" name="antiSpam" checked={config.antiSpam || false} onChange={handleChange} style={{ transform: 'scale(1.5)', cursor: 'pointer' }} />
                    </div>
                    <div className="toggle-box">
                        <label style={{ fontWeight: 'bold' }}>🏆 Leaderboard Otomatis (Mingguan)</label>
                        <input type="checkbox" name="leaderboardActive" checked={config.leaderboardActive || false} onChange={handleChange} style={{ transform: 'scale(1.5)', cursor: 'pointer' }} />
                    </div>
                </div>

                <button className="btn-save" onClick={handleSave} disabled={saving}>
                    {saving ? '⏳ SINKRONISASI DATABASE...' : '💾 SIMPAN SEMUA PENGATURAN'}
                </button>

                {/* --- PEMBUAT PESAN --- */}
                <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(2, 132, 199, 0.1)', borderRadius: '15px', border: '1px solid rgba(2, 132, 199, 0.3)' }}>
                    <div className="section-title" style={{ borderBottom: 'none', color: '#7dd3fc' }}>📢 Broadcast Pengumuman</div>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '15px' }}>Kirim pesan sebagai Bot langsung dari Web ini.</p>
                    <input type="text" className="input-field" value={announceChannel} onChange={(e) => setAnnounceChannel(e.target.value)} placeholder="ID Channel Tujuan..." style={{ marginBottom: '10px' }} />
                    <textarea className="input-field" value={announceMsg} onChange={(e) => setAnnounceMsg(e.target.value)} rows="3" placeholder="Ketik pengumumanmu di sini (bisa pakai @everyone)..." style={{ marginBottom: '15px' }} />
                    <button className="btn-send" onClick={handleAnnounce}>🚀 KIRIM KE DISCORD</button>
                </div>

            </div>
        </div>
    );
}
