import mongoose from 'mongoose';

const adminSettingsSchema = new mongoose.Schema({
  aboutTitle: { type: String },
  aboutDescription: { type: String },
  mission: { type: String },
  vision: { type: String },
  contactInfo: {
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    hours: { type: String }
  },
  socialLinks: {
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    youtube: { type: String }
  },
  seoDefaults: {
    title: { type: String },
    description: { type: String },
    keywords: { type: String }
  },
  registrationDetails: { type: String },
  eightyGInfo: { type: String }
}, { timestamps: true });

adminSettingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

export default mongoose.model('AdminSettings', adminSettingsSchema);
