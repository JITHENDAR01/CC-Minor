const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors=require('cors');
const multer= require('multer')
const path = require('path')
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const postRoute = require('./routes/postRoute')
const commentRoute = require('./routes/commentRoute');
const cookieParser = require('cookie-parser');
const app = express()
const PORT = process.env.PORT || 5000;
//Database connection
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected...');
    }
    catch(err){
        console.error(err.message);
        
    }
}

dotenv.config();
app.use(express.json());
app.use("/uploads",express.static(path.join(__dirname,"/uploads")))
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser())
app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)
app.use('/api/posts',postRoute)
app.use('/api/comments',commentRoute)

//image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, req.body.img);
        //cb(null, "pexels-james-wheeler-1519088.jpg");
    }
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
    //console.log(req.body)
    res.status(200).json("Image uploaded successfully");
});

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})