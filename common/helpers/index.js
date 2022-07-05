const bcrypt       = require('bcrypt');
const jwt          = require('jsonwebtoken');
const crypto       = require('crypto');
const {v4: uuidv4} = require('uuid');


const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';

const _encrypt = (text) => {
    const iv        = crypto.randomBytes(16); // initialization vector
    const cipher    = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv:           iv.toString('hex'),
        encryptedKey: encrypted.toString('hex'),
    };
};

const _decrypt = (hash) => {
    const decipher  = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrpyted.toString();
};

const comparePasswordHashes = async (incomingHash, compareWithHash) => {
    const isMatched = await bcrypt.compare(incomingHash, compareWithHash);

    return isMatched;
};

const createToken = (userInfo) => {
    const token = jwt.sign(
        {
            id:      userInfo.id,
            email:   userInfo.email,
            company: userInfo.company,
            role:    userInfo.isAdmin,
        },
        process.env.JWT_SECRET
    );

    return token;
};

const createApiKey = () => {
    const apiKeyPlain     = uuidv4();
    const apiKeyEncrypted = _encrypt(apiKeyPlain); // encrypt to store in db;

    return {
        apiKeyPlain,
        apiKeyEncrypted,
    };
};

module.exports = {comparePasswordHashes, createToken, createApiKey};
