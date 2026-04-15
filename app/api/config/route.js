import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

// Sambungan ke Database Stareon kamu
const mongoURL = 'mongodb+srv://afriansah457_db_user:KpWVmGkZ89suB6gR@cluster0.0fj0mh7.mongodb.net/StareonDB?appName=Cluster0';

// Format Data
const configSchema = new mongoose.Schema({
    guildId: String,
    welcomeMsg: String,
    goodbyeMsg: String,
    ticketRole: String,
    antiLink: Boolean,
    antiSpam: Boolean,
    leaderboardActive: Boolean,
    rewardDaily: Number,
    rewardWeekly: Number
}, { strict: false });

// Mencegah error jika schema dipanggil berkali-kali
const Config = mongoose.models.Config || mongoose.model('Config', configSchema);

async function connectDB() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(mongoURL);
    }
}

// Fitur untuk MEMBACA pengaturan
export async function GET() {
    await connectDB();
    let config = await Config.findOne();
    if (!config) {
        config = await Config.create({ guildId: 'default' }); // Buat default jika kosong
    }
    return NextResponse.json(config);
}

// Fitur untuk MENYIMPAN pengaturan baru
export async function POST(req) {
    await connectDB();
    const data = await req.json();
    let config = await Config.findOne();
    if (!config) {
        config = new Config(data);
    } else {
        Object.assign(config, data);
    }
    await config.save();
    return NextResponse.json({ success: true, config });
}

