class SecretKey {
    secret_key: string = '';

    constructor() {}

    generateSecretKey(): void {
        const crypto = require('crypto');
        this.secret_key = crypto.randomBytes(64).toString('hex');
    }
    
    getSecretKey(): string {
        return this.secret_key;
    }

    setSecretKey(secret_key: string): void {
        this.secret_key = secret_key;
    }
}

let secret_key = new SecretKey();

export default secret_key;