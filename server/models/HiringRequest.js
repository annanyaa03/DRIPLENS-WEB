import mongoose from 'mongoose';

const hiringRequestSchema = new mongoose.Schema({
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectTitle: {
    type: String,
    required: true
  },
  projectDescription: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Declined', 'Completed', 'Review'],
    default: 'Pending'
  }
}, { timestamps: true });

export default mongoose.model('HiringRequest', hiringRequestSchema);
