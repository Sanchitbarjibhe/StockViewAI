import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
// 1. Fallback || '' देने से string | undefined का एरर खत्म हो जाएगा
const SECRET_KEY = process.env.ENCRYPTION_SECRET_KEY || '';

// Runtime validation for the secret key.
// 2. Buffer.from() के आगे assertion लगाने से यहाँ का एरर हटेगा
if (!SECRET_KEY || (Buffer.from(SECRET_KEY, 'utf-8') as Buffer).length !== 32) {
    throw new Error(
        'Invalid ENCRYPTION_SECRET_KEY. It must be a 32-byte (256-bit) string defined in your environment variables.'
    );
}

export function encryptKey(text: string): string {
    const iv = crypto.randomBytes(12);

    // 3. Key और IV दोनों को Uint8Array में कन्वर्ट किया ताकि Cipher का एरर खत्म हो सके
    const keyBuffer = new Uint8Array(Buffer.from(SECRET_KEY, 'utf-8'));
    const ivBuffer = new Uint8Array(iv);

    const cipher = crypto.createCipheriv(ALGORITHM, keyBuffer, ivBuffer);

    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

export function decryptKey(encryptedText: string): string {
    const [ivHex, authTagHex, encrypted] = encryptedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    // 4. Decipher के लिए भी Key, IV और AuthTag को Uint8Array में बदला
    const keyBuffer = new Uint8Array(Buffer.from(SECRET_KEY, 'utf-8'));
    const ivBuffer = new Uint8Array(iv);

    const decipher = crypto.createDecipheriv(ALGORITHM, keyBuffer, ivBuffer);
    decipher.setAuthTag(new Uint8Array(authTag));

    let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
}
