import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// connect MongoDB with mongoose
connectDB();

app.get('/', (req, res) => {
    res.send('API đang chạy...');
    }
);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
}
); 

