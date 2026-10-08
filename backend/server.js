import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import multer from 'multer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// Routes placeholder
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'PAUL PHONE CARE API is running' });
});

app.post('/api/repair-request', upload.single('deviceImage'), (req, res) => {
  const repairId = 'REP-' + Math.floor(100000 + Math.random() * 900000);
  const whatsappLink = `https://wa.me/254799902607?text=Hello,%20I%20have%20a%20repair%20request%20${repairId}`;
  
  res.json({ success: true, repairId, whatsappLink });
});

// Mock database connection for now, we'll actually connect when the connection string is provided
// mongoose.connect(process.env.MONGODB_URI).then(() => console.log('MongoDB Connected'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
