import { Schema, model, models } from 'mongoose';

const WaitListschema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        registeredAt: { type: Date, default: Date.now },
    },
    {
        collection: 'WaitList'
    }
);

const waitlist = models.WaitList || model('WaitList', WaitListschema);

export default waitlist;