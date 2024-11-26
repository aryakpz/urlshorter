
import express from 'express';
import userRoutes from './routes/userRoutes';  
const app = express();
const cors=require("cors")
app.use(cors());
app.use(express.json()); 
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

