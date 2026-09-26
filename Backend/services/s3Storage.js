const { randomUUID } = require('crypto');
const path = require('path');
const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');

async function uploadImage(file) {
    const { AWS_REGION: region, S3_BUCKET: bucket } = process.env;
    if (!region || !bucket) {
        throw new Error('AWS_REGION and S3_BUCKET are required');
    }

    const key = `uploads/${randomUUID()}${path.extname(file.originalname).toLowerCase()}`;
    const client = new S3Client({ region });
    await client.send(new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        CacheControl: 'public, max-age=31536000, immutable',
    }));

    const baseUrl = (process.env.S3_PUBLIC_URL || `https://${bucket}.s3.${region}.amazonaws.com`)
        .replace(/\/+$/, '');
    const encodedKey = key.split('/').map(encodeURIComponent).join('/');
    return { key, url: `${baseUrl}/${encodedKey}` };
}

module.exports = { uploadImage };