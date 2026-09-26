require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');
const { initializeDatabase } = require('./db');
const { uploadImage } = require('./services/s3Storage');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const commentRoute = require('./routes/commentRoute');

const app = express();
const PORT = process.env.PORT || 5000;
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (/^image\/(jpeg|png|gif|webp)$/.test(file.mimetype)) {
            return cb(null, true);
        }
        return cb(new Error('Only JPEG, PNG, GIF, and WebP images are allowed'));
    },
});

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);

app.post('/api/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'An image file is required' });
    }

    try {
        const image = await uploadImage(req.file);
        return res.status(201).json(image);
    } catch (error) {
        console.error('Image upload failed:', error.message);
        return res.status(500).json({ message: 'Image upload failed' });
    }
});

async function startServer() {
    await initializeDatabase();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer().catch((error) => {
    console.error('Server startup failed:', error.message);
    process.exit(1);
});