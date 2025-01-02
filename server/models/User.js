import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
          'Please enter a valid email address',
        ],
      },
      username: {
        type: String,
        required: true,
        unique: true, 
        minlength: 3,
        maxlength: 20,
        match: [/^[a-zA-Z0-9_]+$/, 'Username must be alphanumeric or contain underscores'],
      },
      password: {
        type: String,
        required: true,
        minlength: 6,
      },
      address: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      raisedCauses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cause' }],
      donatedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cause' }],
      totalDonatedAmount: {
        type: Number,
        default: 0,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      verified: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

const User = mongoose.model('User', UserSchema);
export default User;
