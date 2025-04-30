import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema(
  {
    participantName: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    address: {
      type: String,
      trim: true,
    },
    parentContact: {
      type: String,
      required: true,
      trim: true,
    },
    emergencyContact: {
      type: String,
      required: true,
      trim: true,
    },
    sessionPackage: {
      type: String,
      enum: ['1', '4', '8'],
      default: '1',
    },
    sessionsCompleted: {
      type: Number,
      default: 0,
      min: 0,
    },
    paymentMethod: {
      type: String,
      enum: ['zelle', 'cash'],
    },
    participantNotes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Participant = mongoose.model('Participant', participantSchema);

export default Participant;

