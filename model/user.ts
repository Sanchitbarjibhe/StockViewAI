import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IUser extends Document {
    email: string;
    geminiApiKey?: string;
    authProvider?: string;
}

const UserSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        geminiApiKey: { type: String, default: '' },
        authProvider: { type: String, default: 'google' },
    },
    { timestamps: true }
);

export const User = models.User || model<IUser>('User', UserSchema);