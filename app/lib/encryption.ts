import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const SECRET_KEY = process.env.ENCRYPTION_SECRET_KEY || '';

function getEncryptionKey() {
    const keyBuffer = Buffer.from(SECRET_KEY, 'utf-8');
    if (keyBuffer.length !== 32) {
        throw new Error('Invalid ENCRYPTION_SECRET_KEY. It must be a 32-byte (256-bit) string defined in your environment variables.');
    }
    return new Uint8Array(keyBuffer);
}

// KEY EECRYPTTION
export function encryptKey(text: string): string {
    const iv = crypto.randomBytes(12);

    const keyBuffer = getEncryptionKey();
    const ivBuffer = new Uint8Array(iv);

    const cipher = crypto.createCipheriv(ALGORITHM, keyBuffer, ivBuffer);

    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}
// KEY DECRYPTTION
export function decryptKey(encryptedText: string): string {
    const [ivHex, authTagHex, encrypted] = encryptedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    const keyBuffer = getEncryptionKey();
    const ivBuffer = new Uint8Array(iv);

    const decipher = crypto.createDecipheriv(ALGORITHM, keyBuffer, ivBuffer);
    decipher.setAuthTag(new Uint8Array(authTag));

    let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
}