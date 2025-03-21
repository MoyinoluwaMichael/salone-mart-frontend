interface StorageService {
    uploadFile(file: File, path: string): Promise<string>;
    getFileUrl(path: string): Promise<string>;
    deleteFile(path: string): Promise<void>;
}

class FirebaseStorageService implements StorageService {
    async uploadFile(file: File, path: string): Promise<string> {
        return '';
    }

    async getFileUrl(path: string): Promise<string> {
        return '';
    }

    async deleteFile(path: string): Promise<void> {
    }
}

class CustomStorageService implements StorageService {
    deleteFile(path: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    getFileUrl(path: string): Promise<string> {
        return Promise.resolve("");
    }

    uploadFile(file: File, path: string): Promise<string> {
        return Promise.resolve("");
    }

}
