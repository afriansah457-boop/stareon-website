import { NextResponse } from 'next/response';
import dbConnect from '../../../lib/mongodb';
import GuildSettings from '../../../lib/models/GuildSettings';

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { guildId, ...settings } = body;

    if (!guildId) {
      return NextResponse.json({ error: 'Guild ID tidak ditemukan' }, { status: 400 });
    }

    // Mencari data server, kalau ada di-update, kalau tidak ada dibuat baru (upsert)
    const updatedSettings = await GuildSettings.findOneAndUpdate(
      { guildId },
      { $set: settings },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, data: updatedSettings });
  } catch (error) {
    console.error("Error saving settings:", error);
    return NextResponse.json({ error: 'Gagal menyimpan data' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const guildId = searchParams.get('guildId');

    if (!guildId) {
      return NextResponse.json({ error: 'Guild ID tidak ditemukan' }, { status: 400 });
    }

    let settings = await GuildSettings.findOne({ guildId });
    
    // Kalau server baru pertama kali buka dashboard, buatkan data kosong bawaan
    if (!settings) {
      settings = await GuildSettings.create({ guildId });
    }

    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

