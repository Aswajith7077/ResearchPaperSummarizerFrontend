import { CONFIG } from "@/config/config"
import * as CryptoJS from "crypto-ts";

const secretKey = CONFIG.CRYPTO_KEY; // 32 bytes for AES-256
const iv = CryptoJS.enc.Hex.parse(CONFIG.CRYPTO_IV); // 16 bytes IV

function encrypt(data: string): string {
    const encrypted = CryptoJS.AES.encrypt(
        data,
        CryptoJS.enc.Utf8.parse(secretKey),
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.PKCS7
        }
    );
    return encrypted.toString();
}

function decrypt(encryptedData: string): string {
    const decrypted = CryptoJS.AES.decrypt(
        encryptedData,
        CryptoJS.enc.Utf8.parse(secretKey),
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.PKCS7
        }
    );
    return decrypted.toString(CryptoJS.enc.Utf8);
}

export { encrypt, decrypt };
