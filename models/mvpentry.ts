import mongoose, { Schema, model, models } from 'mongoose';

const mvpentryschema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        registeredAt: { type: Date, default: Date.now },
    },
    {
        collection: 'mvpentry'
    }
);

const Mvpentry = models.Mvpentry || model('Mvpentry', mvpentryschema);

export default Mvpentry;