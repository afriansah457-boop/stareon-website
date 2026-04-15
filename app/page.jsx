"use client";
import { useState, useEffect } from 'react';

export default function Dashboard() {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Ambil data dari MongoDB saat web dibuka
    useEffect(() => {
        fetch('/api/config')
            .then(res => res.json())
            .then(data => {
                setConfig(data);
                setLoading(false);
            });
    }, []);

    // Mengelola perubahan saat kamu mengetik/klik tombol
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setConfig(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Menyimpan data kembali ke MongoDB
    const handleSave = async () => {
        setSaving(true);
        await fetch('/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config)
        });
        alert('✅ Pengaturan berhasil disimpan! Bot akan langsung mengikuti.');
        setSaving(false);
    };

    // Tampilan saat loading
    if (loading) return <div style={{ padding: '50px', color: 'white', background: '#0f172a', minHeight: '100vh', textAlign: 'center', fontFamily: 'sans-serif' }}>Memuat data dari server Stareon... 🔄</div>;

    // Tampilan Utama Dashboard
    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#0f172a', color: 'white', minHeight: '100vh' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', background: '#1e293b', padding: '25px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '24px' }}>🚀 Panel Stareon Official</h1>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>👋 Welcome Message</label>
                    <textarea name="welcomeMsg" value={config.welcomeMsg || ''} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#334155', color: 'white', border: 'none', boxSizing: 'border-box' }} rows="3" placeholder="Gunakan {user} untuk mention member..." />
                </div>

                <div style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>👋 Goodbye Message</label>
                    <textarea name="goodbyeMsg" value={config.goodbyeMsg || ''} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#334155', color: 'white', border: 'none', boxSizing: 'border-box' }} rows="2" />
                </div>

                <h3 style={{ borderBottom: '1px solid #475569', paddingBottom: '10px', marginBottom: '15px' }}>🛡️ Sistem Moderasi & Fitur</h3>

                <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#334155', padding: '15px', borderRadius: '8px' }}>
                    <label style={{ fontWeight: 'bold' }}>🔗 Anti-Link Sistem</label>
                    <input type="checkbox" name="antiLink" checked={config.antiLink || false} onChange={handleChange} style={{ width: '22px', height: '22px', cursor: 'pointer' }} />
                </div>

                <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#334155', padding: '15px', borderRadius: '8px' }}>
                    <label style={{ fontWeight: 'bold' }}>⚠️ Anti-Spam Sistem</label>
                    <input type="checkbox" name="antiSpam" checked={config.antiSpam || false} onChange={handleChange} style={{ width: '22px', height: '22px', cursor: 'pointer' }} />
                </div>

                <div style={{ marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#334155', padding: '15px', borderRadius: '8px' }}>
                    <label style={{ fontWeight: 'bold' }}>🏆 Aktifkan Leaderboard (Mingguan)</label>
                    <input type="checkbox" name="leaderboardActive" checked={config.leaderboardActive || false} onChange={handleChange} style={{ width: '22px', height: '22px', cursor: 'pointer' }} />
                </div>

                <button onClick={handleSave} disabled={saving} style={{ width: '100%', padding: '15px', borderRadius: '8px', background: saving ? '#64748b' : '#3b82f6', color: 'white', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', transition: '0.3s' }}>
                    {saving ? 'Menyimpan ke Database...' : '💾 SIMPAN PENGATURAN'}
                </button>
            </div>
        </div>
    );
                                                                                                                }
