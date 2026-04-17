import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

// Sambungkan ke brankas rahasia Vercel
const MONGODB_URI = process.env.MONGODB_URI;

// Cetakan laci (harus sama persis dengan bot di Discloud)
const GuildSettingsSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  welcomeChannel: { type: String, default: '' },
  welcomeMessage: { type: String, default: '' },
  goodbyeChannel: { type: String, default: '' },
  goodbyeMessage: { type: String, default: '' },
  antiLink: { type: Boolean, default: true },
  maxLevel: { type: Number, default: 100 },
  rewardRole: { type: String, default: '' },
  ticketRole: { type: String, default: '' },
  webAnnounceTrigger: { type: Object, default: null }, 
  webTicketTrigger: { type: String, default: null } 
});

const GuildSettings = mongoose.models.GuildSettings || mongoose.model('GuildSettings', GuildSettingsSchema);

// FUNGSI MENGAMBIL DATA (Buat nampilin di web)
export async function GET(req) {
  try {
    await mongoose.connect(MONGODB_URI);
    // Anggap ID Server Stareon kamu sudah di-set
    const settings = await GuildSettings.findOne(); 
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Gagal membaca database' }, { status: 500 });
  }
}

// FUNGSI MENYIMPAN DATA (Saat kamu klik tombol Save/Kirim di web)
export async function POST(req) {
  try {
    await mongoose.connect(MONGODB_URI);
    const body = await req.json();

    // Update atau buat pengaturan baru (ganti 'ID_SERVER_KAMU' dengan ID asli server Stareon-mu)
    const updatedSettings = await GuildSettings.findOneAndUpdate(
      { guildId: '1466003218839376040' }, // PENTING: Nanti ganti pakai ID Discord Server Stareon
      { $set: body },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, data: updatedSettings });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Gagal menyimpan pengaturan' }, { status: 500 });
  }
}
