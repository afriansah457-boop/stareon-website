import mongoose from 'mongoose';

const GuildSettingsSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  welcomeChannel: { type: String, default: '' },
  welcomeMessage: { type: String, default: '' },
  goodbyeChannel: { type: String, default: '' },
  goodbyeMessage: { type: String, default: '' },
  antiLink: { type: Boolean, default: true },
  xpText: { type: Boolean, default: true },
  xpVoice: { type: Boolean, default: true },
  maxLevel: { type: Number, default: 100 },
  targetLevel: { type: Number, default: null },
  rewardRole: { type: String, default: '' }
});

export default mongoose.models.GuildSettings || mongoose.model('GuildSettings', GuildSettingsSchema);

