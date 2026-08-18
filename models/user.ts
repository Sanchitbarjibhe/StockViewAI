import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },

    // Primary Sign-in Method
    authProvider: {
        type: String,
        enum: ["google", "zerodha", "angelone", "fyers", "standard"],
        default: "google"
    },

    // ⚡ Details of all brokers connected by the user
    connectedBrokers: [
        {
            brokerName: { type: String, enum: ["zerodha", "angelone", "fyers"] },
            clientId: { type: String }, // e.g., Zerodha Client ID (AB1234)
            accessToken: { type: String }, // Access Token received after OAuth
            isConnected: { type: Boolean, default: true },
            linkedAt: { type: Date, default: Date.now }
        }
    ],

    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);
export default User;