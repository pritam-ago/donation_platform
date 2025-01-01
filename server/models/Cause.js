import mongoose from 'mongoose';

const causeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  amountRaised: { type: Number, default: 0 }, 
  targetAmount: { type: Number, required: true }, 
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  donations: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  }],
  createdAt: { type: Date, default: Date.now }, 
  active: { type: Boolean, default: true }, 
});


causeSchema.methods.updateAmountRaised = function() {
  this.amountRaised = this.donations.reduce((total, donation) => total + donation.amount, 0);
  if (this.amountRaised >= this.targetAmount) {
    this.active = false;
  }

  return this.save();
};

const Cause = mongoose.model('Cause', causeSchema);
export default Cause;
