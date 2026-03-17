import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['creator', 'brand'],
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  // Profile specific fields
  profile: {
    bannerUrl: String,
    avatarUrl: String,
    bio: String,
    location: String,
    category: String,
    portfolio: [{
      title: String,
      mediaUrl: String,
      mediaType: { type: String, enum: ['image', 'video'] }
    }]
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
