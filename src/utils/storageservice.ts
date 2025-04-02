import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-very-secure-secret-key'; // Change this to a secure value!

interface StorageState {
    [key: string]: any;
    saveData: (key: string, value: any) => void;
}

const useStorageStore = create<StorageState>()(
    persist(
        (set) => ({
            saveData: (key, value) =>
                set((state) => ({ ...state, [key]: value })),
        }),
        { name: 'global-storage' }
    )
);

// 🔐 Encryption Helper
const encryptData = (data: any): string => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// 🔓 Decryption Helper
const decryptData = (encryptedData: string): any => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
        console.error("Decryption failed:", error);
        return null;
    }
};

// Save encrypted data to Zustand store
export const saveToStorage = (key: string, data: object): void => {
    const encrypted = encryptData(data);
    useStorageStore.getState().saveData(key, encrypted);
    console.log("🔒 Encrypted and saved to storage:", key, encrypted);
};

// Retrieve and decrypt data from Zustand store
export const retrieveFromStorage = (key: string): any => {
    const encrypted = useStorageStore.getState()[key];
    return encrypted ? decryptData(encrypted) : null;
};

// Remove data from localStorage securely
export const removeFromStorage = (key: string): void => {
    useStorageStore.setState({ [key]: undefined });
    console.log("Data removed from storage:", key);
};
