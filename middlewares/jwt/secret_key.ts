class SecretKey {
    secret_key: string = '';

    constructor() {}

    // create a key for the jwt
    generateSecretKey(): void {
        const crypto = require('crypto');
        this.secret_key = crypto.randomBytes(64).toString('hex');
    }
    
    // get the key for the jwt
    getSecretKey(): string {
        return this.secret_key;
    }

    // set the key for the jwt - never used
    setSecretKey(secret_key: string): void {
        this.secret_key = secret_key;
    }
}

let secret_key = new SecretKey();

export default secret_key;