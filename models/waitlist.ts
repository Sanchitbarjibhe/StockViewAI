import mongoose, { Schema, model, models } from 'mongoose';

const WaitlistSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    broker: { type: String, default: 'Other' },

    environment: {
        type: String,
        enum: ['BETA', 'PRODUCTION'],
        default: 'BETA'
    },
    isBetaUser: { type: Boolean, default: true },
    status: {
        type: String,
        enum: ['WAITING', 'INVITED', 'ACTIVE'],
        default: 'WAITING'
    },
    createdAt: { type: Date, default: Date.now }
});

export const Waitlist = models.Waitlist || model('Waitlist', WaitlistSchema);