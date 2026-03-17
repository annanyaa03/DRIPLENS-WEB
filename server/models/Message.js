import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  hiringRequestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HiringRequest',
    required: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model('Message', messageSchema);
